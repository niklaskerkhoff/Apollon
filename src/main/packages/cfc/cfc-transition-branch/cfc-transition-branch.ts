import { UMLElementType } from '../../uml-element-type';
import { CfcElement } from '../base/cfc-element';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';

/**
 * Represents a transition branch in a cfc.
 * A junction point where multiple transitions can converge or diverge.
 */
export class CfcTransitionBranch extends CfcElement {
  type = UMLElementType.CfcTransitionBranch;

  render(canvas: ILayer): ILayoutable[] {
    this.bounds.width = 20;
    this.bounds.height = 20;
    return [this];
  }
}
