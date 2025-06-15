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
 * Component for rendering a row within cfc operation.
 * Displays a row with an input label and an output label.
 */
export function CfcOperationComponent({ element, children }: Props) {
  const { title, counter } = JSON.parse(element.name ?? '{}');
  const numberOfLines = Math.floor(element.bounds.height / 30) - 1;
  const horizontalLines = Array.from({ length: numberOfLines }, (_, index) => (index + 1) * 30);

  return (
    <g>
      <ThemedRect width="100%" height="100%" strokeColor="none" />
      <Text y={15}>{title}</Text>
      {children}

      {horizontalLines.map((y) => (
        <ThemedLine key={y} x1={0} y1={y} x2={element.bounds.width} y2={y} stroke={element.strokeColor} />
      ))}

      <ThemedRect fillColor="none" width="100%" height="100%" strokeColor={element.strokeColor} />

      <CfcCounter element={element} counter={counter} />
    </g>
  );
}
