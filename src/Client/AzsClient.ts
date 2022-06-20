import { AzsSearchRequest } from "../Types";
import { DatasetKind } from "../Types";
import { resultsPerRequestCount } from '../Common/Constants';
import md5 from 'crypto-js/md5';

const cachedResponse: Record<string, Response> = {};

const getRequestCacheKey = (body: object, indexName: string) => md5(JSON.stringify(body, Object.keys(body).sort()) + indexName).toString();

// THE ENDPOINT NEEDS TO ENABLE CORS.
const getDemo1Endpoint = (indexName: string) => `${process.env.REACT_APP_SEARCH_DOMAIN}/indexes/${indexName}/docs/search?api-version=2021-04-30-Preview`;
const getDemo2Endpoint = (indexName: string) => `${process.env.REACT_APP_SEARCH_DOMAIN}/indexes/${indexName}/docs/search?api-version=2021-04-30-Preview`;

async function fetchData(indexName: string, body: {}, requestCacheKey: string, isRetry: boolean = false): Promise<Response> {
    const fetchRetry: (...args: any[]) => Promise<Response> = require('fetch-retry')(fetch, {
        retries: 2,
        retryDelay: 100,
        retryOn: [404, 500],
    });
    let response = await fetchRetry(isRetry ? getDemo2Endpoint(indexName) : getDemo1Endpoint(indexName), {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.REACT_APP_SEARCH_API_KEY,
            'Accept': 'application/json',
            'cacheKey': requestCacheKey,
            'Access-Control-Allow-Origin' : '*', 
            'Access-Control-Allow-Credentials' : true
        },
        body: JSON.stringify(body),
    });

    if (response.status == 200) {
        cachedResponse[requestCacheKey] = response.clone();
    } else if (!isRetry) {
        return fetchData(indexName, body, requestCacheKey, true);
    }

    return response;
}

export async function search(request: AzsSearchRequest): Promise<Response> {
  
    let highlightVal;
    switch (request.datasetKind) {
        case DatasetKind.Msmarco:
            highlightVal = "Body";
            break;
        case DatasetKind.Cord:
            highlightVal = "body,Abstract";
            break;
        default:
            highlightVal = "";
    }

    const body = {
        "search": request.query,
        ...(request.isSemanticSearch && {
            "queryType": 'semantic',
            "semanticConfiguration": "semanticconfig1",
            ...(request.queryLanguage && { "queryLanguage": request.queryLanguage }),
            ...(request.speller && { "speller": request.speller }),
            ...(request.isQnAEnabled && { "answers": 'extractive|count-1' }),
            "captions": "extractive|highlight-true",
        }),
        ...(!request.isSemanticSearch && {
            "highlight": highlightVal,
        }),
        "highlightPreTag": "<strong>",
        "highlightPostTag": "</strong>",
        'top': request.top ?? resultsPerRequestCount,
        "skip": request.skip,
        count: true,
    };

    const requestCacheKey = getRequestCacheKey(body, request.indexName);
    if (cachedResponse[requestCacheKey]) {
        return Promise.resolve((cachedResponse[requestCacheKey]).clone());
    }

    return fetchData(request.indexName, body, requestCacheKey);
}
