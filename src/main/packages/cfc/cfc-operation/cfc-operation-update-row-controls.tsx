import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../../components/controls/button/button';
import { ColorButton } from '../../../components/controls/color-button/color-button';
import { TrashIcon } from '../../../components/controls/icon/trash';
import { StylePane } from '../../../components/style-pane/style-pane';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { IUMLElement } from '../../../services/uml-element/uml-element';

const Flex = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

type Props = {
  row: IUMLElement;
  update: typeof UMLElementRepository.update;
  onDelete: (id: string) => () => void;
};

/**
 * Component for providing control buttons for operation rows in Continuous Function Charts (CFC).
 * Renders a set of controls including a color button for styling the row and a delete button
 * for removing the row from its parent operation. Opens a style pane when the color button is clicked.
 */
export const CfcOperationUpdateRowControls = ({ row, update, onDelete }: Props) => {
  const [colorOpen, setColorOpen] = useState(false);

  const toggleColor = () => {
    setColorOpen(!colorOpen);
  };

  const handleDelete = () => {
    onDelete(row.id)();
  };

  return (
    <>
      <Flex>
        <ColorButton onClick={toggleColor} />
        <Button color="link" tabIndex={-1} onClick={() => handleDelete()}>
          <TrashIcon />
        </Button>
      </Flex>
      <div style={{ gridColumn: '1 / -1' }}>
        <StylePane open={colorOpen} element={row} onColorChange={update} fillColor textColor />
      </div>
    </>
  );
};
