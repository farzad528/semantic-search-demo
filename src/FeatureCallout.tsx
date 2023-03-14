import React, { useMemo } from 'react';
import { Stack, Callout, DirectionalHint, Toggle, Separator } from 'office-ui-fabric-react';
import { useId } from '@uifabric/react-hooks';

import { UIStateStoreContext } from './Stores/UIStateStore';
import { CustomToggle } from './CustomToggle';

const getStyles = (): any => ({
  contentContainer: {
    padding: 24,
  },
  title: {
    fontSize: 16,
    lineHeight: '20px',
    color: "#000000",
    fontWeight: 600,
    marginBottom: 12,
    textTransform: 'uppercase'
  },
  subtitle: {
    fontSize: 14,
    lineHeight: '16px',
    color: "#000000",
    marginBottom: 25,
  },
  separator: {
    root: {
      marginTop: '5px !important',
      marginBottom: '-10px !important',
    }
  },
  toggleStyles: {
    root: {
      justifyContent: 'space-between'
    }
  }
});

interface FeatureCalloutProps {
  isFeatureCalloutVisible: boolean;
  toggleIsFeatureCalloutVisible: () => void;
}

export const FeatureCallout: React.FunctionComponent<FeatureCalloutProps> = ({
  isFeatureCalloutVisible,
  toggleIsFeatureCalloutVisible,
}) => {
  const {
    isCompareToDefaultOn: [isCompareToDefaultOn, toggleIsCompareToDefaultOnCallback],
    isSpellingOn: [isSpellingOn, toggleIsSpellingOnCallback],
    isRankOn: [isRankOn, toggleIsRankOnCallback],
    isAnswersOn: [isAnswersOn, toggleIsAnswersOnCallback],
    isCaptionsOn: [isCaptionsOn, toggleIsCaptionsOnCallback],
  } = React.useContext(UIStateStoreContext);

  const isCompareToDefaultDisabled = !isSpellingOn && !isRankOn && !isAnswersOn && !isCaptionsOn;
  const calloutLabelId: string = useId('feature-callout-label');
  const calloutDescriptionId: string = useId('feature-callout-description');

  const styles = useMemo(() => getStyles(), []);

  return (
    <>
      {
        isFeatureCalloutVisible ? <Callout
          calloutWidth={267}
          beakWidth={8}
          className={styles.callout}
          ariaLabelledBy={calloutLabelId}
          ariaDescribedBy={calloutDescriptionId}
          directionalHint={DirectionalHint.rightCenter}
          role="alertdialog"
          gapSpace={0}
          target=".settingButton"
          onDismiss={toggleIsFeatureCalloutVisible}
          setInitialFocus
        >
          <div style={styles.contentContainer}>
            <p style={styles.title}>Toggle features to compare</p>
            <p style={styles.subtitle}>See how results are effected with and without the following features.</p>
            <Stack gap={20}>
              <CustomToggle label="Compare to default" isToggled={isCompareToDefaultOn} onChange={toggleIsCompareToDefaultOnCallback} />
              <Separator styles={styles.separator} />
              <CustomToggle label="Spelling" isToggled={isSpellingOn} onChange={toggleIsSpellingOnCallback} />
              <CustomToggle label="Semantic Ranking" isToggled={isRankOn} onChange={toggleIsRankOnCallback} />
              <CustomToggle label="Answers" isToggled={isAnswersOn} onChange={toggleIsAnswersOnCallback} />
              <CustomToggle label="Captions" isToggled={isCaptionsOn} onChange={toggleIsCaptionsOnCallback} />
            </Stack>
          </div>
        </Callout >
          : null}
    </>
  );
};
