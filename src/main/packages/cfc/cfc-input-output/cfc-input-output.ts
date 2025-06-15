import { UMLElementType } from '../../uml-element-type';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { Text } from '../../../utils/svg/text';
import { CfcElement } from '../base/cfc-element';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { UMLContainer } from '../../../services/uml-container/uml-container';

/**
 * Represents an input or an output in cfc.
 */
export class CfcInputOutput extends CfcElement {
  static features: UMLElementFeatures = {
    ...UMLContainer.features,
    resizable: false,
    updatable: true,
  };
  type = UMLElementType.CfcInputOutput;

  render(canvas: ILayer): ILayoutable[] {
    this.autoWidth(canvas);
    this.bounds.height = 30;

    return [this];
  }

  private autoWidth(canvas: ILayer): void {
    const title = JSON.parse(this.name ?? '').title ?? '';
    const nameWidth = Text.size(canvas, title, { fontWeight: 'bold' }).width + 70;
    this.bounds.width = Math.max(nameWidth, 120);
  }
}
