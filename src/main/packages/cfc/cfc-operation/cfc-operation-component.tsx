import React from 'react';
import { ThemedLine, ThemedRect } from '../../../components/theme/themedComponents';
import { CfcOperation } from './cfc-operation';
import { CfcCounter } from '../base/cfc-counter';
import { Text } from '../../../components/controls/text/text';

interface Props {
  element: CfcOperation;
  children?: React.ReactNode;
}

/**
 * Component for rendering an operation element in Continuous Function Charts (CFC).
 * Displays a container with a title at the top, horizontal dividing lines for rows,
 * and an optional counter badge. Child components (operation rows) are rendered within this container.
 */
export const CfcOperationComponent = ({ element, children }: Props) => {
  const { title, counter } = JSON.parse(element.name ?? '{}');
  const numberOfLines = Math.floor(element.bounds.height / 30) - 1;
  const horizontalLines = Array.from({ length: numberOfLines }, (_, index) => (index + 1) * 30);

  return (
    <g>
      <ThemedRect width="100%" height="100%" fillColor={element.fillColor} />
      <Text y={15} fill={element.textColor}>
        {title}
      </Text>
      {children}

      {horizontalLines.map((y) => (
        <ThemedLine key={y} x1={0} y1={y} x2={element.bounds.width} y2={y} strokeColor={element.strokeColor} />
      ))}

      <ThemedRect fillColor="none" width="100%" height="100%" strokeColor={element.strokeColor} />

      <CfcCounter element={element} counter={counter} />
    </g>
  );
};
