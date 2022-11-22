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
  const [isLoading, setIsLoading] = useState()
  // Functions
  const handleLoading = (value) => {
    setIsLoading(value)
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
      <StudentsTopBar handleLoading={handleLoading} isLoading={isLoading} />

      {studentsList && !isLoading ? (
        !studentsList?.length ? (
          <p className="noData">No students data found</p>
        ) : (
          <>
            <p className="totalStudents">
              Total : {studentsList.length} students found
            </p>
            <StudentsTable listData={studentsList} />
          </>
        )
      ) : null}
    </motion.div>
  )
}
