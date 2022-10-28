import { useState } from 'react'
import Swal from 'sweetalerts2'

export const useMensaje = (mensaje,texto) => {

    const [text, setText] = useState('');
    const [message, setMessage] = useState('');

    Swal.fire({
        title: setMessage(mensaje),
        text: setText(texto),
        icon: "error"
    })

  return { text, message }
}