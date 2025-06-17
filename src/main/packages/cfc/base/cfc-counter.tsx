import { ThemedRect } from '../../../components/theme/themedComponents';
import { Text } from '../../../components/controls/text/text';
import React from 'react';
import { IUMLElement } from '../../../services/uml-element/uml-element';

interface Props {
  element: IUMLElement;
  counter: string;
}

export const CfcCounter = ({ element, counter }: Props) => {
  if (!counter || counter.length === 0) return <></>;

  const elementWidth = element.bounds.width;
  const counterRectWidth = 30;

  return (
    <>
      <ThemedRect
        fillColor="#c0f1d0"
        strokeColor="#3daa60"
        x={elementWidth - counterRectWidth}
        y={-15}
        width={counterRectWidth}
        height={30}
        rx={8}
        ry={8}
      />
      <Text
        x={elementWidth - counterRectWidth + 15}
        y={0}
        fill="#3daa60"
        textAnchor="middle"
        alignmentBaseline="middle"
        dominantBaseline="middle"
      >
        {counter}
      </Text>
    </>
  );
};
