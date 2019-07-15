/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { rgba } from 'polished';
import { default as getColor } from '../utils/getColor';
import { DefaultTheme } from 'styled-components';

export const shadowWidths = {
  sm: '2px',
  md: '3px'
};

export const shadows = {
  sm: (color: string) => `0 0 0 ${shadowWidths.sm} ${color}`,
  md: (color: string) => `0 0 0 ${shadowWidths.md} ${color}`,
  lg: (offsetY: string, blurRadius: string, theme: DefaultTheme) =>
    `0 ${offsetY} ${blurRadius} 0 ${rgba(getColor({ hue: '__chrome', shade: 600, theme }), 0.15)}`
};
