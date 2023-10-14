import {Modifier} from "@dnd-kit/core";
import type {ClientRect} from '@dnd-kit/core';
import type {Transform} from '@dnd-kit/utilities';
let isSeen = false

export const restrictToEdges: Modifier = ({
  transform,
  draggingNodeRect,
  windowRect,
  activatorEvent,
}) => {
  if (!draggingNodeRect || !windowRect) {
    return transform;
  }
  const itemData = activatorEvent!.target!.style.transform
  return restrictToBoundingRect(transform, draggingNodeRect, windowRect, itemData)
};

const filterTransform = (transformValue: string): {x: number, y: number} => {
  const transformFilter = RegExp(/\d+(?=px)/gm)
  const filteredValues = transformFilter.exec(transformValue)
  if(Array.isArray(filteredValues) && filteredValues?.length >=2){
    return {
      x: parseInt(filteredValues[0]),
      y: parseInt(filteredValues[1])
    }
  }
  return {x: 0, y: 0}
}
export function restrictToBoundingRect(
  transform: Transform,
  rect: ClientRect,
  boundingRect: ClientRect,
  itemData: {x: number, y: number}
): Transform {
  const value = {
    ...transform,
  };
  console.log("BOUNDING RECT",boundingRect)
  console.log("RECT",rect)
  if (rect.top + transform.y <= boundingRect.top) {
    value.y = boundingRect.top - rect.top;
  } else if (
    rect.bottom + transform.y >=
    boundingRect.top + boundingRect.height
  ) {
    value.y = boundingRect.top + boundingRect.height - rect.bottom;
  }

  if (rect.left + transform.x <= boundingRect.left) {
    value.x = boundingRect.left - rect.left;
  } else if (
    rect.right + transform.x >=
    boundingRect.left + boundingRect.width
  ) {
    value.x = boundingRect.left + boundingRect.width - rect.right;
  }

  return value;
}