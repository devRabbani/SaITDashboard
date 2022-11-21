import { motion } from 'framer-motion'
import { useState } from 'react'
import { useEffect } from 'react'
import { useTeacherData } from '../../context/TeacherContext'
import useTitle from '../../hooks/useTitle'

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
    y: 100,
    opacity: 0,
    transition: { ease: 'easeInOut' },
  },
}

const sems = [1, 2, 3, 4, 5, 6, 7, 8]
const secs = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

export default function Classes() {
  const { data, addTeacherData } = useTeacherData()
  const [classLists, setClassLists] = useState([])

  const handleData = () => {}

  useEffect(() => {
    handleData()
  }, [data])

  useTitle('Classes | SaITFeedbackAdmin')
  return (
    <motion.div
      variants={wrapperVariants}
      animate="visible"
      initial="hidden"
      exit="exit"
    >
      <h1 className="adminHeadline">Classes</h1>
      <p className="intro">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
        quaerat doloresoluta ullam natus, debitis illo fuga similique fugiat
        eaque eveniet quod ad, excepturi quasi quam qua magni ipsa architecto.
      </p>
      <p>{JSON.stringify(classLists)}</p>
      <p>{JSON.stringify(data)}</p>
    </motion.div>
  )
}
