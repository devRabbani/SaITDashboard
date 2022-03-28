import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomeLayout from './layout/homeLayout'
import Classes from './pages/classes'
import Home from './pages/home'
import Students from './pages/students'
import Teachers from './pages/teachers'

export default function App() {
  const location = useLocation()
  return (
    <AnimatePresence exitBeforeEnter>
      <HomeLayout>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />} />
          <Route path='/students' element={<Students />} />
          <Route path='/teachers' element={<Teachers />} />
          <Route path='/classes' element={<Classes />} />
        </Routes>
      </HomeLayout>
    </AnimatePresence>
  )
}
