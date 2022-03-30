import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomeLayout from './layout/homeLayout'
import Classes from './pages/classes'
import Home from './pages/home'
import Students from './pages/students'
import Teachers from './pages/teachers'

export default function App() {
  const location = useLocation()
  // States
  const [rankList, setRankList] = useState([])
  const [classInfo, setClassInfo] = useState({
    branch: '',
    sem: '',
  })

  return (
    <AnimatePresence exitBeforeEnter>
      <HomeLayout>
        <Routes location={location} key={location.pathname}>
          <Route
            path='/'
            element={
              <Home
                rankList={rankList}
                setRankList={setRankList}
                classInfo={classInfo}
                setClassInfo={setClassInfo}
              />
            }
          />
          <Route path='/students' element={<Students />} />
          <Route path='/teachers' element={<Teachers />} />
          <Route path='/classes' element={<Classes />} />
        </Routes>
      </HomeLayout>
    </AnimatePresence>
  )
}
