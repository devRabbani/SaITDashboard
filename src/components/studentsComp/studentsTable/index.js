import { useMemo } from 'react'
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md'
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table'
import { STUDENTS_COLUMN } from '../../../utils/table'
import Pagination from '../../pagination'
import { motion } from 'framer-motion'
import FilterTeacherTable from '../../teacherLists/filterTeacherTable'

const tableVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.7, ease: 'easeInOut' },
      duration: 0.3,
    },
  },
  // exit: {
  //   y: 100,
  //   opacity: 0,
  //   transition: { ease: 'easeInOut' },
  // },
}

export default function StudentsTable({ listData }) {
  const columns = useMemo(
    () => [
      ...STUDENTS_COLUMN,
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

  // Functions
  const handleEditBtn = (e) => {
    e.preventDefault()
  }

  return (
    <motion.div variants={tableVariants}>
      <div className="studentLists">
        <FilterTeacherTable
          filter={globalFilter}
          setFilter={setGlobalFilter}
          setColumnFilters={setFilter}
          columnFilters={filters}
          setAll={setAllFilters}
          isStudentTable={true}
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
                        <MdOutlineArrowDropUp className="iconSort" />
                      ) : (
                        <MdOutlineArrowDropDown className="iconSort" />
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
    </motion.div>
  )
}
