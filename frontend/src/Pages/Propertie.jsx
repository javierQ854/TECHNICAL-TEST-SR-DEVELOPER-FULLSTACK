import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { ObtenerPropiedad } from '../Services/Api'
import { formato, formatoFecha } from '../Utils/format'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Propertie = () => {
    const { id } = useParams()

    const { data = [], isLoading, error } = useQuery({
        queryKey: ["datos"],
        queryFn: () => ObtenerPropiedad(id)
    })

    return (
        <>
            {data.map(datos =>
                <div key={datos.id} className='flex flex-col gap-5 bg-gray-50'>
                    {isLoading && <p>Cargando...</p>}
                    {error && <p>Error al cargar: {error.message}</p>}

                    <h1 className='text-xl text-center bg-black text-yellow-400 font-bold py-5 uppercase'>{datos.name}</h1>

                    <section className='flex flex-col gap-5'>
                        <div className='lg:flex lg:flex-row-reverse lg:justify-center'>
                            <article className='flex flex-col gap-5 px-5'>
                                {/* Swiper Carrusel */}
                                {datos.images && datos.images.length ? (
                                    <Swiper
                                        modules={[Navigation, Pagination, Autoplay]}
                                        spaceBetween={20}
                                        slidesPerView={1}
                                        navigation
                                        pagination={{ clickable: true }}
                                        loop={true}
                                        autoplay={{ delay: 3000 }}
                                        className="w-full h-auto lg:w-200"
                                    >
                                        {datos.images.map(image => (
                                            <SwiperSlide key={image.id}>
                                                <img
                                                    className="w-full h-96 object-cover rounded-md"
                                                    src={`http://localhost:5227/${image.file}`}
                                                    alt="Casa lujosa"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                ) : (
                                    <p>No hay imágenes</p>
                                )}

                                <div className='text-center mb-5 lg:mb-0 font-bold '>
                                    <h2 className='bg-black text-amber-300 py-2'>Precio</h2>
                                    <p className='text-yellow-600'>{formato(datos.price)}</p>
                                    <p>{datos.address}</p>
                                </div>
                            </article>

                            <article className='flex text-center flex-col gap-5 px-5'>
                                <h2 className='font-bold uppercase bg-black text-amber-300 py-2'>Propietario</h2>
                                <div className='flex flex-col gap-5 md:flex-row md:justify-center items-center'>
                                    <div className='flex justify-center items-center'>
                                        <img
                                            className='rounded-full'
                                            src={`http://localhost:5227/${datos.owner.photo}`}
                                            alt={datos.owner.name}
                                            height={200}
                                            width={200}
                                        />
                                    </div>
                                    <ul className='border-gray-100 flex flex-col gap-5 border-2 shadow-md w-full md:w-100 p-5'>
                                        <li className='flex justify-between text-yellow-600 font-bold'><span className='text-gray-500 font-bold'>Nombre:</span>{datos.owner.name}</li>
                                        <li className='flex justify-between text-yellow-600 font-bold'><span className='text-gray-500 font-bold'>Dirección:</span>{datos.owner.address}</li>
                                        <li className='flex justify-between text-yellow-600 font-bold'><span className='text-gray-500 font-bold'>Fecha:</span>{formatoFecha(datos.owner.birthday)}</li>
                                    </ul>
                                </div>
                            </article>
                        </div>

                        <article className='flex flex-col px-5 pb-5 gap-5'>
                            <h2 className='text-center bg-black text-amber-300 uppercase font-bold py-2'>Transacciones</h2>
                            <div className='flex justify-center items-center flex-wrap gap-5'>
                                {datos.traces && datos.traces.length > 0 ? (
                                    datos.traces.map(trace =>
                                        <div key={trace.id}>
                                            <ul className='flex flex-col bg-white border border-gray-200 shadow-md cursor-pointer hover:shadow-lg rounded p-6'>
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
                    </section>
                </div>
            )}
        </>
    )
}

export default Propertie
