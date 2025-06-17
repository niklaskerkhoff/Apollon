import React, { ComponentClass } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { ColorButton } from '../../../components/controls/color-button/color-button';
import { Textfield } from '../../../components/controls/textfield/textfield';
import { I18nContext } from '../../../components/i18n/i18n-context';
import { localized } from '../../../components/i18n/localized';
import { ModelState } from '../../../components/store/model-state';
import { StylePane } from '../../../components/style-pane/style-pane';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { IUMLElement } from '../../../services/uml-element/uml-element';

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface OwnProps {
  element: IUMLElement;
}

interface DispatchProps {
  update: typeof UMLElementRepository.update;
}

type Props = OwnProps & DispatchProps & I18nContext;

const BaseCfcNameWithCounterUpdate = ({ element, update }: Props) => {
  const [colorOpen, setColorOpen] = React.useState(false);

  const { title, counter } = JSON.parse(element.name);

  const toggleColor = () => {
    setColorOpen(!colorOpen);
  };

  const changeTitle = (title: string) => {
    const name = JSON.stringify({ title, counter });
    update(element.id, { name });
  };

  const changeCounter = (counter: string) => {
    const name = JSON.stringify({ title, counter });
    update(element.id, { name });
  };

  return (
    <div>
      <section>
        <Flex>
          <Textfield style={{ flex: 1 }} value={title} onChange={changeTitle} autoFocus />
          <Textfield
            style={{ flex: 0, minWidth: 40, maxWidth: 40, textAlign: 'center' }}
            value={counter}
            onChange={changeCounter}
          />
          <ColorButton onClick={toggleColor} />
        </Flex>
        <StylePane open={colorOpen} element={element} onColorChange={update} fillColor lineColor textColor />
      </section>
    </div>
  );
};

const enhance = compose<ComponentClass<OwnProps>>(
  localized,
  connect<{}, DispatchProps, OwnProps, ModelState>(null, {
    update: UMLElementRepository.update,
  }),
);

/**
 * Component for updating the name of a cfc element.
 * Provides a text field for editing the name and a color button for styling.
 */
export const CfcNameWithCounterUpdate = enhance(BaseCfcNameWithCounterUpdate);
