import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './components/Login'
import RequireAuth from './components/requireAuth'
import { ProfileContext, useProfile } from './context/ProfileContext'
import useAuth from './hooks/useAuth'
import HomeLayout from './layout/homeLayout'
import Classes from './pages/classes'
import Feedback from './pages/feedback'
import Home from './pages/home'
import Students from './pages/students'
import Teachers from './pages/teachers'
import { getProfile } from './utils/firebase'

export default function App() {
  const location = useLocation()
  const user = useAuth()
  const uid = user?.uid
  // States

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const [rankList, setRankList] = useState([])
  const [classInfo, setClassInfo] = useState({
    branch: '',
    sem: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProfile(uid)
      setData(res)
      if (res) {
        setClassInfo((prev) => ({
          ...prev,
          branch: res.branch === 'master' ? '' : res.branch,
        }))
      }
      setLoading(false)
    }
    if (uid) {
      fetchData()
    }
  }, [uid])

  if (uid && loading) {
    return <div className='loadingMain'>Loading...</div>
  } else {
    return (
      <>
        <AnimatePresence exitBeforeEnter>
          <ProfileContext.Provider value={{ data, loading }}>
            <HomeLayout user={user}>
              <Routes location={location} key={location.pathname}>
                <Route element={<RequireAuth user={user} />}>
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
                  <Route path='/feedback' element={<Feedback />} />
                  <Route path='/teachers' element={<Teachers />} />
                  <Route path='/classes' element={<Classes />} />
                </Route>
                <Route path='/login' element={<Login user={user} />} />
              </Routes>
            </HomeLayout>
          </ProfileContext.Provider>
        </AnimatePresence>
        <Toaster />
      </>
    )
  }
}
