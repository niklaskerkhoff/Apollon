import React from 'react';
import { ThemedPolyline } from '../../../components/theme/themedComponents';
import { CfcTransition } from './cfc-transition';

/**
 * Component for rendering transitions in cfc.
 */
export const CfcTransitionComponent = ({ element }: { element: CfcTransition }) => {
  return (
    <g>
      <ThemedPolyline
        points={element.path.map((point) => `${point.x} ${point.y}`).join(',')}
        strokeColor={element.strokeColor}
        fillColor="none"
        strokeWidth={1}
      />
    </g>
  );
};
