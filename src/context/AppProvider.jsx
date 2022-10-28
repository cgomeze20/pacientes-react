/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import { createContext, useState, useEffect, useMemo } from 'react'
import Swal from 'sweetalert2'

export const AppContext = createContext()
export const AppProvider = ({ children }) => {
  const initialState = {
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
    notas: '',
    id: ''
  }

  const initialUsuario = {
    email: '',
    password: '',
    displayName: ''
  }

  const VITE_WEB_API_KEY = 'AIzaSyCWtQtSdciphWCsXGre_a4IPpIdcIbKEXA'
  const URL_API = 'https://contactapp-pwa-default-rtdb.firebaseio.com/tareas-api'
  const LS = JSON.parse(localStorage.getItem('token'))
  const keys = ['nombre', 'apellidos', 'notas', 'fechaNacimiento']

  const [paciente, setPaciente] = useState(initialState)
  const [usuario, setUsuario] = useState(initialUsuario)
  const [data, setData] = useState({})
  const [login, setLogin] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (localStorage.token) {
      console.log('logged')
    }
  }, [])

  useEffect(() => {
    if (localStorage.token) {
      getData()
    }
  }, [usuario])

  const filtered = useMemo(() => Object.values(data).filter(item => {
    return keys.some(key => item[key].toLowerCase().includes(search))
  }), [search, data])

  const addPaciente = async (paciente) => {
    const id = Math.random().toString(36).slice(2)
    await fetch(`${URL_API}/${LS.localId}/${id}.json?auth=${LS.idToken}`, {
      method: 'PUT',
      'Content-type': 'appplication/json',
      body: JSON.stringify({ ...paciente, id })
    })
    setPaciente(initialState)
    getData()
  }

  const eliminarPaciente = async (id) => {
    try {
      await fetch(`${URL_API}/${LS.localId}/${id}.json?auth=${LS.idToken}`, {
        method: 'DELETE'
      })
      getData()
    } catch (error) {
      console.log(error)
    }
  }

  const obtenerDatosToEdit = (paciente) => {
    setPaciente(paciente)
  }

  const updatePaciente = async (paciente) => {
    try {
      await fetch(`${URL_API}/${LS.localId}/${paciente.id}.json?auth=${LS.idToken}`, {
        method: 'PATCH',
        body: JSON.stringify(paciente)
      })
      getData()
    } catch (error) {
      console.log(error)
    }
  }

  const handleMessages = (mensaje) => {
    return Swal.fire({
      title: 'Error',
      text: mensaje,
      icon: 'error'
    })
  }

  const getData = async () => {
    try {
      const res = await fetch(`https://contactapp-pwa-default-rtdb.firebaseio.com/tareas-api/${LS.localId}.json?auth=${LS.idToken}`)
      const datos = await res.json()
      setData(datos)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <AppContext.Provider value={{ login, usuario, setUsuario, setLogin, VITE_WEB_API_KEY, paciente, setPaciente, addPaciente, eliminarPaciente, obtenerDatosToEdit, updatePaciente, initialState, initialUsuario, handleMessages, data, getData, handleSearch, search, filtered }}>
      {children}
    </AppContext.Provider>
  )
}

// const URL_API = 'https://contactapp-pwa-default-rtdb.firebaseio.com/tareas-api'
// SAVE ${URL_API}/${login.localId}/${id}.json?auth=${login.idToken}
// DELETE ${URL_API}/${login.localId}/${id}.json?auth=${login.idToken}
// UPDATE https://contactapp-pwa-default-rtdb.firebaseio.com/tareas-api/${login.localId}/${edit.id}.json?auth=${login.idToken}
// LOGIN https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_WEB_API_KEY}
// SIGNUP https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${import.meta.env.VITE_WEB_API_KEY}
// VITE_WEB_API_KEY=AIzaSyCWtQtSdciphWCsXGre_a4IPpIdcIbKEXA
