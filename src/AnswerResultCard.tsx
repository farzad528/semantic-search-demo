import React, { useMemo } from 'react';
import { Depths } from '@fluentui/theme';

import { DocumentResult } from './Types';
import { Separator } from 'office-ui-fabric-react';
import { truncateSingleLineStringWithEllipsis } from './Common/Styles';

const getStyles = (isSingleColumn: boolean): any => ({
  container: {
    padding: '15px 24px 20px 24px',
    width: isSingleColumn ? 960 : 652,
    borderRadius: 11,
    background: 'white',
    boxShadow: Depths.depth4,
  },
  title: {
    fontSize: 14,
    lineHeight: '20px',
    color: '#0078D4',
    marginBottom: 8,
    ...truncateSingleLineStringWithEllipsis,
  },
  attribution: {
    fontSize: 12,
    lineHeight: '16px',
    color: '#107C10',
    marginBottom: 4,
    ...truncateSingleLineStringWithEllipsis,
  },
  caption: {
    fontSize: 18,
    lineHeight: '30px',
    color: '#000000',
    fontWeight: 400,
  },
  separator: {
    root: {
      marginLeft: -24,
      marginRight: -24,
    },
  },
});

interface AnswerResultCardProps {
  answer: DocumentResult;
  isSingleColumn?: boolean;
}

export const AnswerResultCard = React.forwardRef<HTMLDivElement, AnswerResultCardProps>(({ answer, isSingleColumn }, ref) => {
  const styles = useMemo(() => getStyles(!!isSingleColumn), [isSingleColumn]);

  return (
    <div style={styles.container} ref={ref} className="animate__animated animate__pulse">
      <p style={styles.caption} dangerouslySetInnerHTML={{ __html: answer.caption }}></p>
      <Separator styles={styles.separator} />
      {
        answer.attribution?.length ?
          <>
            <a href={answer.attribution} rel="nofollow" target="_blank"><p style={styles.title}>{answer.title}</p></a>
            <a href={answer.attribution} rel="nofollow" target="_blank"><p style={styles.attribution}>{answer.attribution}</p></a>
          </> :
          <>
            <p style={styles.title}>{answer.title}</p>
            <p style={styles.attribution}>{answer.attribution}</p>
          </>
      }
    </div>
  );
});
