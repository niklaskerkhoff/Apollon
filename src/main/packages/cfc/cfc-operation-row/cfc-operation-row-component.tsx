import React from 'react';
import { ThemedRect } from '../../../components/theme/themedComponents';
import { Text } from '../../../components/controls/text/text';
import { CfcOperationRow } from './cfc-operation-row';
import { ILayer } from '../../../services/layouter/layer';
import { Text as TextUtils } from '../../../utils/svg/text';
import { withCanvas } from '../../../components/canvas/with-canvas';

interface Props {
  element: CfcOperationRow;
  fillColor?: string;
  canvas: ILayer;
}

const BaseCfcOperationRowComponent = ({ element, fillColor, canvas }: Props) => {
  const { inputLabel, outputLabel } = JSON.parse(element.name);

  const outputLabelWidth = TextUtils.size(canvas, outputLabel, { fontWeight: 'normal' }).width;
  const outputLabelX = element.bounds.width - outputLabelWidth - 10;

  return (
    <g>
      <ThemedRect fillColor={fillColor || element.fillColor} strokeColor="none" width="100%" height="100%" />
      <Text x={10} textAnchor="start" fill={element.textColor} fontWeight="normal">
        {inputLabel}
      </Text>

      <Text x={outputLabelX} textAnchor="start" fill={element.textColor} fontWeight="normal">
        {outputLabel}
      </Text>
    </g>
  );
};

/**
 * Component for rendering a row within an operation element in Continuous Function Charts (CFC).
 * Displays a row with an input label on the left side and an output label on the right side.
 * The component calculates the position of the output label based on its width and the element's bounds.
 * Enhanced with canvas context for text measurement and positioning.
 */
export const CfcOperationRowComponent = withCanvas(BaseCfcOperationRowComponent);
