import React from 'react';
import { ThemedPolyline } from '../../../components/theme/themedComponents';
import { CfcTransition } from './cfc-transition';

/**
 * Component for rendering transition connections in Continuous Function Charts (CFC).
 * Displays a polyline that follows the path defined in the transition element.
 * Transitions visually represent the flow of data or control between CFC elements in the diagram.
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
