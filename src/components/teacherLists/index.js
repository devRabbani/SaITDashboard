import { useState } from 'react'
import { useMemo } from 'react'
import {
  FaSortAmountDown,
  FaSortAmountDownAlt,
  FaSortAmountUp,
} from 'react-icons/fa'
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table'
import { COLUMNS } from '../../utils/table'
import FilterTeacherTable from './filterTeacherTable'
import './teacherLists.style.css'

export default function TeacherList({ listData, handleEditBtn }) {
  const columns = useMemo(
    () => [
      ...COLUMNS,
      {
        Header: 'Action',
        Cell: (value) => (
          <button
            className="editBtn"
            onClick={() => handleEditBtn(value.row.original)}
          >
            Edit
          </button>
        ),
      },
    ],
    []
  )
  const data = useMemo(() => listData, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const { globalFilter, pageIndex } = state
  return (
    <div className="teacherLists">
      <FilterTeacherTable filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}

                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <FaSortAmountUp className="iconSort" />
                    ) : (
                      <FaSortAmountDown className="iconSort" />
                    )
                  ) : (
                    ''
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="paginationDiv">
        <button onClick={previousPage} disabled={!canPreviousPage}>
          Prev
        </button>
        <div className="pageNumbers">
          {pageOptions.map((page) => (
            <span
              className={pageIndex === page ? 'active' : ''}
              onClick={() => gotoPage(page)}
            >
              {page + 1}
            </span>
          ))}
        </div>
        <button onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>
  )
}
