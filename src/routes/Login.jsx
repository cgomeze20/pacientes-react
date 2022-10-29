/* eslint-disable no-undef */
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppProvider'

import styles from '../styles/Login.module.css'

export const Login = () => {
  const { Login } = styles

  const { usuario, setUsuario, VITE_WEB_API_KEY, setLogin, initialUsuario, handleMessages } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/pacientes')
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUsuario(prev => ({ ...prev, [name]: value }))
  }

  const loginUser = async (e) => {
    e.preventDefault()
    try {
      const respuesta = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${VITE_WEB_API_KEY}`, {
        method: 'POST',
        'Content-type': 'application/json',
        body: JSON.stringify({ ...usuario, returnSecureToken: true })
      })
      const data = await respuesta.json()

      if (data.registered) {
        localStorage.setItem('token', JSON.stringify(data))
        navigate('/pacientes', { replace: true })
        setLogin(data)
        setUsuario(initialUsuario)
      } else {
        if (data.error.code === 400) {
          handleMessages(data.error.message)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className={Login} onSubmit={loginUser}>
      <h1>Login</h1>
      <input type='text' value={usuario.email} onChange={handleChange} name='email' placeholder='email' />
      <input type='password' value={usuario.password} onChange={handleChange} name='password' placeholder='password' />
      <input type='submit' value='Login' />
    </form>
  )
}
