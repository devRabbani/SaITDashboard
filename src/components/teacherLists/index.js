import { useState } from 'react'
import { useMemo } from 'react'
import {
  FaSortAmountDown,
  FaSortAmountDownAlt,
  FaSortAmountUp,
} from 'react-icons/fa'
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table'
import { COLUMNS } from '../../utils/table'
import Pagination from '../pagination'
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
    setFilter,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    setAllFilters,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 20 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const { globalFilter, pageIndex, filters } = state

  return (
    <div className="teacherLists">
      <FilterTeacherTable
        filter={globalFilter}
        setFilter={setGlobalFilter}
        setColumnFilters={setFilter}
        columnFilters={filters}
        setAll={setAllFilters}
      />
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
      {!page.length ? <p className="noDataTable">No Data Found</p> : null}

      <Pagination
        gotoPage={gotoPage}
        canNextPage={canNextPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        previousPage={previousPage}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
      />
    </div>
  )
}
