import Color from 'color';
import {__COLORS} from './Colors';

export const getAlphaColor = (alpha: number, color: __COLORS) => {
  return Color(color)
    .rgb()
    .alpha(alpha)
    .string();
};
