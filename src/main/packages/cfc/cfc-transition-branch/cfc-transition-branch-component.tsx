import { ThemedCircleContrast } from '../../../components/theme/themedComponents';
import React from 'react';
import { Text } from '../../../components/controls/text/text';
import { CfcTransitionBranch } from './cfc-transition-branch';

/**
 * Component for rendering a transition branch in a cfc.
 * Displays a circular junction point where transitions can converge or diverge.
 */
export function CfcTransitionBranchComponent({ element }: { element: CfcTransitionBranch }) {
  return (
    <g>
      <ThemedCircleContrast cx="10" cy="10" r="10" strokeColor="none" />
      {element.bounds.x === -1_000_000_000_000 && (
        <Text fontWeight="normal" y="30">
          {element.name}
        </Text>
      )}
    </g>
  );
}
