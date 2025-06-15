// Continuous Function Chart (Signalflussplan, CFC)

export const CfcElementType = {
  CfcOperation: 'CfcOperation',
  CfcOperationRow: 'CfcOperationRow',
  CfcInputOutput: 'CfcInputOutput',
  // CfcReturn: 'CfcReturn',
  CfcTransitionBranch: 'CfcTransitionBranch',
} as const;

export const CfcRelationshipType = {
  CfcTransition: 'CfcTransition',
} as const;
