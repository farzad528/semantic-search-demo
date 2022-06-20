import React, { useMemo } from 'react';
import { Stack } from 'office-ui-fabric-react';

import { SearchBar } from './SearchBar';
import * as DatasetStore from './Stores/DatasetStore';

const getStyles = (): any => ({
  container: {
    root: {
      width: '1200px',
      margin: '0 auto',
    }
  },
});

export const WelcomeView: React.FunctionComponent = () => {
  const styles = useMemo(() => getStyles(), []);

  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={styles.container}
    >
      <SearchBar querySuggestions={DatasetStore.defaultQuerySuggestions} searchBoxFocusOnDefault={true} />
    </Stack>
  );
};
