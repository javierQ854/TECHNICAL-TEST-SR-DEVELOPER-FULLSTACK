import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { rangos } from '../../Utils/rangos'
import { formato } from '../../Utils/format'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/24/outline';


const SearchPanel = ({ seleccionar, buscarCasa, setbuscarCasa, buscarDireccion, setbuscarDireccion, bandera, setBandera, handleShange }) => {

    return (
        <div className='pt-5'>
            <div className='flex flex-col px-5 gap-5 justify-center md:flex-row items-centers'>
                <div className='flex justify-between md:justify-center gap-2'>
                    <div className='relative w-full'>
                        <MagnifyingGlassIcon className="absolute z-50 left-1 top-2 h-4 w-4 text-white" />
                        <Input tipo={"text"} placeHolder={"Buscar..."} value={buscarCasa} onChange={(e) => setbuscarCasa(e.target.value)} />
                    </div>
                    <div className='transform md:hidden transition-transform duration-100 hover:scale-110  rounded-full '>
                        <Button tipo={"button"} dato={<AdjustmentsHorizontalIcon className={`h-6 w-6 text-yellow-400 transform transition-transform duration-500 ${!bandera ? "rotate-0" : "rotate-90"}`} />} onclick={() => setBandera(!bandera)} />
                    </div>
                </div>

                <div className={`md:pb-10 flex flex-col justify-center items-center gap-5 transition-all duration-500 overflow-hidden md:max-h-96 md:opacity-100 ${bandera ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className='relative'>
                        <HomeIcon className="absolute z-50 left-1 top-2 h-4 w-4 text-white" />
                        <Input tipo={"text"} placeHolder={"Direccion"} value={buscarDireccion} onChange={(e) => setbuscarDireccion(e.target.value)} />
                    </div>

                    <div className='flex flex-col md:flex-row md:left-0 md:top-35 md:justify-between md:w-full md:absolute justify-center items-center'>
                        {rangos.map(r =>
                            <div key={r.id} className='w-full'>
                                <label className='flex justify-between md:justify-center  flex-row-reverse md: px-3 py-1 items-center md:gap-3'>
                                    <span className='text-yellow-600 flex font-semibold'>{formato(r.min)} - {formato(r.max)}</span>
                                    <Input tipo={"radio"} name={"opciones"} checked={seleccionar.min === r.min && seleccionar.max === r.max} onChange={() => handleShange({ min: r.min, max: r.max })} />
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPanel