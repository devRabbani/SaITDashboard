import { motion } from 'framer-motion'
import { useState } from 'react'
import { useProfile } from '../../context/ProfileContext'
import useTitle from '../../hooks/useTitle'
import { basicSelect, branchSelect, semSelect } from '../../utils/deptData'
import { clearAndCreate } from '../../utils/firebase'
import './feedback.style.css'
import { toast } from 'react-hot-toast'

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

export default function Feedback() {
  useTitle('Feedback | SaITFeedbackAdmin')
  const { data } = useProfile()
  const master = data?.branch === 'master'
  const [branch, setBranch] = useState(data?.branch || '')
  const [sem, setSem] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  console.log(branch, typeof sem)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const sure = window.confirm(
      'Are you sure want to clear previous data and create new feedbacks?'
    )
    if (sure) {
      const toastId = toast.loading('Clearning Previous Data')
      try {
        await clearAndCreate(branch, sem)
        toast.success('Data cleared and Ready to collect new feedback', {
          id: toastId,
        })
      } catch (error) {
        toast.error('Something went wrong, Try Again!', { id: toastId })
        console.log(error)
      }
    }
    setIsLoading(false)
  }

  return (
    <motion.div
      variants={wrapperVariants}
      animate='visible'
      initial='hidden'
      exit='exit'
    >
      <h1 className='adminHeadline'>Reset Feedback</h1>
      <p className='intro'>
        To get a fresh feedback click the clear and get feedback button to reset
        all the feedback data.
      </p>
      <h2 className='generateH2'>Clear Old and Collect New Feedbacks</h2>
      <form onSubmit={handleSubmit} className='feedback'>
        {master && (
          <select
            required
            name='branch'
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            {branchSelect.map((branch, i) => (
              <option key={i} value={branch.value}>
                {branch.name}
              </option>
            ))}
          </select>
        )}

        {branch && (
          <select
            required
            name='sem'
            value={sem}
            onChange={(e) => setSem(parseInt(e.target.value))}
          >
            {!(branch === 'bs')
              ? semSelect.map((semItem, i) => (
                  <option value={semItem.value} key={i}>
                    {semItem.name}
                  </option>
                ))
              : basicSelect.map((semItem, i) => (
                  <option value={semItem.value} key={i}>
                    {semItem.name}
                  </option>
                ))}
          </select>
        )}
        <button disabled={isLoading}>
          {isLoading ? 'Please Wait' : 'Create New Feedback'}
        </button>
      </form>
    </motion.div>
  )
}
