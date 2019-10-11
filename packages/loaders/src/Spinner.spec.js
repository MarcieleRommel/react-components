/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render, act } from 'garden-test-utils';
import mockDate from 'mockdate';
import Spinner from './Spinner';

jest.useFakeTimers();

const DEFAULT_DATE = new Date(2019, 1, 5, 1, 1, 1);

describe('Spinner', () => {
  beforeEach(() => {
    clearTimeout.mockClear();
    global.cancelAnimationFrame = jest.fn();
    global.requestAnimationFrame = jest.fn();
    mockDate.set(DEFAULT_DATE);
  });

  afterEach(() => {
    mockDate.reset();
  });

  describe('Loading delay', () => {
    it('hides loader for initial delay', () => {
      const { queryByTestId } = render(<Spinner data-test-id="spinner" />);

      expect(queryByTestId('spinner')).toBeNull();
    });

    it('shows loader after initial delay', () => {
      const { queryByTestId } = render(<Spinner data-test-id="spinner" />);

      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(queryByTestId('spinner')).not.toBeNull();
    });
  });

  describe('Animation', () => {
    it('updates animation after request animation frame', () => {
      const { container } = render(<Spinner data-test-id="spinner" />);

      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(container.firstChild.firstChild).toMatchInlineSnapshot(`
        <circle
          class=""
          cx="40"
          cy="40"
          fill="none"
          r="34"
          stroke="currentColor"
          stroke-dasharray="undefined 250"
          stroke-linecap="round"
          transform="rotate(-90, 40, 40)"
        />
      `);

      act(() => {
        // move time forward 1 second
        mockDate.set(DEFAULT_DATE.setSeconds(2));
        requestAnimationFrame.mock.calls[0][0]();
      });

      expect(container.firstChild.firstChild).toMatchInlineSnapshot(`
        <circle
          class="styled-elements__SpinnerCircle-sc-19dhio6-4 glGYSu"
          cx="40"
          cy="40"
          fill="none"
          r="34"
          stroke="currentColor"
          stroke-dasharray="undefined 250"
          stroke-linecap="round"
          transform="rotate(186.6, 40, 40)"
        />
      `);
    });
  });
});
