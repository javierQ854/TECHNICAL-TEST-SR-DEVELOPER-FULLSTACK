import formato from "../Utils/format";
const Card = ({ usuario, addres, price,year,nameOwner }) => {

    return (
        <div className="flex  justify-center  items-center cursor-pointer hover:shadow-lg shadow rounded p-6">
            <ul className="text-center text-base flex flex-col">
                <li>{usuario}</li>
                <li>{addres}</li>
                <li>{formato(price)}</li>
                <li>{year}</li>
                <li>{nameOwner}</li>
            </ul>

        </div>
    )
}

export default Card;