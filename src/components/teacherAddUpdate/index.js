import { useState } from 'react'

const semList = [
  { name: '1st', value: 1 },
  { name: '2nd', value: 2 },
  { name: '3rd', value: 3 },
  { name: '4th', value: 4 },
  { name: '5th', value: 5 },
  { name: '6th', value: 6 },
  { name: '7th', value: 7 },
  { name: '8th', value: 8 },
]

const branchList = [
  { name: 'CSE', value: 'cse' },
  { name: 'ISE', value: 'ise' },
  { name: 'MECH', value: 'mech' },
  { name: 'CIV', value: 'civ' },
  { name: 'ECE', value: 'ece' },
]

export default function TeacherAddUpdate({
  teacherData,
  handleChange,
  handleIsFormOpen,
  handleIsFormClose,
  isForm,
}) {
  const { teacherName, sem, branch, subcode, subfull, id, avgRating, total } =
    teacherData

  return (
    <div className="teacherAddUpdate">
      {isForm ? (
        <form>
          <div className="formDiv">
            <input
              type="text"
              name="teacherName"
              placeholder="Enter Teacher Name"
              value={teacherName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="subfull"
              placeholder="Enter Full Subject Name"
              value={subfull}
              onChange={handleChange}
            />
          </div>
          <div className="formDiv">
            <input
              type="text"
              name="subcode"
              placeholder="Enter Subcode Eg:18CS21"
              value={subcode}
              onChange={handleChange}
            />
            <select name="sem" value={sem} onChange={handleChange}>
              <option value="">Choose your sem</option>
              {semList.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
            <select name="branch" value={branch} onChange={handleChange}>
              <option value="">Choose your Branch</option>
              {branchList.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="btnDiv">
            {id ? (
              <>
                <button className="btn green">Update</button>
                <button className="btn red">Delete</button>
                <button onClick={handleIsFormClose} className="btn border-grey">
                  Close
                </button>
              </>
            ) : (
              <>
                <button className="btn secondary">Add Data</button>
                <button onClick={handleIsFormClose} className="btn border-grey">
                  Close
                </button>
              </>
            )}
          </div>
        </form>
      ) : (
        <button onClick={handleIsFormOpen} className="btn border-blue">
          Add Data
        </button>
      )}
    </div>
  )
}
