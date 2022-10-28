import { useContext } from 'react'
import { Formulario } from '../components/Formulario'
import { PacienteCard } from '../components/PacienteCard'
import { AppContext } from '../context/AppProvider'
import styles from '../styles/Pacientes.module.css'

export const Pacientes = () => {
  const { Container, PacientesList } = styles
  const { filtered } = useContext(AppContext)

  return (
    <div className={Container}>
      <Formulario />
      <div className={PacientesList}>
        {
            filtered && filtered.map(paciente => (
              <PacienteCard key={paciente.id} paciente={paciente} />
            ))
          }
      </div>
    </div>
  )
}
