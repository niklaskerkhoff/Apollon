import { UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
import { UMLRelationshipType } from '../../uml-relationship-type';
import { UMLRelationshipFeatures } from '../../../services/uml-relationship/uml-relationship-features';

/**
 * Represents a transition (connection) between elements in Continuous Function Charts (CFC).
 * Transitions connect operation rows with input/output variables or other operations,
 * showing the flow of data or control in the CFC diagram.
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
