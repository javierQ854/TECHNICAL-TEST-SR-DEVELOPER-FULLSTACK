import { useState } from "react"
export const useSearchFilter = () => {
    const [seleccionar, setSeleccionar] = useState({ min: 0, max: 0 })
    const [buscarCasa, setbuscarCasa] = useState("")
    const [buscarDireccion, setbuscarDireccion] = useState("")
    const [bandera, setBandera] = useState(false)
    const handleShange = (rango) => setSeleccionar(rango)

    return {
        seleccionar,
        buscarCasa,
        setbuscarCasa,
        buscarDireccion,
        setbuscarDireccion,
        bandera,
        setBandera,
        handleShange
    }
}
