import { useState } from 'react'
import toast from 'react-hot-toast'
import { getNotCompList } from '../../utils/firebase'
import './getNotComplete.style.css'

export default function GetNotComplete({ classInfo }) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    const id = toast.loading(<b>Getting Data</b>)
    try {
      const result = await getNotCompList(
        classInfo.branch,
        parseInt(classInfo.sem)
      )

      setData(result)
      setIsLoading(false)
      if (result.length === 0) {
        setIsEmpty(true)
      }
      toast.success(<b>Found data</b>, { id })
    } catch (error) {
      toast.error(<b>{error.message}</b>, { id })
      console.log('Something Went Wrong', error)
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setData([])
  }
  return (
    <div className="notCompleteWrapper">
      <div className="btnWrapper">
        <p>Get the students list who didnot complete feedback</p>
        <button onClick={handleClick}>
          {isLoading
            ? 'Loading..'
            : data.length > 0
            ? 'Refresh'
            : 'Get Students'}
        </button>
        {data.length > 0 && (
          <button onClick={handleClear} className="clear">
            Clear
          </button>
        )}
      </div>
      {data.length > 0 && (
        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th>NO</th>
                <th>USN</th>
                <th>SEC</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.usn}</td>
                  <td>{item.sec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isEmpty && <p className="noLeft">No students left for Feedback</p>}
    </div>
  )
}
