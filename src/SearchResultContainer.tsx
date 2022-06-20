import React, { memo, useMemo } from 'react';
import { Stack } from 'office-ui-fabric-react';

import DocumentResultCard from './DocumentResultCard';
import { AnswerResultCard } from './AnswerResultCard';
import { DocumentResult } from './Types';
import FlipMove from 'react-flip-move';

const getStyles = (): any => ({
  searchResultsContainer: {
    root: {
      marginBottom: 40,
      marginTop: '-85px !important'
    },
  },
  resultsTitle: {
    color: '#fff',
    marginBottom: 0,
    fontWeight: 'normal'
  },
  noResults: {
    color: '#636363',
    marginTop: 70
  }
});

interface SearchResultContainerProps {
  isCompareToDefaultOn: boolean;
  defaultDocuments: DocumentResult[] | undefined;
  documents: DocumentResult[] | undefined;
  answer: DocumentResult | undefined;
  shouldUseDefaultDocuments: boolean;
  query: string;
}

export const SearchResultContainer: React.FunctionComponent<SearchResultContainerProps> = ({ isCompareToDefaultOn, defaultDocuments, answer, shouldUseDefaultDocuments, documents, query }) => {
  const styles = useMemo(() => getStyles(), []);

  return (
    <Stack horizontal gap={128} styles={styles.searchResultsContainer}>
      {isCompareToDefaultOn ?
        <Stack gap={22} className={"animate__animated animate__bounceInLeft"}>
          <h3 style={styles.resultsTitle}>{query} original results</h3>
          {
            defaultDocuments?.length === 0 ?
              <p style={styles.noResults}>No results</p> :
              defaultDocuments?.map((document, index) => <DocumentResultCard key={document.id} document={document} isSingleColumn={!isCompareToDefaultOn} />)
          }
        </Stack>
        : null}
      <Stack gap={22} style={{ minWidth: isCompareToDefaultOn ? 'auto' : 960 }}>
        <h3 style={styles.resultsTitle}>{query} enhanced results</h3>
        {answer ? <AnswerResultCard answer={answer} isSingleColumn={!isCompareToDefaultOn} key={answer.id} /> : null}
        <FlipMove duration={1000} typeName={null} appearAnimation={'none'} enterAnimation={'none'} staggerDurationBy={100} easing={'ease-in-out'} leaveAnimation={'none'}>
          {
            (shouldUseDefaultDocuments ? defaultDocuments : documents)?.length === 0 ?
              <p style={styles.noResults}>No results</p> :
              (shouldUseDefaultDocuments ? defaultDocuments : documents)?.map((document, index) => <DocumentResultCard key={document.id} document={document} isSingleColumn={!isCompareToDefaultOn} />)
          }
        </FlipMove>
      </Stack>
    </Stack>
  );
};

export default memo(SearchResultContainer);
