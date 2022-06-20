import React, { memo } from 'react';
import { Depths } from '@fluentui/theme';

import { DocumentResult } from './Types';
import { truncateSingleLineStringWithEllipsis } from './Common/Styles';
import { mergeStyles } from '@uifabric/merge-styles';

const singleContainerClassName = mergeStyles({
  padding: '22px',
  width: 960,
  borderRadius: 6,
  background: 'white',
  boxShadow: Depths.depth4,
});

const dualContainerClassName = mergeStyles({
  padding: '22px',
  width: 652,
  borderRadius: 6,
  background: 'white',
  boxShadow: Depths.depth4,
});

const titleClassName = mergeStyles({
  fontSize: 22,
  lineHeight: '30px',
  color: '#0198CE',
  marginBottom: 5,
  ...truncateSingleLineStringWithEllipsis as any,
});

const attributionClassName = mergeStyles({
  fontSize: 12,
  lineHeight: '19px',
  color: '#999999',
  marginBottom: 8,
  ...truncateSingleLineStringWithEllipsis as any,
});

const captionClassName = mergeStyles({
  fontSize: 12,
  lineHeight: '18px',
  color: '#000000',
  textOverflow: "ellipsis",
  display: "-webkit-box",
  '-webkit-box-orient': "vertical",
  overflow: 'hidden',
});

interface DocumentResultCardProps {
  document: DocumentResult;
  isSingleColumn?: boolean;
}

export const DocumentResultCard = React.forwardRef<HTMLDivElement, DocumentResultCardProps>((props, ref) => {
  const { document, isSingleColumn } = props;

  return (
    <div className={isSingleColumn ? singleContainerClassName : dualContainerClassName} ref={ref}>
      {
        document.attribution?.length ?
          <>
            <a href={document.attribution} rel="nofollow" target="_blank"><p className={titleClassName}>{document.title}</p></a>
            <a href={document.attribution} rel="nofollow" target="_blank"><p className={attributionClassName}>{document.attribution}</p></a>
          </> :
          <>
            <p className={titleClassName}>{document.title}</p>
            <p className={attributionClassName}>{document.attribution}</p>
          </>
      }
      <p className={captionClassName} dangerouslySetInnerHTML={{ __html: document.caption }} style={{ WebkitLineClamp: 2 }}></p>
    </div>
  );
});

export default memo(DocumentResultCard);
