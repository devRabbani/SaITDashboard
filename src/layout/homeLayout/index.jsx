import { NavLink, useNavigate } from 'react-router-dom'
import {
  FaHome,
  FaUserGraduate,
  FaUserTie,
  FaBook,
  FaSignOutAlt,
} from 'react-icons/fa'
import './homeLayout.style.css'

export default function HomeLayout({ children }) {
  const navigate = useNavigate()
  return (
    <div className='admin'>
      <div className='adminGrid'>
        <div className='sideMenu'>
          <div className='sideLogo'>
            <span>SaITFeedback</span> Admin
          </div>
          <div className='menuItemsWrapper'>
            <NavLink to='' end={true}>
              <FaHome /> Home
            </NavLink>

            <NavLink to='students' end={true}>
              <FaUserGraduate />
              Students
            </NavLink>

            <NavLink to='teachers' end={true}>
              <FaUserTie />
              Teacher
            </NavLink>

            <NavLink to='classes' end={true}>
              <FaBook /> Classes
            </NavLink>
          </div>
          <div className='logOutDiv'>
            <button
              onClick={() => navigate('https://saitfeedback.netlify.app')}
            >
              Logout <FaSignOutAlt />
            </button>
          </div>
        </div>
        <div className='mainContent'>{children}</div>
      </div>
    </div>
  )
}
