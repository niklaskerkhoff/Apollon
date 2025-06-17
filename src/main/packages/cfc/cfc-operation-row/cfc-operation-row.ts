import { UMLElementType } from '../../uml-element-type';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { computeDimension, IBoundary } from '../../../utils/geometry/boundary';

/**
 * Represents a row in a cfc operation.
 * Contains an action identifier and description.
 */
export class CfcOperationRow extends UMLElement {
  static features: UMLElementFeatures = {
    ...UMLElement.features,
    connectable: true,
    resizable: false,
    updatable: false,
    hoverable: true,
    movable: false,
  };

  type = UMLElementType.CfcOperationRow;

  bounds: IBoundary = { ...this.bounds, height: computeDimension(1.0, 30) };

  render(canvas: ILayer): ILayoutable[] {
    return [this];
  }
}
