import React, { useEffect, useState, Dispatch } from 'react'
import { useBoolean } from '@uifabric/react-hooks';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { DatasetKind, SearchResponse } from '../Types';
import * as DatasetStore from './DatasetStore';
import * as AzsClient from '../Client/AzsClient';
import { encodeUrlComponent } from '../Common/Utils';
import { useQuery } from '../Common/Hooks';
import { resultsPerRequestCount } from '../Common/Constants';

const emptyCallback = () => { };

export type UpdateUIStateCallbacks = () => void;

interface UIStateStore {
    isCompareToDefaultOn: [boolean, UpdateUIStateCallbacks],
    isSpellingOn: [boolean, UpdateUIStateCallbacks],
    isRankOn: [boolean, UpdateUIStateCallbacks],
    isAnswersOn: [boolean, UpdateUIStateCallbacks],
    isCaptionsOn: [boolean, UpdateUIStateCallbacks],
    isTeachingBubbleVisible: [boolean, UpdateUIStateCallbacks],
    query: [string, Dispatch<string>],
    pagination: [number, Dispatch<number>],
    datasetKind: [DatasetKind, Dispatch<DatasetKind>],
    defaultSearchResponse: SearchResponse | undefined,
    semanticSearchResponse: SearchResponse | undefined,
}

export const UIStateStoreContext = React.createContext<UIStateStore>({
    isCompareToDefaultOn: [false, emptyCallback],
    isSpellingOn: [false, emptyCallback],
    isRankOn: [false, emptyCallback],
    isAnswersOn: [false, emptyCallback],
    isCaptionsOn: [false, emptyCallback],
    isTeachingBubbleVisible: [false, emptyCallback],
    query: ['', emptyCallback],
    pagination: [0, emptyCallback],
    datasetKind: [DatasetStore.getDefaultDataset(), emptyCallback],
    defaultSearchResponse: undefined,
    semanticSearchResponse: undefined,
});

const urlParams = new URLSearchParams(window.location.search);
const initialToggleStateNum = parseInt(urlParams.get('toggleState') ?? '0');
const initialToggleState = isNaN(initialToggleStateNum) ? 0 : initialToggleStateNum;;
const initialToggleStateBools = [0, 1, 2, 3, 4].map(num => initialToggleState & 1 << num).map(state => !!state);

export default ({ children }: { children: any }) => {
    const [isCompareToDefaultOn, { toggle: toggleIsCompareToDefaultOn, setFalse: setIsCompareToDefaultOff, setTrue: setIsCompareToDefaultOn }] = useBoolean(initialToggleStateBools[0]);
    const [isSpellingOn, { toggle: toggleIsSpellingOn, setFalse: setIsSpellingOnOff, setTrue: setIsSpellingOnOn }] = useBoolean(initialToggleStateBools[1]);
    const [isRankOn, { toggle: toggleIsRankOn, setFalse: setIsRankOnOff, setTrue: setIsRankOnOn }] = useBoolean(initialToggleStateBools[2]);
    const [isAnswersOn, { toggle: toggleIsAnswersOn, setFalse: setIsAnswersOnOff, setTrue: setIsAnswersOnOn }] = useBoolean(initialToggleStateBools[3]);
    const [isCaptionsOn, { toggle: toggleIsCaptionsOn, setFalse: setIsCaptionsOnOff, setTrue: setIsCaptionsOnOn }] = useBoolean(initialToggleStateBools[4]);

    const [isTeachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);

    const queryParams = useQuery();
    const [query, setQuery] = useState<string>(() => queryParams.get('query') ?? '');
    const [pagination, setPagination] = useState<number>(() => Number(queryParams.get('pagination')) || 0);
    const [datasetKind, setDatasetKind] = useState<DatasetKind>(() => Number(queryParams.get('dataset')) || DatasetStore.getDefaultDataset());

    const [defaultSearchResponse, setDefaultSearchResponse] = useState<SearchResponse>();
    const [semanticSearchResponse, setSemanticSearchResponse] = useState<SearchResponse>();

    const history = useHistory();
    const isOnSearchPage = !!useRouteMatch({ path: "/search" });

    const getToggleState = () => {
        const toggleState = [isCompareToDefaultOn, isSpellingOn, isRankOn, isAnswersOn, isCaptionsOn];
        let toggleStateValue = 0;
        for (let i = 0; i < toggleState.length; i++) {
            toggleStateValue += (toggleState[i] ? 1 : 0) * 1 << i;
        }
        return toggleStateValue;
    }

    useEffect(() => {
        if (isOnSearchPage) {
            history.replace(`/search?query=${encodeUrlComponent(query)}&dataset=${datasetKind}&pagination=${pagination}&toggleState=${getToggleState()}`);
        }
    }, [isCompareToDefaultOn, isSpellingOn, isRankOn, isAnswersOn, isCaptionsOn])

    useEffect(() => {
        if (isOnSearchPage) {
            history.replace(`/search?query=${encodeUrlComponent(query)}&dataset=${datasetKind}&pagination=${pagination}&toggleState=${getToggleState()}`);
        }

        const dataset = DatasetStore.getDataDatasetByKind(datasetKind);
        if (isOnSearchPage && query?.trim()) {
            // const featureState = Number(isCompareToDefaultOn) * (1 << 0) + Number(isSpellingOn) * (1 << 1) + Number(isRankOn) * (1 << 2) + Number(isAnswersOn) * (1 << 3) + Number(isCaptionsOn) * (1 << 4);
            setSemanticSearchResponse(undefined);
            setDefaultSearchResponse(undefined);

            AzsClient.search({
                isQnAEnabled: true,
                isSemanticSearch: true,
                query,
                indexName: dataset.indexName,
                queryLanguage: 'en-us',
                top: resultsPerRequestCount,
                skip: pagination * resultsPerRequestCount,
                speller: 'lexicon',
                datasetKind: datasetKind
            }).then(response => response.json().then((response: SearchResponse) => {
                setSemanticSearchResponse(response);
            }));

            AzsClient.search({
                query,
                indexName: dataset.indexName,
                top: resultsPerRequestCount,
                skip: pagination * resultsPerRequestCount,
                datasetKind: datasetKind
            }).then(response => response.json().then((response: SearchResponse) => {
                setDefaultSearchResponse(response);
            }));
        }
    }, [isOnSearchPage, query, pagination, datasetKind])

    const toggleIsCompareToDefaultOnCallback = () => {
        toggleIsCompareToDefaultOn();
    };
    const toggleIsSpellingOnCallback = () => {
        toggleIsSpellingOn();

        setIsRankOnOff();
        setIsAnswersOnOff();
        setIsCaptionsOnOff();

        if (isSpellingOn) {
            setIsCompareToDefaultOff();
        }
    };
    const toggleIsRankOnCallback = () => {
        toggleIsRankOn();

        setIsSpellingOnOn();
        setIsAnswersOnOff();
        setIsCaptionsOnOff();
    };
    const toggleIsAnswersOnCallback = () => {
        toggleIsAnswersOn();

        setIsSpellingOnOn();
        setIsRankOnOn();
        setIsCaptionsOnOff();
    };
    const toggleIsCaptionsOnCallback = () => {
        toggleIsCaptionsOn();

        setIsSpellingOnOn();
        setIsRankOnOn();
        setIsAnswersOnOn();
    };
    const setQueryCallback: Dispatch<string> = (query: string) => {
        setQuery(query);
    };
    const setPaginationCallback: Dispatch<number> = (pagination: number) => {
        setPagination(pagination);
    };
    const setDatasetKindCallback: Dispatch<DatasetKind> = (newDatasetKind: DatasetKind) => {
        if (newDatasetKind !== datasetKind) {
            setSemanticSearchResponse(undefined);
            setDefaultSearchResponse(undefined);

            setPagination(0);
            setDatasetKind(newDatasetKind);

            if (newDatasetKind === DatasetKind.Homedepot) {
                alert('This dataset is not supported. Placeholder for now.');
            }
        }
    };

    const store: UIStateStore = {
        isCompareToDefaultOn: [isCompareToDefaultOn, toggleIsCompareToDefaultOnCallback],
        isSpellingOn: [isSpellingOn, toggleIsSpellingOnCallback],
        isRankOn: [isRankOn, toggleIsRankOnCallback],
        isAnswersOn: [isAnswersOn, toggleIsAnswersOnCallback],
        isCaptionsOn: [isCaptionsOn, toggleIsCaptionsOnCallback],
        isTeachingBubbleVisible: [isTeachingBubbleVisible, toggleTeachingBubbleVisible],
        query: [query, setQueryCallback],
        pagination: [pagination, setPaginationCallback],
        datasetKind: [datasetKind, setDatasetKindCallback],
        defaultSearchResponse,
        semanticSearchResponse,
    }

    return <UIStateStoreContext.Provider value={store}> {children} </UIStateStoreContext.Provider>;
}