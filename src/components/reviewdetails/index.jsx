import { useEffect, useState } from 'react'
import { countCompleted } from '../../utils/firebase'
import { motion } from 'framer-motion'
import './reviewDetails.style.css'

const mainVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },

  exit: {
    y: 200,
    opacity: 0,
    transition: { ease: 'easeInOut' },
  },
}

const reviewCardVariants = {
  hidden: {
    opacity: 0,
    x: '10vw',
  },
  visible: {
    opacity: 1,
    x: 0,
  },

  exit: {
    y: 200,
    opacity: 0,
    transition: { ease: 'easeInOut' },
  },
}

export default function ReviewDetails({ branch, sem, total }) {
  const [completed, setCompleted] = useState({
    given: 0,
    notgiven: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const fetchData = async () => {
    try {
      const { given, notgiven } = await countCompleted(branch, parseInt(sem))
      setIsLoading(false)
      setCompleted({ given, notgiven })
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [branch, sem, total])

  return (
    <>
      {isLoading ? (
        <p className="reviewLoading">Calculating Please Wait !</p>
      ) : (
        <motion.div
          variants={mainVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="reviewCardWrapper"
        >
          <motion.div variants={reviewCardVariants} className="reviewCard">
            <p>Total Single Reviews Given</p>
            <p className="numbers">{total}</p>
          </motion.div>
          <motion.div variants={reviewCardVariants} className="reviewCard">
            <p>Fully Completed</p>
            <p className="numbers">{completed.given}</p>
          </motion.div>
          <motion.div variants={reviewCardVariants} className="reviewCard">
            <p>Not Fully Completed</p>
            <p className="numbers">{completed.notgiven}</p>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
