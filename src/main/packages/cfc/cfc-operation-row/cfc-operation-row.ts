import { UMLElementType } from '../../uml-element-type';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { computeDimension, IBoundary } from '../../../utils/geometry/boundary';

/**
 * Represents a row within an operation element in Continuous Function Charts (CFC).
 * Each row can have input and output connections to other CFC elements and displays
 * input/output labels. Rows are contained within CfcOperation elements and have a fixed height.
 * The row is connectable, allowing transitions to be drawn to and from it.
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
