import useTitle from '../../hooks/useTitle'
import { motion } from 'framer-motion'
import { useMainData } from '../../context/mainDataContext'
import { useRef, useState } from 'react'
import StudentsTopBar from '../../components/studentsComp/studentsTopBar'
import './students.styles.css'
import StudentsTable from '../../components/studentsComp/studentsTable'
import toast from 'react-hot-toast'
import StudentsAddForm from '../../components/studentsComp/studentsAddForm'
import { getStudentsFromDB } from '../../utils/firebase'

const wrapperVariants = {
  hidden: {
    opacity: 0,
    y: -70,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.7, ease: 'easeInOut' },
      duration: 0.3,
    },
  },
  exit: {
    y: 140,
    opacity: 0,
    transition: { ease: 'easeInOut' },
  },
}
export default function Students() {
  const { studentsList, branch: mainBranch, master, dispatch } = useMainData()
  // States
  const [classInfo, setClassInfo] = useState({
    sem: '',
    branch: mainBranch,
  })
  const { sem, branch } = classInfo
  // States
  const [isLoading, setIsLoading] = useState(false)
  const [isForm, setIsForm] = useState(false)
  const [studentData, setStudentData] = useState({
    usn: '',
    number: '',
    branch: '',
    sec: '',
    sem: '',
    status: false,
  })

  // Top Ref for scrolling
  const topRef = useRef()

  // Functions

  // Callback function for open isform
  const handleFormOpen = () => {
    setIsForm(true)
  }

  // Callback function for close isform
  const handleFormClose = () => {
    setIsForm(false)
    setStudentData({
      usn: '',
      number: '',
      branch: '',
      sec: '',
      sem: '',
      status: false,
    })
  }

  // Changing inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Changing selects for getting studentdata
  const handleChangeClass = (e) => {
    const { name, value } = e.target
    setClassInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Update selected 1
  const handleFormUpdate = (value) => {
    setStudentData(value)
    setIsForm(true)
    topRef.current.scrollIntoView()
  }

  // Fetch Student Data
  const handleGetStudents = async (e) => {
    if (e) {
      e.preventDefault()
    }
    setIsLoading(true)
    const id = toast.loading(<b>Collecting students data</b>)
    try {
      const res = await getStudentsFromDB(branch, parseInt(sem))
      if (res) {
        dispatch({
          type: 'ADD_DATA',
          payload: { name: 'studentsList', value: res },
        })
        setIsLoading(false)
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
      setIsLoading(false)
      toast.error(<b>{error.message}</b>, { id })
    }
  }

  useTitle('Students | SaITFeedbackAdmin')
  return (
    <motion.div
      variants={wrapperVariants}
      animate="visible"
      initial="hidden"
      exit="exit"
    >
      <h1 className="adminHeadline" ref={topRef}>
        Students
      </h1>
      <StudentsTopBar
        handleGetStudents={handleGetStudents}
        isLoading={isLoading}
        isForm={isForm}
        handleFormClose={handleFormClose}
        handleFormOpen={handleFormOpen}
        handleChange={handleChangeClass}
        branch={branch}
        sem={sem}
        master={master}
        isData={studentsList?.length > 0}
      />
      {isForm ? (
        <StudentsAddForm
          handleChange={handleChange}
          studentData={studentData}
          handleGetStudents={handleGetStudents}
          handleFormClose={handleFormClose}
        />
      ) : null}
      {studentsList && !isLoading ? (
        !studentsList?.length ? (
          <p className="noData">No students data found</p>
        ) : (
          <>
            <p className="totalStudents">
              Total : {studentsList.length} students found
            </p>
            <StudentsTable
              listData={studentsList}
              handleFormUpdate={handleFormUpdate}
            />
          </>
        )
      ) : null}
    </motion.div>
  )
}
