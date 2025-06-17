import { ComposePreview } from '../compose-preview';
import { ILayer } from '../../services/layouter/layer';
import { UMLElement } from '../../services/uml-element/uml-element';
import { CfcInputOutput } from './cfc-input-output/cfc-input-output';
import { CfcOperation } from './cfc-operation/cfc-operation';
import { CfcOperationRow } from './cfc-operation-row/cfc-operation-row';
import { CfcTransitionBranch } from './cfc-transition-branch/cfc-transition-branch';

export const composeCfcPreview: ComposePreview = (layer: ILayer, translate: (id: string) => string): UMLElement[] => {
  const cfcInputOutput = new CfcInputOutput({ name: JSON.stringify({ title: 'Variable', counter: '' }) });

  const cfcOperation = new CfcOperation({ name: JSON.stringify({ title: 'Operation', counter: '' }) });
  const cfcOperationRow = new CfcOperationRow({
    owner: cfcOperation.id,
    name: JSON.stringify({
      inputLabel: 'in',
      outputLabel: 'out',
    }),
  });
  cfcOperation.ownedElements = [cfcOperationRow.id];

  const cfcTransitionBranch = new CfcTransitionBranch({
    name: 'Branch',
    bounds: {
      x: -1_000_000_000_000,
    },
  });

  return [
    ...(cfcInputOutput.render(layer) as UMLElement[]),
    ...(cfcOperation.render(layer, [cfcOperationRow]) as UMLElement[]),
    ...(cfcTransitionBranch.render(layer) as UMLElement[]),
  ];
};
