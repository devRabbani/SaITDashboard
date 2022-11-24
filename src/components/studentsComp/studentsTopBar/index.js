import { basicSelect, branchSelect, semSelect } from '../../../utils/deptData'

export default function StudentsTopBar({
  handleGetStudents,
  isLoading,
  isForm,
  handleFormClose,
  handleFormOpen,
  handleChange,
  branch,
  sem,
  master,
  isData,
}) {
  // Functions
  // Clicking add data
  const handleClick = (e) => {
    e.preventDefault()
    if (isForm) {
      handleFormClose()
    } else {
      handleFormOpen()
    }
  }

  return (
    <div className="getStudents">
      <p>{master ? 'Select Department and Semester' : 'Select Semester'}</p>
      <form onSubmit={handleGetStudents}>
        {master ? (
          <select required name="branch" value={branch} onChange={handleChange}>
            <option value="">Choose Branch</option>
            {branchSelect.map((branch, i) => (
              <option key={i} value={branch.value}>
                {branch.name}
              </option>
            ))}
          </select>
        ) : null}

        {branch && (
          <select required name="sem" value={sem} onChange={handleChange}>
            <option value="">Select Semester</option>
            {!(branch === 'bs')
              ? semSelect.map((semItem, i) => (
                  <option value={semItem.value} key={i}>
                    {semItem.name}
                  </option>
                ))
              : basicSelect.map((semItem, i) => (
                  <option value={semItem.value} key={i}>
                    {semItem.name}
                  </option>
                ))}
          </select>
        )}

        <button
          disabled={isLoading}
          className="btn primary medium"
          type="submit"
        >
          {isLoading ? 'Getting Data' : isData ? 'Refresh' : 'Get Students'}
        </button>
        <button
          onClick={handleClick}
          className={`btn ${isForm ? 'border-grey' : 'border-blue'}`}
        >
          {isForm ? 'Close' : 'Add data'}
        </button>
      </form>
    </div>
  )
}
