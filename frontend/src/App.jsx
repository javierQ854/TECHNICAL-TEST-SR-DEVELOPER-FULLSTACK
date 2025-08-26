import { useQuery } from '@tanstack/react-query'
import { ObtenerDatos } from './Services/Api'
import Card from './Components/Card'
import Input from './Components/Input'
import { useEffect, useState } from 'react'
import { formato } from './Utils/format'
import Button from './Components/Button'
import { AdjustmentsHorizontalIcon, AdjustmentsVerticalIcon } from '@heroicons/react/24/outline'
function App() {

  const rangos = [
    { id: 1, min: 1000000, max: 5000000 },
    { id: 2, min: 5000001, max: 10000000 },
    { id: 3, min: 10000001, max: 15000000 },
  ]
  const [seleccionar, setSeleccionar] = useState({ min: 0, max: 0 })
  const [buscarCasa, setbuscarCasa] = useState("")
  const [buscarDireccion, setbuscarDireccion] = useState("")
  const [bandera, setBandera] = useState(false)

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["datos", buscarCasa, buscarDireccion, seleccionar],
    queryFn: () => ObtenerDatos({ buscarCasa, buscarDireccion, min: seleccionar.min, max: seleccionar.max }),
    keepPreviousData: true
  })
  const handleShange = (rango) => {
    setSeleccionar(rango)
  }
  useEffect(() => {
    console.log(seleccionar)
  }, [seleccionar])

  return (
    <div className='flex flex-col bg-gray-50 gap-5'>
      <h1 className='text-base text-center bg-black text-yellow-400 font-bold uppercase py-5'>Propiedades</h1>
      <div>
        <div className='flex flex-col px-5 gap-5 justify-center items-centers'>
          <div className='flex justify-between md:justify-center gap-2'>
            <Input tipo={"text"} placeHolder={"Buscar..."} value={buscarCasa} onChange={(e) => setbuscarCasa(e.target.value)} />
            <Button tipo={"button"} dato={<AdjustmentsHorizontalIcon className= {`h-6 w-6 text-yellow-400 transform transition-transform duration-500 ${!bandera ? "rotate-0": "rotate-90"}`} />} onclick={() => setBandera(!bandera)} />
          </div>

          <div className= {`flex flex-col justify-center items-center gap-5 transition-all duration-500 overflow-hidden ${bandera ? "max-h-96 opacity-100":"max-h-0 opacity-0"}`}>
            <Input tipo={"text"} placeHolder={"Direccion"} value={buscarDireccion} onChange={(e) => setbuscarDireccion(e.target.value)} />
            <div className='flex flex-col justify-center items-center'>
              {rangos.map(r =>
                <div key={r.id} className='w-full'>
                  <label className='flex  flex-row-reverse px-3 py-1 justify-between items-center md:gap-3'>
                    <span className='text-yellow-600 font-semibold'>{formato(r.min)} - {formato(r.max)}</span>
                    <Input tipo={"radio"} name={"opciones"} checked={seleccionar.min === r.min && seleccionar.max === r.max} onChange={() => handleShange({ min: r.min, max: r.max })}/>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        {isLoading && <p>Cargando...</p>}
        {error && <p>Hay un error {error.message}</p>}
        {data.length > 0 ? (
          data.map(dato =>
            <Card
              id={dato.id}
              key={dato.id}
              usuario={dato.name}
              addres={dato.address}
              year={dato.year}
              price={dato.price}
              nameOwner={dato.owner.name}
            />

          )
        ) : (<p>No hay datos disponibles</p>)}
      </div>
    </div>

  )
}

export default App
