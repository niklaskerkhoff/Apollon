import React, { ComponentClass, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Textfield } from '../../../components/controls/textfield/textfield';
import { ModelState } from '../../../components/store/model-state';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { notEmpty } from '../../../utils/not-empty';
import { AsyncDispatch } from '../../../utils/actions/actions';
import { compose } from 'redux';
import { CfcNameWithCounterUpdate } from '../base/cfc-name-with-counter-update';
import { CfcOperation } from './cfc-operation';
import { CfcOperationRow } from '../cfc-operation-row/cfc-operation-row';
import { CfcOperationUpdateRowControls } from './cfc-operation-update-row-controls';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 5px;
`;

interface OwnProps {
  element: CfcOperation;
}

interface DispatchProps {
  create: typeof UMLElementRepository.create;
  update: typeof UMLElementRepository.update;
  delete: typeof UMLElementRepository.delete;
  getById: (id: string) => UMLElement | null;
}

type Props = OwnProps & DispatchProps;

const BaseCfcOperationUpdate = ({ element, create, update, delete: deleteElement, getById }: Props) => {
  const [fieldToFocus, setFieldToFocus] = useState<Textfield<string> | null>(null);

  const newRowInputLabelCell = useRef<Textfield<string>>(null);
  const newRowOutputLabelCell = useRef<Textfield<string>>(null);

  const labelRefs: (Textfield<string> | null)[] = [];

  const children = element.ownedElements.map((id) => getById(id)).filter(notEmpty);
  const rows = children.filter((child) => child instanceof CfcOperationRow);
  const parsedRows = rows.map((row) => JSON.parse(row.name));

  // Focus the field that was set to be focused
  React.useEffect(() => {
    if (fieldToFocus) {
      fieldToFocus.focus();
      setFieldToFocus(null);
    }
  }, [fieldToFocus]);

  const handleUpdateLabel = (
    rowId: string,
    rowIndex: number,
    label: 'inputLabel' | 'outputLabel',
    labelValue: string,
  ) => {
    const otherLabel = label === 'inputLabel' ? 'outputLabel' : 'inputLabel';
    const otherLabelValue = parsedRows[rowIndex][otherLabel] ?? '';
    const rowValue = { [label]: labelValue, [otherLabel]: otherLabelValue };
    update(rowId, { name: JSON.stringify(rowValue) });
  };

  const handleDelete = (id: string) => () => {
    deleteElement(id);
  };

  const createRow = () => {
    const inputLabelInput = newRowInputLabelCell.current?.ref.current;
    const outputLabelInput = newRowOutputLabelCell.current?.ref.current;

    const inputLabel = inputLabelInput?.value ?? '';
    const outputLabel = outputLabelInput?.value ?? '';

    if (inputLabelInput) {
      inputLabelInput.value = '';
    }
    if (outputLabelInput) {
      outputLabelInput.value = '';
    }

    const rowValues = { inputLabel, outputLabel };
    const row = new CfcOperationRow({ name: JSON.stringify(rowValues) });
    create(row, element.id);
  };

  return (
    <div>
      <CfcNameWithCounterUpdate element={element} />
      <section style={{ marginTop: 5 }}>
        <Grid>
          {rows.map((row, index) => (
            <React.Fragment key={row.id}>
              <Textfield
                id={'inputLabel' + row.id}
                key={'inputLabel' + row.id}
                ref={(ref) => (labelRefs[2 * index] = ref)}
                value={parsedRows[index].inputLabel}
                onChange={(value) => handleUpdateLabel(row.id, index, 'inputLabel', value)}
                onSubmitKeyUp={() => setFieldToFocus(labelRefs[2 * index + 1])}
              />
              <Textfield
                id={'outputLabel' + row.id}
                key={'outputLabel' + row.id}
                ref={(ref) => (labelRefs[2 * index + 1] = ref)}
                value={parsedRows[index].outputLabel}
                onChange={(value) => handleUpdateLabel(row.id, index, 'outputLabel', value)}
                onSubmitKeyUp={() =>
                  index === rows.length - 1
                    ? newRowInputLabelCell.current?.focus()
                    : setFieldToFocus(labelRefs[2 * index + 2])
                }
              />
              <CfcOperationUpdateRowControls row={row as UMLElement} update={update} onDelete={handleDelete} />
            </React.Fragment>
          ))}
        </Grid>

        <Grid>
          <Textfield
            ref={newRowInputLabelCell}
            outline
            value=""
            onSubmitKeyUp={() => setFieldToFocus(newRowOutputLabelCell.current)}
          />

          <Textfield
            ref={newRowOutputLabelCell}
            outline
            value=""
            onSubmit={createRow}
            onSubmitKeyUp={(key: string, value: string) => {
              if (value) {
                setFieldToFocus(newRowInputLabelCell.current);
              }
            }}
          />
          <div />
        </Grid>
      </section>
    </div>
  );
};

const enhance = compose<ComponentClass<OwnProps>>(
  connect<{}, DispatchProps, OwnProps, ModelState>(null, {
    create: UMLElementRepository.create,
    update: UMLElementRepository.update,
    delete: UMLElementRepository.delete,
    getById: UMLElementRepository.getById as any as AsyncDispatch<typeof UMLElementRepository.getById>,
  }),
);

/**
 * Component for editing title, counter, and rows in a cfc operation.
 * Provides a grid interface for adding, editing, and deleting rows.
 */
export const CfcOperationUpdate = enhance(BaseCfcOperationUpdate);
