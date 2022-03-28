import { motion } from 'framer-motion'
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

export default function Classes() {
  useTitle('Classes | SaITFeedbackAdmin')
  return (
    <motion.div
      variants={wrapperVariants}
      animate='visible'
      initial='hidden'
      exit='exit'
    >
      <h1 className='adminHeadline'>Classes</h1>
      <p className='intro'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
        quaerat doloresoluta ullam natus, debitis illo fuga similique fugiat
        eaque eveniet quod ad, excepturi quasi quam qua magni ipsa architecto.
      </p>
    </motion.div>
  )
}
