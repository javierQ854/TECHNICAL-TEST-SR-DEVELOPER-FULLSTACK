import {formato} from "../Utils/format";
import { Link } from 'react-router-dom'
const Card = ({ usuario, addres, price, year, nameOwner, id }) => {

    return (
        <Link to={`/propertie/${id}`}>
            <div className="flex bg-white border border-gray-200 shadow-md justify-center  items-center cursor-pointer hover:shadow-lg rounded p-6">
                <ul className="text-center text-base flex flex-col">
                    <li className="font-semibold text-black">{usuario}</li>
                    <li className="text-gray-500">{addres}</li>
                    <li className="text-yellow-600 font-semibold">{formato(price)}</li>
                    <li className="font-semibold">{year}</li>
                    <li className="hidden">{nameOwner}</li>
                </ul>
            </div>
        </Link>

    )
}

export default Card;