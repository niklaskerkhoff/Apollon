import { UMLElementType } from '../../uml-element-type';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { UMLContainer } from '../../../services/uml-container/uml-container';
import { UMLElement } from '../../../services/uml-element/uml-element';

/**
 * Represents a transition branch (junction point) in Continuous Function Charts (CFC).
 * This element serves as a node where multiple transitions can converge or diverge,
 * allowing for the creation of complex flow patterns in CFC diagrams. The branch
 * has a fixed size of 20x20 pixels and cannot be resized or updated by the user.
 */
export class CfcTransitionBranch extends UMLElement {
  static features: UMLElementFeatures = {
    ...UMLContainer.features,
    resizable: false,
    updatable: false,
  };

  type = UMLElementType.CfcTransitionBranch;

  render(canvas: ILayer): ILayoutable[] {
    this.bounds.width = 20;
    this.bounds.height = 20;
    return [this];
  }
}
