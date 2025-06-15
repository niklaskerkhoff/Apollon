import { CfcContainer } from '../base/cfc-container';
import { UMLElementType } from '../../uml-element-type';
import { Text } from '../../../utils/svg/text';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { ILayer } from '../../../services/layouter/layer';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';

/**
 * Represents an operation in cfc.
 * Contains rows to be connected with inputs and outputs.
 */
export class CfcOperation extends CfcContainer {
  static features: UMLElementFeatures = {
    ...CfcContainer.features,
    droppable: true,
    connectable: false,
  };

  type = UMLElementType.CfcOperation;
  override minHeight = 30;

  override childWidthCalculation = (canvas: ILayer, child: UMLElement) => {
    const name = (child as UMLElement).name;
    if (!name) return 0;
    const parsedName = JSON.parse((child as UMLElement).name);
    return Text.size(canvas, parsedName.title ?? 0, { fontWeight: 'normal' }).width + 50;
  };
}
