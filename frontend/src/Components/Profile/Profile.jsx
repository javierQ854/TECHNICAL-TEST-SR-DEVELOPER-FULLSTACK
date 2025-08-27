import { formatoFecha } from '../../Utils/format'
import Header from '../Header'
const Profile = ({datos}) => {
    return (
        <article className='bg-black/30 shadow-md shadow-black border-0  rounded backdrop-brightness-100 backdrop-opacity-50  backdrop-blur-sm flex text-center flex-col gap-5'>
            <Header py={"2"} marca={"h2"} titulo={"Propietario"}/>
            <div className=' flex flex-col gap-5 p-5 items-center'>
                <div className='flex justify-center items-center'>
                    <img
                        className='rounded-full'
                        src={`http://localhost:5227/${datos.owner.photo}`} 
                        alt={datos.owner.name}
                        height={200}
                        width={200}
                    />
                </div>
                <ul className=' w-full md:w-100 p-5'>
                    <li className='flex justify-between text-yellow-600 font-bold'><span className='text-gray-500 font-bold'>Nombre:</span>{datos.owner.name}</li>
                    <li className='flex justify-between text-yellow-600 font-bold'><span className='text-gray-500 font-bold'>Dirección:</span>{datos.owner.address}</li>
                    <li className='flex justify-between text-yellow-600 font-bold text-right'><span className='text-gray-500 font-bold'>Fecha:</span>{formatoFecha(datos.owner.birthday)}</li>
                </ul>
            </div>
        </article>
    )
}
export default Profile