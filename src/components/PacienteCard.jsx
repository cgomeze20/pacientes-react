import { useContext } from 'react'
import { AppContext } from '../context/AppProvider'
import '../styles/PacienteCard.css'

export const PacienteCard = ({ paciente }) => {

  const { eliminarPaciente, obtenerDatosToEdit } = useContext(AppContext)

  return (
    <div className='pacienteCard'>
      <h2>{paciente.nombre} {paciente.apellidos}</h2>
      <p>{paciente.fechaNacimiento}</p>
      <div className="buttonContainer">
        <button onClick={() => eliminarPaciente(paciente.id)}>Eliminar</button>
        <button onClick={() => obtenerDatosToEdit(paciente)}>Editar</button>
      </div>
    </div>
  )
}
