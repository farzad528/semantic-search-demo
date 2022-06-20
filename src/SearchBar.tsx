import React, { useMemo, useState } from 'react';
import { Stack, SearchBox } from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';

import { QuerySuggestionItem } from './QuerySuggestionItem';
import { DatasetDefinition, QuerySuggestion } from './Types';
import { FeatureCallout } from './FeatureCallout';
import { ChooseDatasetDialog } from './ChooseDatasetDialog';
import { useHistory } from 'react-router-dom';
import { UIStateStoreContext } from './Stores/UIStateStore';
import * as DatasetStore from './Stores/DatasetStore';
import { encodeUrlComponent } from './Common/Utils';

const getStyles = (isSearchBoxOnFocus: boolean): any => ({
  datasetIconContainer: { width: 36, height: 36 },
  autocompleteContainer: {
    ...(isSearchBoxOnFocus ? {} : { opacity: 0, }),
    height: 62 + 75 * DatasetStore.defaultQuerySuggestions.length,
    width: 960,
    background: 'white',
    borderTop: '1px #DEDEDE solid',
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
  },
  searchContainer: { root: {} },
  searchBox: {
    root: {
      width: 960,
      height: 54,
      ...(isSearchBoxOnFocus ?
        {
          borderTopLeftRadius: 11,
          borderTopRightRadius: 11,
        } : {
          borderRadius: 6,
          filter: 'drop-shadow(0px 4px 25px rgba(0, 0, 0, 0.08))',
        }
      ),
      border: 0,
      ':after': {
        border: 0,
      }
    },
    iconContainer: { width: '60px !important' },
    field: { lineHeight: '32px', fontSize: 26, }
  },
  settingsButton: {
    color: " #fff",
    textDecoration: "underline",
    userSelect: "none",
    cursor: "pointer"
  },
  datasetIcon: {
    root: {
      top: 9,
      position: 'relative',
      cursor: 'pointer',
    }
  },
  searchBoxIcon: {
    fontWeight: 900,
    color: '#DEDEDE',
    fontSize: 26,
    opacity: 1,
  },
  settingsIcon: {
    fontSize: 28,
    color: '#DEDEDE',
  },
  searchAndAutocompleteContainer: {
    root: {
      ...(!isSearchBoxOnFocus ? {} : {
        borderRadius: 6,
        filter: 'drop-shadow(0px 4px 25px rgba(0, 0, 0, 0.08))',
      })
    }
  },
  suggestedQueryContainer: {
    root: {
      height: 75,
      lineHeight: '26px',
      ':hover': {
        cursor: 'pointer',
        background: '#F3F2F1',
      }
    }
  },
  suggestedQueryImage: {
    root: {
      marginLeft: 16,
    }
  },
  semanticQueryText: {
    fontSize: 22,
    color: '#3F3F3F',
  },
  semanticTypeText: {
    textTransform: 'uppercase',
    color: '#52ACEB',
    fontSize: 13,
  },
  semanticDatasetText: {
    textTransform: 'uppercase',
    color: '#CACACA',
    fontSize: 13,
  },
  tryQueryText: {
    fontSize: 16,
    lineHeight: '32px',
    color: '#000000',
    marginLeft: 20,
    fontWeight: 600,
    marginTop: 10,
    marginBottom: -4,
  },
  datasetText: {
    color: "#fff",
    userSelect: "none"
  },
  datasetButton: {
    marginLeft: "6px",
    color: " #fff",
    textDecoration: "underline",
    userSelect: "none",
    cursor: "pointer"
  }
});

interface SearchBarProps {
  querySuggestions?: QuerySuggestion[],
  searchBoxFocusOnDefault?: boolean;
}

export const SearchBar: React.FunctionComponent<SearchBarProps> = ({ querySuggestions, searchBoxFocusOnDefault }) => {
  const history = useHistory();
  const [isSearchBoxOnFocus, setIsSearchBoxOnFocus] = useState<boolean>(!!searchBoxFocusOnDefault);
  const [currentQuery, setCurrentQuery] = useState<string | undefined>();
  const [isFeatureCalloutVisible, { toggle: toggleIsFeatureCalloutVisible }] = useBoolean(false);
  const [isDatasetDialogHidden, { toggle: toggleIsDatasetDialogHidden }] = useBoolean(true);
  const {
    query: [query, setQuery],
    pagination: [pagination, setPagination],
    datasetKind: [datasetKind, setDatasetKind],
  } = React.useContext(UIStateStoreContext);
  const selectedDatasetDefinition = useMemo<DatasetDefinition>(() => DatasetStore.getDataDatasetByKind(datasetKind), [datasetKind]);
  const shouldEnableAutocomplete = !!querySuggestions?.length;
  const styles = useMemo(() => getStyles(isSearchBoxOnFocus && shouldEnableAutocomplete), [isSearchBoxOnFocus, shouldEnableAutocomplete]);

  const onClick = (suggestion: QuerySuggestion) => {
    setQuery(suggestion.query);
    setPagination(0);
    setDatasetKind(suggestion.datasetDefinition.datasetKind);

    history.push(`/search?query=${encodeUrlComponent(suggestion.query)}&dataset=${suggestion.datasetDefinition.datasetKind}&pagination=${0}`);
  };

  const onSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPagination(0);

    history.push(`/search?query=${encodeUrlComponent(newQuery)}&dataset=${datasetKind}&pagination=${pagination}`);
  };

  return (
    <Stack
      verticalAlign="start"
      styles={styles.searchContainer}
      gap={24}
    >
      <Stack
        horizontal
        horizontalAlign="space-between"
      >
        <div>
          <span style={styles.datasetText}>Dataset: {selectedDatasetDefinition.name}</span>
          <span tabIndex={0} onClick={toggleIsDatasetDialogHidden} style={styles.datasetButton}>Change</span>
          <ChooseDatasetDialog hideDialog={isDatasetDialogHidden} toggleHideDialog={toggleIsDatasetDialogHidden} />
        </div>
        <div>
          <span
            style={styles.settingsButton}
            className="settingButton"
            onClick={toggleIsFeatureCalloutVisible}
            title="Settings">Toggle features</span>
          <FeatureCallout isFeatureCalloutVisible={isFeatureCalloutVisible} toggleIsFeatureCalloutVisible={toggleIsFeatureCalloutVisible} />
        </div>
      </Stack>
      <Stack styles={styles.searchAndAutocompleteContainer}>
        <SearchBox
          id={'searchbox'}
          value={currentQuery === undefined ? query : currentQuery}
          styles={styles.searchBox}
          iconProps={{ style: styles.searchBoxIcon }}
          placeholder="Try a search query"
          disableAnimation
          onChange={element => setCurrentQuery(element!.currentTarget.value || '')}
          onFocus={() => setIsSearchBoxOnFocus(true)}
          onBlur={() => setIsSearchBoxOnFocus(false)}
          onSearch={newValue => onSearch(newValue)}
        />
        {shouldEnableAutocomplete ?
          <>
            <div style={styles.autocompleteContainer}>
              <div style={styles.tryQueryText}>TRY A QUERY</div>
              {querySuggestions && querySuggestions.map((suggestion, index) =>
                <QuerySuggestionItem
                  key={index}
                  iconUrl={suggestion.datasetDefinition.iconUrl}
                  query={suggestion.query}
                  semanticType={suggestion.semanticType}
                  datasetName={suggestion.datasetDefinition.name}
                  onClick={() => onClick(suggestion)}
                />)}
            </div>
          </>
          : null}
      </Stack>
    </Stack>
  );
};
