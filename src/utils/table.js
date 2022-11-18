export const COLUMNS = [
  {
    Header: 'No',
    Cell: (value) => value.row.index + 1,
  },
  {
    Header: 'Name',
    accessor: 'teacherName',
  },
  {
    Header: 'Branch',
    accessor: 'branch',
  },
  {
    Header: 'Sem',
    accessor: 'sem',
  },
  {
    Header: 'Subject',
    accessor: 'subfull',
  },
  {
    Header: 'Subcode',
    accessor: 'subcode',
  },
]
