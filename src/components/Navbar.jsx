/* eslint-disable no-undef */
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppProvider'

import styles from '../styles/Navbar.module.css'
export const Navbar = () => {
  const { login, setLogin } = useContext(AppContext)

  const { Navbar, btnCloseSesion } = styles
  const navigate = useNavigate()

  const closeSession = () => {
    localStorage.removeItem('token')
    navigate('/', { replace: true })
    setLogin(null)
  }

  return (
    <nav className={Navbar}>
      {
        login ? (<Link>{login.displayName}</Link>) : (<Link to='/'>Login</Link>)
      }
      <Link to='/signup'>SignUp</Link>
      <Link to='/settings'>Settings</Link>
      <Link to='/admin'>Admin</Link>
      <Link to='/pacientes'>Pacientes</Link>
      {
        login ? (<button className={btnCloseSesion} onClick={closeSession}>Cerrar Sesión</button>) : ''
      }
    </nav>
  )
}
