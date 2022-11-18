import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import TeacherAddUpdate from '../../components/teacherAddUpdate'
import TeacherList from '../../components/teacherLists'
import useTitle from '../../hooks/useTitle'
import { getDBData } from '../../utils/firebase'
import './teachers.style.css'

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
export default function Teachers() {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [teacherData, setTeacherData] = useState({
    teacherName: '',
    branch: '',
    sem: '',
    subcode: '',
    subfull: '',
    total: 0,
    avgRating: 0,
  })
  const [isForm, setIsForm] = useState(false)

  // Refs
  // Scroll Ref
  const topRef = useRef()

  // Callback function for isformChange
  const handleIsFormOpen = () => {
    setIsForm(true)
  }

  // Callback function for close isform
  const handleIsFormClose = () => {
    setTeacherData({
      teacherName: '',
      branch: '',
      sem: '',
      subcode: '',
      subfull: '',
      total: 0,
      avgRating: 0,
    })
    setIsForm(false)
  }

  // Changing Inputs
  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setTeacherData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Callback function for single row editing
  const handleEditBtn = (item) => {
    setIsForm(true)
    topRef.current.scrollIntoView()
    setTeacherData(item)
  }

  // Getting teacher lists
  const handleClick = async () => {
    setIsLoading(true)
    const id = toast.loading(<b>Getting teacher lists</b>)
    try {
      const res = await getDBData('teachers')
      if (res) {
        setData(res)
      }
      toast.success(<b>Got the data</b>, { id })
      setIsLoading(false)
    } catch (error) {
      toast.error(<b>{error.message}</b>, { id })
      console.log(error.message)
      setIsLoading(false)
    }
  }

  useTitle('Teachers | SaITFeedbackAdmin')
  return (
    <motion.div
      variants={wrapperVariants}
      animate="visible"
      initial="hidden"
      exit="exit"
      className="teachersWrapper"
    >
      <h1 className="adminHeadline" ref={topRef}>
        Teachers
      </h1>
      <p className="intro">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
        quaerat dolore soluta ullam natus, debitis illo fuga similique fugiat
        eaque eveniet quod ad, excepturi quasi quam quae magni ipsa architecto.
      </p>
      <button
        onClick={handleClick}
        className="btn primary medium"
        disabled={isLoading}
      >
        {isLoading ? 'Loading..' : 'Get Teacher Lists'}
      </button>

      <TeacherAddUpdate
        handleIsFormOpen={handleIsFormOpen}
        handleIsFormClose={handleIsFormClose}
        isForm={isForm}
        handleChange={handleChange}
        teacherData={teacherData}
        topRef={topRef}
      />

      {data && !isLoading ? (
        !data?.length ? (
          <p className="noData">No teacher data found</p>
        ) : (
          <TeacherList handleEditBtn={handleEditBtn} listData={data} />
        )
      ) : null}
      {}
    </motion.div>
  )
}
