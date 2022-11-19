import { useMemo } from 'react'
import {
  FaSortAmountDown,
  FaSortAmountDownAlt,
  FaSortAmountUp,
} from 'react-icons/fa'
import { useSortBy, useTable } from 'react-table'
import { COLUMNS } from '../../utils/table'
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
  console.log(data)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    )

  return (
    <div className="teacherLists">
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
          {rows.map((row) => {
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
    </div>
  )
}
