import { Style } from '../models/style';
import { StyleDeclaration } from '../../../dom-traverser/dom-visitor';

export type BorderStyle  =
  'none' |
  'hidden' |
  'dotted' |
  'dashed' |
  'solid' |
  'double' |
  'groove' |
  'ridge' |
  'inset' |
  'outset';

export interface Border {
  width: string;
  style: BorderStyle;
  color: string;
}

/**
 * converts Border String in Border Object
 * @param {string} border 13px solid rgb(0, 0, 255)
 * @returns {Border} Object with width style and color
 * @see https://regex101.com/r/5QtZ6i/2/
 */
export function borderStringToObject(border: string): Border {
  const b = border.match(/(^\d+?px)\s(\w+?)\s(.+)$/);
  return {
    width: b[1],
    style: b[2] as BorderStyle,
    color: b[3],
  };
}

export function createBorder(elementStyle: Style,  style: StyleDeclaration) {
  const borders = [
    style.borderLeft,
    style.borderTop,
    style.borderRight,
    style.borderBottom,
  ];
  const border = new Set<string>(borders);

  if (border.size === 1) {
    const b = borderStringToObject(borders[0]);
    const size = parseInt(b.width, 10);
    if (size > 0 && b.style !== 'none') {
      elementStyle.addBorder(b.color, size);
    }
  } else {
    for (let i = 0, max = borders.length; i < max; i += 1) {
      const b =  borderStringToObject(borders[i]);
      const size = parseInt(b.width, 10);
      if (size < 1 || b.style === 'none') { continue; }

      const direction = (i < 2) ? -1 : 1; // left and top should be negative offset
      const offsetX = (i % 2 === 0) ? direction * size : 0;
      const offsetY = (i % 2 !== 0) ? direction * size : 0;
      elementStyle.addShadow({
        offsetX,
        offsetY,
        color: b.color,
        blurRadius: 0,
        spread: 0,
      });
    }
  }

}