import { useContext } from 'react'
import { AppContext } from '../context/AppProvider'
import styles from '../styles/Formulario.module.css'
import Swal from 'sweetalert2'

export const Formulario = () => {

  const { paciente, setPaciente, addPaciente, updatePaciente, initialState } = useContext(AppContext)

  const { Formulario } = styles

  const handleChange = (e) => {

    const { name, value } = e.target
    setPaciente(prev => ({ ...prev, [name]: value }))

  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { nombre, apellidos, fechaNacimiento, notas } = paciente

    if (paciente.id) {
      updatePaciente(paciente)
      setPaciente(initialState)
    } else {
      if (!nombre.trim || !apellidos.trim() || !fechaNacimiento.trim() || !notas.trim()) {
        return Swal.fire({
          title: "Error",
          text: "No se permiten campos vacios",
          icon: "error"
        })
      }
      addPaciente(paciente)
    }

  }

  return (
    <form className={Formulario} onSubmit={handleSubmit}>
      <h1>Registro de Pacientes</h1>
      <input type='text' placeholder='Nombre' value={paciente.nombre} onChange={handleChange} name='nombre' />
      <input type='text' placeholder='Apellidos' value={paciente.apellidos} onChange={handleChange} name='apellidos' />
      <input type='date' placeholder='Fecha Nacimiento' value={paciente.fechaNacimiento} onChange={handleChange} name='fechaNacimiento' />
      <textarea cols='30' rows='10' placeholder='Notas' onChange={handleChange} value={paciente.notas} name='notas'></textarea>
      <button>{paciente.id ? 'Editar' : 'Guardar'}</button>
    </form>
  )
}
