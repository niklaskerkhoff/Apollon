import { UMLElementType } from '../../uml-element-type';
import { Text, Text as TextUtils } from '../../../utils/svg/text';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { ILayer } from '../../../services/layouter/layer';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { UMLContainer } from '../../../services/uml-container/uml-container';
import { ILayoutable } from '../../../services/layouter/layoutable';

/**
 * Represents an operation in cfc.
 * Contains rows to be connected with inputs and outputs.
 */
export class CfcOperation extends UMLContainer {
  static features: UMLElementFeatures = {
    ...UMLContainer.features,
    updatable: true,
    resizable: false,
    droppable: false,
    connectable: false,
  };

  type = UMLElementType.CfcOperation;

  private minWidth = 160;
  private minHeight = 30;

  render(canvas: ILayer, children?: ILayoutable[] | undefined): ILayoutable[] {
    this.autoWidth(canvas, children);
    this.autoHeight(children);

    return [this, ...(children ?? [])];
  }

  private autoWidth(canvas: ILayer, children?: ILayoutable[]): void {
    const presentChildren = children ?? [];

    const getChildWidth = (canvas: ILayer, child: UMLElement) => {
      const { inputLabel, outputLabel } = JSON.parse(child.name);

      const inputLabelWidth = TextUtils.size(canvas, inputLabel, { fontWeight: 'normal' }).width;
      const outputLabelWidth = TextUtils.size(canvas, outputLabel, { fontWeight: 'normal' }).width;

      return inputLabelWidth + outputLabelWidth + 50;
    };

    const getTitleWidth = (canvas: ILayer) => {
      const name = this.name ?? '';
      const title = JSON.parse(name).title ?? '';
      return Text.size(canvas, title, { fontWeight: 'bold' }).width + 70;
    };

    const getMaxLabelWidth = (canvas: ILayer, children: ILayoutable[]) => {
      return children.reduce((max, child) => {
        const childWidth = getChildWidth(canvas, child as UMLElement);
        return Math.max(max, childWidth);
      }, 0);
    };

    const newWidth = Math.max(this.minWidth, getTitleWidth(canvas), getMaxLabelWidth(canvas, presentChildren));
    const newWidthRounded = Math.ceil(newWidth / 10) * 10;

    [...presentChildren, this].forEach((element) => {
      element.bounds.width = newWidthRounded;
    });

  }

  private autoHeight(children?: ILayoutable[]) {
    let yOffset = 30;
    for (const child of children ?? []) {
      child.bounds.x = 0;
      child.bounds.y = yOffset;
      yOffset += child.bounds.height;
    }
    this.bounds.height = Math.max(yOffset, this.minHeight);
  }
}
