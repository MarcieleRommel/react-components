/* eslint-disable react/prop-types */

import React from "react";
import classNames from "classnames";
import { Column as RVColumn } from "react-virtualized";

const Column = ({ columnProps, tableProps, key, theme }) => {
  const { onSort, sortBy, sortDirection } = tableProps;
  const {
    headerClassName,
    className,
    // eslint-disable-next-line no-unused-vars
    headerRenderer,
    truncate,
    ...otherColumnProps
  } = columnProps;

  return (
    <RVColumn
      key={key}
      headerClassName={classNames(
        theme.cell,
        theme.cell_truncate,
        headerClassName,
        key
      )}
      className={classNames(
        theme.cell,
        {
          [theme.cell_truncate]: truncate === undefined || truncate
        },
        className
      )}
      headerRenderer={// eslint-disable-next-line react/prop-types
      ({ label, dataKey, disableSort }) => {
        const isSortable = onSort && !disableSort;
        const isAscending = dataKey === sortBy && sortDirection === "ASC";
        const isDescending = dataKey === sortBy && sortDirection === "DESC";

        if (isSortable) {
          return (
            <button
              title={label}
              tabIndex={0}
              className={classNames(theme.cell_sortable, {
                [theme.ascending]: isAscending,
                [theme.descending]: isDescending
              })}
            >
              {label}
            </button>
          );
        }

        return (
          <span title={label}>
            {label}
          </span>
        );
      }}
      {...otherColumnProps}
    />
  );
};

export default Column;
