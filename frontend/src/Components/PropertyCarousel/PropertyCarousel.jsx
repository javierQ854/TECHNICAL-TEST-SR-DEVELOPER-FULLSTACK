import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { formato } from "../../Utils/format";
import Header from "../Header";
const PropertyCarousel = ({ datos }) => {
    return (<article className='flex flex-col lg:justify-center gap-5'>
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
                className="w-full h-auto lg:w-100 xl:w-200 shadow-lg rounded-md shadow-black"
            >
                {datos.images.map(image => (
                    <SwiperSlide key={image.id}>
                        <img
                            className="w-full h-96 object-cover rounded-md "
                            src={`http://localhost:5227/${image.file}`}
                            alt="Casa lujosa"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        ) : (
            <p>No hay imágenes</p>
        )}

        <div className='text-center mb-5 lg:mb-0 font-bold bg-black/30 backdrop-brightness-100 backdrop-opacity-50 shadow-md backdrop-blur-sm shadow-black  '>
            <Header py={2} marca={"h2"} titulo={"Precio"} />
            <div className="py-5">
                <p className='text-yellow-100 font-bold'>{formato(datos.price)}</p>
                <p>{datos.address}</p>
            </div>
        </div>
    </article>)
}

export default PropertyCarousel