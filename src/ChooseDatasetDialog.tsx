import React, { useMemo, useState } from 'react';
import { Stack, Image, Dialog, DialogType } from 'office-ui-fabric-react';

import { DatasetDefinition, DatasetKind } from './Types';
import * as DatasetStore from './Stores/DatasetStore';
import { UIStateStoreContext } from './Stores/UIStateStore';

const getStyles = (): any => ({
  datasetName: {
    fontSize: 16,
    lineHeight: '20px',
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  },
  datasetDescription: {
    fontSize: 14,
    lineHeight: '14px',
    color: '#000',
    textAlign: 'center',
    padding: '0 10px'
  },
  datasetIcon: {
    root: {
      marginBottom: 15,
    }
  },
  datasetContainer: {
    root: {
      border: '1px solid #D7D7D7',
      borderRadius: 5,
      width: 258,
      height: 230,
      padding: 25,
      ':hover': {
        background: '#F3F2F1',
        cursor: 'pointer',
      },
      background: '#F0F0F0'
    },
  },
  dialogTitle: {
    marginTop: 20,
    marginBottom: 40,
    fontSize: 36,
    lineHeight: '32px',
  },
  contentContainer: {
    root: {
      marginBottom: 40,
    },
  }
});

const modelProps = {
  isBlocking: true,
  styles: { main: { borderRadius: 5 } },
};

interface ChooseDatasetDialogProps {
  hideDialog: boolean;
  toggleHideDialog: () => void;
}

export const ChooseDatasetDialog: React.FunctionComponent<ChooseDatasetDialogProps> = ({ hideDialog, toggleHideDialog }) => {
  const styles = useMemo(() => getStyles(), []);
  const [datasets, _] = useState<DatasetDefinition[]>(DatasetStore.getDataDatasetDefinitions())
  const { datasetKind: [datasetKind, setDatasetKind], } = React.useContext(UIStateStoreContext);

  const onSelectDatasetKind = (datasetKind: DatasetKind) => {
    setDatasetKind(datasetKind);
    toggleHideDialog();
  }

  return (
    <Dialog
      type={DialogType.close}
      hidden={hideDialog}
      minWidth={960}
      onDismiss={toggleHideDialog}
      modalProps={modelProps}>
      <Stack horizontalAlign={"center"} styles={styles.contentContainer}>
        <p style={styles.dialogTitle}>Try another dataset</p>
        <Stack horizontal gap={28} horizontalAlign={"center"}>
          {
            datasets.map((dataset, index) =>
              <Stack
                styles={styles.datasetContainer}
                onClick={() => onSelectDatasetKind(dataset.datasetKind)}
                tabIndex={0}
                key={index}
                verticalAlign="center"
                horizontalAlign="center">
                <Image
                  styles={styles.datasetIcon}
                  src={dataset.iconUrl}
                  height={48}
                  width={48}
                  shouldFadeIn={false}
                />
                <p style={styles.datasetName}>{dataset.name}</p>
                <p style={styles.datasetDescription}>{dataset.description}</p>
              </Stack>)
          }
        </Stack>
      </Stack>
    </Dialog >
  );
};
