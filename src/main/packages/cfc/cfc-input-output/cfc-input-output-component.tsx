import { ThemedRect } from '../../../components/theme/themedComponents';
import { Text } from '../../../components/controls/text/text';
import React from 'react';
import { CfcInputOutput } from './cfc-input-output';
import { CfcCounter } from '../base/cfc-counter';

/**
 * Component for rendering an input or output variable element in Continuous Function Charts (CFC).
 * Displays a styled rectangle with the variable title centered inside and an optional counter badge
 * in the top-right corner. Uses themed components for consistent styling with the application.
 */
export const CfcInputOutputComponent = ({ element }: { element: CfcInputOutput }) => {
  const { title, counter } = JSON.parse(element.name);

  return (
    <g>
      <ThemedRect fillColor={element.fillColor} strokeColor="none" x="0" y="0" width="100%" height="100%" />
      <Text fill={element.textColor} textAnchor="middle" dominantBaseline="middle">
        {title}
      </Text>
      <ThemedRect x="0" y="0" fillColor="none" width="100%" height="100%" strokeColor={element.strokeColor} />

      <CfcCounter element={element} counter={counter} />
    </g>
  );
};
