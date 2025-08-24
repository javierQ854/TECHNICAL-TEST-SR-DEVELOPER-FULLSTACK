import { useQuery } from '@tanstack/react-query'
import ObtenerDatos from './Services/Api'
import Card from './Components/Card'
import Input from './Components/Input'
import { useEffect, useState } from 'react'
import formato from './Utils/format'
function App() {

  const rangos = [
    { id: 1, min: 1000000, max: 5000000 },
    { id: 2, min: 5000001, max: 10000000 },
    { id: 3, min: 10000001, max: 15000000 },
  ]
  const [seleccionar, setSeleccionar] = useState({ min: 0, max: 0 })
  const [buscarCasa,setbuscarCasa] = useState("")
  const [buscarDireccion,setbuscarDireccion] = useState("")

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["datos", buscarCasa, buscarDireccion ,  seleccionar],
    queryFn: () => ObtenerDatos({buscarCasa,buscarDireccion, min:seleccionar.min, max:seleccionar.max}),
    keepPreviousData:true
  })
  const handleShange = (rango) => {
    setSeleccionar(rango)
  }
  useEffect(() => {
    console.log(seleccionar)
  }, [seleccionar])

  return (
    <div className='flex flex-col gap-5'>

      <h1 className='text-base text-center font-bold uppercase pt-5'>Lista de propiedades</h1>
      <div className='flex justify-center items-centers'>
        <input 
        className='border rounded-2xl px-5 py-1 border-gray-300' 
        type="text" 
        placeholder='Buscar'
        value={buscarCasa}
        onChange={(e)=>setbuscarCasa(e.target.value)}
        />
      </div>
      <div className='flex justify-center items-centers'>
        <input 
        className='border rounded-2xl px-5 py-1 border-gray-300' 
        type="text" 
        placeholder='Direccion'
        value={buscarDireccion}
        onChange={(e)=>setbuscarDireccion(e.target.value)}
        />
      </div>
      <div className='flex flex-col justify-center items-center'>
        {rangos.map(r =>
          <div key={r.id}>
            <label>{formato(r.min)} - {formato(r.max)}
              <input
                type="radio"
                name='opciones'
                checked={seleccionar.min === r.min && seleccionar.max === r.max}
                onChange={() => handleShange({ min: r.min, max: r.max })}
              />
            </label>

          </div>
        )}
      </div>

      <div className='px-5 flex flex-col gap-5'>
        {isLoading && <p>Cargando...</p>}
        {error && <p>Hay un error {error.message}</p>}
        {data.length > 0 ? (
          data.map(dato =>
          <Card key={dato.id}
            usuario={dato.name}
            addres={dato.address}
            year={dato.year}
            price={dato.price}
            nameOwner={dato.owner.name}
          />

        )
        ) : (<p>No hay datos disponibles</p>)   }
      </div>
    </div>

  )
}

export default App
