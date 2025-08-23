import { useState } from 'react'
import Button from './Components/Button'
import Input from './Components/Input'
import Card from './Components/Card'
const Dato = [
  {id:1,usuario:'Dario',edad:33},
  {id:2,usuario:'Eduardo',edad:22},
  {id:3,usuario:'Carlos',edad:32},
  {id:4,usuario:'Laura',edad:18},
  {id:5,usuario:'Maria',edad:45}
]
function App() {

  const [buscar,setBuscar] = useState("")

  const filterDato = Dato.filter(d => 
    Object.values(d).some(valor => 
      valor.toString().toLocaleLowerCase().includes(buscar.toLocaleLowerCase())))

  return(

    <div className="flex flex-col">
      <header className='flex gap-5 p-6'>
        <Input value={buscar} onChange={(e)=> setBuscar(e.target.value)} tipo={"text"} placeHolder={"Buscar"}/>
        <Button dato={"Buscar"} tipo={"submit"}/>
      </header>
      <section className='flex gap-6 p-6 '>
          {filterDato.map(d =>
          <Card key={d.id} usuario={d.usuario} edad={d.edad} />
      )}
      </section>
    </div>
  )
}

export default App
