import { formato } from "../../Utils/format";
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
const Card = ({ usuario, addres, price, year, nameOwner, id }) => {

    return (

        <div className="flex flex-col gap-5 bg-black/30 backdrop-brightness-100 backdrop-opacity-50 shadow-md backdrop-blur-sm shadow-black justify-center  items-center hover:shadow-lg rounded p-6">
            <ul className="text-center text-base flex flex-col">
                <li className="font-semibold text-black">{usuario}</li>
                <li className="text-gray-500 font-bold">{addres}</li>
                <li className="text-yellow-600 font-semibold">{formato(price)}</li>
                <li className="font-semibold">{year}</li>
                <li className="hidden">{nameOwner}</li>
            </ul>
            <Link to={`/propertie/${id}`}>
                <div className="transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <Button id={'ver_mas'} tipo={'Button'} dato={"Ver mas"} />
                </div>
            </Link>

        </div>


    )
}

export default Card;