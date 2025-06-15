import { UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
import { UMLRelationshipType } from '../../uml-relationship-type';
import { UMLRelationshipFeatures } from '../../../services/uml-relationship/uml-relationship-features';

/**
 * Represents a transition between elements in a cfc.
 */
export class CfcTransition extends UMLRelationship {
  static features: UMLRelationshipFeatures = {
    ...UMLRelationship.features,
    updatable: false,
    straight: false,
    variable: false,
  };
  type = UMLRelationshipType.CfcTransition;
}
