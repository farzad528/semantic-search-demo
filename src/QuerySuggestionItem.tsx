import React, { useMemo } from 'react';
import { Stack, Image } from 'office-ui-fabric-react';

interface QuerySuggestionItemProps {
  iconUrl: string;
  query: string;
  semanticType: string;
  datasetName: string;
  onClick: () => void;
}

const getStyles = (): any => ({
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
    fontSize: 18,
    color: '#0198CE',
  },
  semanticTypeText: {
    color: '#555555',
    fontSize: 14,
  },
  semanticDatasetText: {
    color: '#555555',
    fontSize: 14,
  },
});

export const QuerySuggestionItem: React.FunctionComponent<QuerySuggestionItemProps> = ({
  iconUrl,
  query,
  semanticType,
  datasetName,
  onClick,
}) => {

  const styles = useMemo(() => getStyles(), []);

  return (
    <Stack horizontal
      styles={styles.suggestedQueryContainer}
      verticalAlign="center"
      gap={15}
      onClick={() => onClick()}
    >
      <Image
        styles={styles.suggestedQueryImage}
        src={iconUrl}
        height={39}
        width={39}
        shouldFadeIn={false}
      />
      <div>
        <div style={styles.semanticQueryText}>{query}</div>
        <Stack horizontal gap={20}
        >
          <div style={styles.semanticTypeText}>{semanticType}</div>
          <div style={styles.semanticDatasetText}>{datasetName}</div>
        </Stack>
      </div>
    </Stack>
  );
};
