import { useContext } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import App from '../App'
import { ProtectedRoutes } from '../components/ProtectedRoutes'
import { AppContext } from '../context/AppProvider'
import { Admin } from '../routes/Admin'
import { Login } from '../routes/Login'
import { Pacientes } from '../routes/Pacientes'
import { Settings } from '../routes/Settings'
import { SignUp } from '../routes/SignUp'

export const Rutas = () => {

  const { login } = useContext(AppContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Login />} />
          <Route element={<ProtectedRoutes login={ login } />}>
            <Route path='/pacientes' element={<Pacientes />} />
            <Route path='/settings' element={<Settings />} />
          </Route>
            <Route path='/admin' element={
              <ProtectedRoutes login={ login }>
                <Admin />
              </ProtectedRoutes>
            } />
          <Route path='/signup' element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
