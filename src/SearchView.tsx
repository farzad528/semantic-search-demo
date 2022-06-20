import React, { useEffect, useMemo, useState } from 'react';
import { ActionButton, Stack } from 'office-ui-fabric-react';
import { Depths } from '@fluentui/theme';
import { Helmet } from 'react-helmet';
import { useBoolean } from '@uifabric/react-hooks';
import { ChooseDatasetDialog } from './ChooseDatasetDialog';
import { useHistory } from 'react-router-dom';

import { SearchBar } from './SearchBar';
import { UIStateStoreContext } from './Stores/UIStateStore';
import { DatasetKind, DocumentResult, SearchResponse } from './Types';
import * as DatasetStore from './Stores/DatasetStore';
import SearchResultContainer from './SearchResultContainer';
import { Pagination } from '@fluentui/react-experiments';
import { resultsPerRequestCount } from './Common/Constants';
import background from './Assets/background.svg';

const getStyles = (): any => ({
  container: {
    root: {
      margin: '0 auto',
      minHeight: '100vh',
    }
  },
  searchBarContainer: {
    root: {
      height: 270,
      background: 'white',
      width: '100%',
      paddingBottom: 85,
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover'
    },
  },
  searchResultsContainer: {
    root: {
      marginBottom: 40,
    },
  },
  pagination: {
    root: { marginBottom: 67, marginTop: '30px !important' },
    previousNextPageDisabled: { display: 'none !important' },
    pageNumber: { color: '#636363 !important', paddingBottom: '7px', textDecoration: 'none !important' },
    previousNextPage: { color: '#636363' },
  },
  footer: {
    root: {
      height: 120,
      background: 'white',
      width: '100%',
      marginTop: 'auto !important',
      boxShadow: Depths.depth4
    }
  },
  footerContainer: {
    root: {
      width: '100%',
      maxWidth: 960
    }
  },
  footerButton: {
    root: { color: '#0078D4 !important' },
    label: { fontSize: 18, lineHeight: 32 },
  },
  copyright: {
    color: '#999999',
    fontSize: 18,
    fontWeight: 300
  }
});

const convertToAnswerResult = (response: SearchResponse, datasetKind: DatasetKind, isCaptionsOn?: boolean): DocumentResult | undefined => {
  const dataset = DatasetStore.getDataDatasetByKind(datasetKind);
  const answer = response?.['@search.answers']?.length > 0 ? response['@search.answers'][0] : undefined;

  if (answer) {
    const answerDocument = response.value.find(document => document[dataset.keyField] === answer.key);
    if (answerDocument) {
      const answerDocumentResult: DocumentResult = {
        title: answerDocument[dataset.titleField],
        attribution: ((dataset.attributionField ? answerDocument[dataset.attributionField] : '') ?? '').split('; ')[0],
        caption: isCaptionsOn ? answer.highlights : answer.text,
        id: answerDocument[dataset.keyField],
      };

      return answerDocumentResult;
    }
  }

  return undefined;
};

const convertToDocumentResults = (response: SearchResponse, datasetKind: DatasetKind, isRankOn?: boolean, isCaptionsOn?: boolean): DocumentResult[] => {
  const dataset = DatasetStore.getDataDatasetByKind(datasetKind);
  const orderedDocuments = response.value?.sort((d1, d2) => isRankOn ? (d2['@search.rerankerScore'] ?? d2['@search.score']) - (d1['@search.rerankerScore'] ?? d1['@search.score']) : d2['@search.score'] - d1['@search.score']);

  return orderedDocuments?.map<DocumentResult>(document => ({
    title: document[dataset.titleField],
    attribution: ((dataset.attributionField ? document[dataset.attributionField] : '') ?? '').split('; ')[0],   
    caption: (isCaptionsOn ?(document['@search.captions']?.length ? (document['@search.captions'][0].highlights?.length ? 
             document['@search.captions'][0].highlights : document['@search.captions'][0].text) : 
             (document['@search.highlights']?.body?.length ? document['@search.highlights']?.body.join(' ') : 
             (document['@search.highlights']?.Body?.length ? document['@search.highlights']?.Body.join(' ') :
             (document['@search.highlights']?.Article?.length ? document['@search.highlights']?.Article.join(' ') : 
             dataset.captionFields.map(field => document[field]).join(' '))))):
             dataset.captionFields.map(field => document[field]).join(' ')).substring(0, 800),          
    id: document[dataset.keyField],
  })) ?? [];
};

export const SearchView: React.FunctionComponent = () => {
  const styles = useMemo(() => getStyles(), []);
  const {
    isCompareToDefaultOn: [isCompareToDefaultOn, toggleIsCompareToDefaultOnCallback],
    isSpellingOn: [isSpellingOn, toggleIsSpellingOnCallback],
    isRankOn: [isRankOn, toggleIsRankOnCallback],
    isAnswersOn: [isAnswersOn, toggleIsAnswersOnCallback],
    isCaptionsOn: [isCaptionsOn, toggleIsCaptionsOnCallback],
    datasetKind: [datasetKind, setDatasetKindCallback],
    pagination: [pagination, setPaginationCallback],
    defaultSearchResponse,
    semanticSearchResponse,
    query: [query, toggleQueryCallback]
  } = React.useContext(UIStateStoreContext);

  const [defaultDocuments, setDefaultDocuments] = useState<DocumentResult[] | undefined>();
  const [documents, setDocuments] = useState<DocumentResult[] | undefined>();
  const [answer, setAnswer] = useState<DocumentResult | undefined>();
  const [isDatasetDialogHidden, { toggle: toggleIsDatasetDialogHidden }] = useBoolean(true);
  const history = useHistory();

  const shouldUseDefaultDocuments = !isSpellingOn && !isRankOn && !isAnswersOn && !isCaptionsOn;

  useEffect(() => {
    if (semanticSearchResponse) {
      setAnswer(isAnswersOn ? convertToAnswerResult(semanticSearchResponse, datasetKind, isCaptionsOn) : undefined);
      setDocuments(convertToDocumentResults(semanticSearchResponse, datasetKind, isRankOn, isCaptionsOn));
    } else {
      setAnswer(undefined);
      setDocuments(undefined);
    }
  }, [semanticSearchResponse, isAnswersOn, isRankOn, isCaptionsOn, datasetKind]);

  useEffect(() => {
    if (defaultSearchResponse) {
      setDefaultDocuments(convertToDocumentResults(defaultSearchResponse, datasetKind, false, isCaptionsOn));
    } else {
      setDefaultDocuments(undefined);
    }
  }, [defaultSearchResponse, datasetKind, isCaptionsOn]);

  const pageCount = shouldUseDefaultDocuments
    ? Math.min(Math.max(1, Math.floor((defaultSearchResponse?.['@odata.count']) ?? 0) / resultsPerRequestCount), 10)
    : Math.min(Math.max(1, Math.floor((semanticSearchResponse?.['@odata.count']) ?? 0) / resultsPerRequestCount), 10);
  const shouldShowPagination = !!(shouldUseDefaultDocuments
    ? defaultSearchResponse?.['@odata.count'] ?? 0
    : semanticSearchResponse?.['@odata.count'] ?? 0);

  return (
    <Stack
      horizontalAlign="center"
      styles={styles.container}
    >
      <Helmet>
        <style>{'body { background-color: #EFF6F8; }'}</style>
      </Helmet>
      <Stack styles={styles.searchBarContainer} horizontalAlign="center" verticalAlign="center">
        <SearchBar />
      </Stack>
      <SearchResultContainer query={query} isCompareToDefaultOn={isCompareToDefaultOn} defaultDocuments={defaultDocuments} documents={documents} answer={answer} shouldUseDefaultDocuments={shouldUseDefaultDocuments} />
      {shouldShowPagination ? <Pagination
        pageCount={pageCount}
        selectedPageIndex={pagination}
        format={'buttons'}
        styles={styles.pagination}
        firstPageIconProps={{ iconName: 'DoubleChevronLeft' }}
        lastPageIconProps={{ iconName: 'DoubleChevronRight' }}
        previousPageIconProps={{ iconName: 'ChevronLeft' }}
        nextPageIconProps={{ iconName: 'ChevronRight' }}
        onPageChange={(index: number) => { setPaginationCallback(index) }} /> : null}
      <Stack horizontal horizontalAlign={'center'} styles={styles.footer}>
        <Stack horizontal horizontalAlign={'space-between'} styles={styles.footerContainer}>
          <Stack horizontal verticalAlign={'center'} gap={64}>
            <ActionButton allowDisabledFocus styles={styles.footerButton} onClick={toggleIsDatasetDialogHidden}>
              Select another dataset
              </ActionButton>
            <ActionButton allowDisabledFocus styles={styles.footerButton} onClick={() => history.push(`/`)}>
              Try more sample search queries
            </ActionButton>
          </Stack>
          <Stack horizontal verticalAlign={'center'}>
            <span style={styles.copyright}>© 2021 Microsoft</span>
          </Stack>
        </Stack>
      </Stack>
      <ChooseDatasetDialog hideDialog={isDatasetDialogHidden} toggleHideDialog={toggleIsDatasetDialogHidden} />
    </Stack >
  );
};
