import { useQuery } from '@tanstack/react-query'
import { ObtenerDatos } from '../Services/Api'
import { useSearchFilter } from '../Hooks/useSearchFilter'
import Header from '../Components/Header'
import SearchPanel from '../Components/SearchPanel/SearchPanel'
import CardsGrid from '../Components/CardsGrid/CardsGrid'
const Home = () => {

    const  filter  = useSearchFilter()
    const { data = [], isLoading, error } = useQuery({
        queryKey: ["datos", filter.buscarCasa, filter.buscarDireccion, filter.seleccionar],
        queryFn: () => ObtenerDatos(
            {
                buscarCasa: filter.buscarCasa,
                buscarDireccion: filter.buscarDireccion,
                min: filter.seleccionar.min,
                max: filter.seleccionar.max
            }),
        keepPreviousData: true
    })

    return (
        <div className='flex flex-col gap-5'>
            {/**Ttulo principal */}
            <Header marca={"h1"} titulo={"Propiedades"} py={"5"} />
            {/**Panel de busqueda */}
            <SearchPanel {...filter}/>
            {/**Lista de propiedades */}
            <CardsGrid data={data} isLoading={isLoading} error={error}/>
        </div>

    )

}

export default Home