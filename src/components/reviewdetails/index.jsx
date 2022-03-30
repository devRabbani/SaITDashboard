import { useEffect, useState } from 'react'
import { appendstatus, countCompleted } from '../../utils/firebase'
import './reviewDetails.style.css'

export default function ReviewDetails({ classInfo, rankList }) {
  const [completed, setCompleted] = useState({
    given: 0,
    notgiven: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const { given, notgiven } = await countCompleted(
        classInfo.branch,
        classInfo.sem
      )
      setIsLoading(false)
      setCompleted({ given, notgiven })
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  // Total Calculating
  let total = 0
  rankList.forEach((item) => {
    total += item.total
  })

  useEffect(() => {
    fetchData()
  }, [classInfo, rankList])

  return (
    <>
      <p className='reviewHeaderP'>
        For Branch : <span>{classInfo.branch.toUpperCase()}</span> and Semester
        : <span>{classInfo.sem}</span>
      </p>
      {isLoading ? (
        <p className='reviewLoading'>Calculating Please Wait !</p>
      ) : (
        <div className='reviewCardWrapper'>
          <div className='reviewCard'>
            <p>Total Single Reviews Given</p>
            <p className='numbers'>{total}</p>
          </div>
          <div className='reviewCard'>
            <p>Fully Completed</p>
            <p className='numbers'>{completed.given}</p>
          </div>
          <div className='reviewCard'>
            <p>Not Fully Completed</p>
            <p className='numbers'>{completed.notgiven}</p>
          </div>
        </div>
      )}
    </>
  )
}
