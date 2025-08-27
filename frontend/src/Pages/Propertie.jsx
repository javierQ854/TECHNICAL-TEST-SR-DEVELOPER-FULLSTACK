import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { ObtenerPropiedad } from '../Services/Api'
import Header from '../Components/Header';
import Transaction from '../Components/Transaction/Transaction';
import PropertyCarousel from '../Components/PropertyCarousel/PropertyCarousel';
import Profile from '../Components/Profile';
const Propertie = () => {
    const { id } = useParams()

    const { data = [], isLoading, error } = useQuery({
        queryKey: ["datos"],
        queryFn: () => ObtenerPropiedad(id)
    })

    return (
        <>
            {data.map(datos =>
                <div key={datos.id} className='flex flex-col gap-5 '>
                    {isLoading && <p>Cargando...</p>}
                    {error && <p>Error al cargar: {error.message}</p>}
                    <Header marca={"h1"} py={5} titulo={datos.name} />
                    <section className='flex flex-col gap-5'>
                        {/*Sector de perfil y predio*/}
                        <div className='lg:flex lg:justify-center lg:gap-5 lg:flex-row-reverse'>
                            {/**fotos del predio y carrusel */}
                            <PropertyCarousel datos={datos} />
                            {/*Perfil del propietario*/}
                            <Profile datos={datos} />                
                        </div>
                        {/*Sector de transacciones*/}
                        <Transaction datos={datos} />
                    </section>
                </div>
            )}
        </>
    )
}

export default Propertie
