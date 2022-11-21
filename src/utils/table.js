export const COLUMNS = [
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
    Header: 'Sections',
    accessor: 'sections',
    disableSortBy: true,
    Cell: ({ value }) => {
      return value ? (
        <div className="sections">
          {value.sort().map((section) => (
            <div key={section} className={`section ${section || ''}`}>
              {section}
            </div>
          ))}
        </div>
      ) : (
        'No Section'
      )
    },
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
