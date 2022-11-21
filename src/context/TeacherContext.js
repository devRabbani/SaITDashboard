import { useState } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'

const TeacherDataContext = createContext()

export const useTeacherData = () => useContext(TeacherDataContext)

export default function TeacherDataContextProvider({ children }) {
  const [data, setData] = useState()

  const addTeacherData = (value) => {
    setData(value)
  }
  return (
    <TeacherDataContext.Provider value={{ data, addTeacherData }}>
      {children}
    </TeacherDataContext.Provider>
  )
}
