import { UMLElementType } from '../../uml-element-type';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { Text } from '../../../utils/svg/text';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { UMLContainer } from '../../../services/uml-container/uml-container';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { computeDimension, IBoundary } from '../../../utils/geometry/boundary';

/**
 * Represents an input or an output in cfc.
 */
export class CfcInputOutput extends UMLElement {
  static features: UMLElementFeatures = {
    ...UMLContainer.features,
    resizable: false,
    updatable: true,
  };

  type = UMLElementType.CfcInputOutput;

  bounds: IBoundary = { ...this.bounds, height: computeDimension(1.0, 30) };

  render(canvas: ILayer): ILayoutable[] {
    this.autoWidth(canvas);
    return [this];
  }

  private autoWidth(canvas: ILayer): void {
    const title = JSON.parse(this.name).title;
    const titleWidth = Text.size(canvas, title, { fontWeight: 'bold' }).width + 70;
    this.bounds.width = Math.max(titleWidth, 160);
  }
}
