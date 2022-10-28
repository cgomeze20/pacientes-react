import { useContext } from 'react'
import { AppContext } from '../context/AppProvider'
import styles from '../styles/Signup.module.css'

export const SignUp = () => {
  const { Signup } = styles

  const { usuario, setUsuario, initialUsuario, handleMessages } = useContext(AppContext)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUsuario(prev => ({ ...prev, [name]: value }))
  }

  const handleSignUp = async (e) => {
    e.preventDefault()

    const { email, password, displayName } = usuario

    if (!email.trim() || !password.trim() || !displayName.trim()) return handleMessages('Todos los campos son obligatorios')

    if (displayName.length <= 5) return handleMessages('DisplayName debe ser mayor a 5 caracteres')

    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${import.meta.env.VITE_WEB_API_KEY}`, {
      method: 'POST',
      body: JSON.stringify(usuario)
    })
    const data = await res.json()

    if (data.error) return handleMessages(data.error.message)
    setUsuario(initialUsuario)
    console.log(data)
  }

  return (
    <form onSubmit={handleSignUp} className={Signup}>
      <h1>SignUp</h1>
      <input type='text' onChange={handleChange} value={usuario.displayName} name='displayName' placeholder='Nombre a mostrar' />
      <input type='text' onChange={handleChange} value={usuario.email} name='email' placeholder='email' />
      <input type='password' onChange={handleChange} value={usuario.password} name='password' placeholder='password' />
      <button type='submit'>Login</button>
    </form>
  )
}
