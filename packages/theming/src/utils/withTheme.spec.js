/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render, renderRtl } from 'garden-test-utils';
import withTheme from './withTheme';
import defaultTheme from '../theme';

const Example = ({ theme: { rtl } }) => {
  return <div data-rtl={rtl ? rtl : false}>test</div>;
};

const ThemedExample = withTheme(Example);

const Div = ({ theme }) => <div data-test={theme.space.base}>test</div>;

const NoThemedExample = withTheme(Div);

describe('withTheme', () => {
  it('should apply theme prop to component with correct value in LTR mode', () => {
    const { container } = render(<ThemedExample />);

    expect(container.firstChild).toHaveAttribute('data-rtl', 'false');
  });

  it('should apply theme prop to component with correct value in RTL mode', () => {
    const { container } = renderRtl(<ThemedExample />);

    expect(container.firstChild).toHaveAttribute('data-rtl', 'true');
  });

  it('sets defaultProps if theme is missing', () => {
    expect(Div.defaultProps.theme).toBe(defaultTheme);
  });

  it('applies the default theme, if missing, to the wrapped component', () => {
    const { container } = render(<NoThemedExample />);

    expect(container.firstChild).toHaveAttribute('data-test', defaultTheme.space.base.toString());
  });
});
