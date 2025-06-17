import { UMLElementType } from '../../uml-element-type';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { UMLContainer } from '../../../services/uml-container/uml-container';
import { UMLElement } from '../../../services/uml-element/uml-element';

/**
 * Represents a transition branch in a cfc.
 * A junction point where multiple transitions can converge or diverge.
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
