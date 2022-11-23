import useTitle from '../../hooks/useTitle'
import { motion } from 'framer-motion'
import LoaderSvg from '../../components/loaderSvg'
import { useMainData } from '../../context/mainDataContext'
import { useState } from 'react'
import { basicSelect, branchSelect, semSelect } from '../../utils/deptData'
import StudentsTopBar from '../../components/studentsComp/studentsTopBar'
import './students.styles.css'
import StudentsTable from '../../components/studentsComp/studentsTable'
import toast from 'react-hot-toast'
import StudentsAddForm from '../../components/studentsComp/studentsAddForm'

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
  const { studentsList } = useMainData()
  // States
  const [isLoading, setIsLoading] = useState(false)
  const [isForm, setIsForm] = useState(false)
  const [studentData, setStudentData] = useState({
    usn: '',
    number: '',
    branch: '',
    sec: '',
    sem: '',
  })

  // Functions
  const handleLoading = (value) => {
    setIsLoading(value)
  }
  // Callback function for open isform
  const handleFormOpen = () => {
    setIsForm(true)
  }

  // Callback function for close isform
  const handleFormClose = () => {
    setIsForm(false)
  }

  // Changing inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Update selected 1
  const handleFormUpdate = (value) => {
    setStudentData(value)
    setIsForm(true)
  }

  useTitle('Students | SaITFeedbackAdmin')
  return (
    <motion.div
      variants={wrapperVariants}
      animate="visible"
      initial="hidden"
      exit="exit"
    >
      <h1 className="adminHeadline">Students</h1>
      <p className="intro">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum
        modi odit aperiam quod. Velit ad illum reprehenderit ratione culpa?
        Pariatur omnis aliquid minima? Modi, sed culpa ipsam fugit beatae rerum?
      </p>
      <StudentsTopBar
        handleLoading={handleLoading}
        isLoading={isLoading}
        isForm={isForm}
        handleFormClose={handleFormClose}
        handleFormOpen={handleFormOpen}
      />
      {isForm ? (
        <StudentsAddForm
          handleChange={handleChange}
          studentData={studentData}
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
