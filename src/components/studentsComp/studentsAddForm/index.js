import { useState } from 'react'
import { branchList, semList } from '../../../utils/deptData'

export default function StudentsAddForm({ studentData, handleChange }) {
  const { usn, number, branch, sec, sem, id } = studentData

  // States
  const [isLoading, setIsLoading] = useState(false)

  // Functions
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const handleDelete = (e) => {
    e.preventDefault()
  }
  return (
    <div className="teacherAddUpdate">
      <form onSubmit={handleSubmit}>
        <div className="formDiv">
          <input
            type="text"
            name="usn"
            placeholder="Enter Your USN"
            value={usn}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="number"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            placeholder="Your Phone Number"
            value={number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formDiv">
          <select required name="branch" value={branch} onChange={handleChange}>
            <option value="">Choose your Branch</option>
            {branchList.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
          <select required name="sem" value={sem} onChange={handleChange}>
            <option value="">Choose your sem</option>
            {semList.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
          <select required name="sec" value={sec} onChange={handleChange}>
            <option value="">Choose your section</option>
            {['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((item) => (
              <option key={item} value={item}>
                {item.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="btnDiv">
          {id ? (
            <>
              <button type="submit" className="btn green" disabled={isLoading}>
                {isLoading ? 'Updating' : 'Update'}
              </button>
              <button
                className="btn red"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? 'Deleting' : 'Delete'}
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                className="btn secondary"
                disabled={isLoading}
              >
                {isLoading ? 'Adding' : 'Add Data'}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}
