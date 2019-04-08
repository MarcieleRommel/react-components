/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { shallow } from 'enzyme';
import Body from './Body';

describe('Body', () => {
  it('renders default styling', () => {
    const wrapper = shallow(<Body />);

    expect(wrapper).toHaveClassName('c-dialog__body');
  });
});
