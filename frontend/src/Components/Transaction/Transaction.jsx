import Header from '../../Components/Header';
import { formato, formatoFecha } from '../../Utils/format';
const Transaction = ({datos}) => {
    return (
        <article className='flex flex-col px-5 pb-5 gap-5 lg:px-0'>
            <Header titulo={"Transacciones"} marca={"h2"} py={"3"}/>
            <div className='flex justify-center items-center flex-wrap gap-5'>
                {datos.traces && datos.traces.length > 0 ? (
                    datos.traces.map(trace =>
                        <div key={trace.id}>
                            <ul className='flex flex-col  bg-black/30 backdrop-brightness-100 backdrop-opacity-50 shadow-inner   backdrop-blur-sm shadow-black hover:shadow-lg rounded p-6'>
                                <li className='bg-black rounded text-amber-300 text-center font-bold py-3'>{trace.name}</li>
                                <li className='flex justify-between gap-20 font-bold text-yellow-600 pt-3'><span className='text-gray-500 font-semibold'>Precio</span> {formato(trace.value)}</li>
                                <li className='flex justify-between font-bold text-yellow-600 pt-3'><span className='text-gray-500 font-semibold'>Impuesto</span>{formato(trace.tax)}</li>
                                <li className='text-center font-bold py-5'>{formatoFecha(trace.dateSale)}</li>
                            </ul>
                        </div>
                    )
                ) : (<p>No hay transacciones</p>)}
            </div>
        </article>
    )
}

export default Transaction