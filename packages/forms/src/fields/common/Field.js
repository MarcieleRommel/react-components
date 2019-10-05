/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@zendeskgarden/container-field';
import { StyledField } from '../../styled';

export const FieldContext = createContext(undefined);

/**
 * Provides accessibility attributes to child form fields. Accepts all `<div>`
 * attributes and events.
 */
function Field({ id, children }) {
  const fieldProps = useField(id);

  return (
    <FieldContext.Provider value={fieldProps}>
      <StyledField>{children}</StyledField>
    </FieldContext.Provider>
  );
}

Field.propTypes = {
  /**
   * The ID that is used as the base for accessiblity attributes
   */
  id: PropTypes.string,
  children: PropTypes.node
};

export default Field;
