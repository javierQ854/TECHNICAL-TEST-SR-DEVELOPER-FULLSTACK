const Card = ({usuario,edad}) =>{

    return(
        <div className="flex flex-col justify-center items-center cursor-pointer hover:shadow-lg shadow rounded p-6">
            <li>{usuario}</li>
            <li>{edad}</li>
        </div>
    )
}

export default Card;