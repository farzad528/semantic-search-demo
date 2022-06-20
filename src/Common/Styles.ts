import { CSSProperties } from "react";

export const truncateSingleLineStringWithEllipsis: CSSProperties = {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}