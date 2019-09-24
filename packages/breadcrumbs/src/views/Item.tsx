/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import classNames from 'classnames';
import { retrieveTheme } from '@zendeskgarden/react-theming';
import BreadcrumbStyles from '@zendeskgarden/css-breadcrumbs';

const COMPONENT_ID = 'breadcrumbs.item';

interface IItemProps {
  current?: boolean;
}

/**
 * Accepts all `<li>` props
 */
const Item: any = styled.li.attrs((props: IItemProps) => ({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION,
  className: classNames(BreadcrumbStyles['c-breadcrumb__item'], {
    // State
    [BreadcrumbStyles['is-current']]: props.current
  })
}))`
  ${props => retrieveTheme(COMPONENT_ID, props)};
`;

Item.hasType = () => Item;

/** @component */
export default Item as React.FunctionComponent<IItemProps>;
