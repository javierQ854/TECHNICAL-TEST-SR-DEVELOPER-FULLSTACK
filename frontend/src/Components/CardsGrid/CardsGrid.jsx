import Loader from '../../Components/Loader'
import Card from '../../Components/Card'
const CardsGrid = ({isLoading,error,data}) => {
    return (
        <div>
            {isLoading && <Loader />}
            <div className='px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {error && <p className='text-center text-red-700 font-bold'>Hay un error {error.message}</p>}
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
                ) : (<p className='text-red-600 font-bold '>No hay datos disponibles!!!</p>)}
            </div>
        </div>

    )
}

export default CardsGrid