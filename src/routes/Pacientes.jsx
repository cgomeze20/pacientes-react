import { useContext } from 'react'
import { Formulario } from '../components/Formulario'
import { PacienteCard } from '../components/PacienteCard'
import { useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppProvider'
import styles from '../styles/Pacientes.module.css'

export const Pacientes = () => {
  const { Container, PacientesList } = styles
  const { data } = useContext(AppContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = searchParams.get('filter') || ''
  const keys = ['nombre', 'apellidos', 'notas', 'fechaNacimiento']

  const handleFilter = (e) => {
    const filter = e.target.value
    if (filter) {
      setSearchParams({ filter })
    } else {
      setSearchParams({})
    }
  }

  const filtered = Object.values(data).filter((item) => {
    if (!filter) return true
    return keys.some(key => item[key].toLowerCase().includes(filter.toLowerCase()))
  })

  return (
    <div className={Container}>
      <Formulario />
      <div className={PacientesList}>
        <input type='text' className='inputSearch' placeholder='Filter...' onChange={handleFilter} value={filter} />
        {
          filtered.map(paciente => (
            <PacienteCard key={paciente.id} paciente={paciente} />
          ))
        }
      </div>
    </div>
  )
}
