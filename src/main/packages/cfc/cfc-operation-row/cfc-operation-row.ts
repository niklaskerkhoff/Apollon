import { UMLElementType } from '../../uml-element-type';
import { CfcElement } from '../base/cfc-element';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { Text as TextUtils } from '../../../utils/svg/text';
import { UMLElement } from '../../../services/uml-element/uml-element';

/**
 * Represents a row in a cfc operation.
 * Contains an action identifier and description.
 */
export class CfcOperationRow extends CfcElement {
  static features: UMLElementFeatures = {
    ...CfcElement.features,
    connectable: true,
    hoverable: true,
  };
  type = UMLElementType.CfcOperationRow;

  render(canvas: ILayer): ILayoutable[] {
    const { inputLabel, outputLabel } = JSON.parse(this.name);

    const inputLabelWidth = TextUtils.size(canvas, inputLabel, { fontWeight: 'normal' }).width;
    const outputLabelWidth = TextUtils.size(canvas, outputLabel, { fontWeight: 'normal' }).width;

    this.bounds.height = 30;
    this.bounds.width = Math.max(120, inputLabelWidth + outputLabelWidth + 50) // TODO: move width calculation to container
    return super.render(canvas);
  }
}
