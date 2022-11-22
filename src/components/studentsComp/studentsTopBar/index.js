import { useState } from 'react'
import toast from 'react-hot-toast'
import { useMainData } from '../../../context/mainDataContext'
import { basicSelect, branchSelect, semSelect } from '../../../utils/deptData'
import { getStudentsFromDB } from '../../../utils/firebase'
import LoaderSvg from '../../loaderSvg'

export default function StudentsTopBar({ handleLoading, isLoading }) {
  const { studentsList, branch: mainBranch, master, dispatch } = useMainData()
  // States
  const [classInfo, setClassInfo] = useState({
    sem: '',
    branch: mainBranch,
  })

  const { sem, branch } = classInfo

  // Functions
  const handleGetStudents = async (e) => {
    e.preventDefault()
    handleLoading(true)
    const id = toast.loading(<b>Collecting students data</b>)
    try {
      const res = await getStudentsFromDB(branch, parseInt(sem))
      if (res) {
        dispatch({
          type: 'ADD_DATA',
          payload: { name: 'studentsList', value: res },
        })
        handleLoading(false)
        toast.success(<b>Found students data</b>, { id })
      } else {
        dispatch({
          type: 'ADD_DATA',
          payload: { name: 'studentsList', value: [] },
        })
        throw new Error('Not found any students data')
      }
    } catch (error) {
      console.log(error.message)
      handleLoading(false)
      toast.error(<b>{error.message}</b>, { id })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setClassInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="getStudents">
      <p>{master ? 'Select Department and Semester' : 'Select Semester'}</p>
      <form onSubmit={handleGetStudents}>
        {master ? (
          <select required name="branch" value={branch} onChange={handleChange}>
            {branchSelect.map((branch, i) => (
              <option key={i} value={branch.value}>
                {branch.name}
              </option>
            ))}
          </select>
        ) : null}

        {branch && (
          <select required name="sem" value={sem} onChange={handleChange}>
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
          {isLoading
            ? 'Getting Data'
            : studentsList?.length > 0
            ? 'Refresh'
            : 'Get Students'}
        </button>
      </form>
    </div>
  )
}
