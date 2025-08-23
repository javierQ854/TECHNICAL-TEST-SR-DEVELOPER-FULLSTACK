const Button = ({dato,tipo}) =>{
    return(
        <>
            <button type={tipo} className="bg-blue-900 px-5 py-1 cursor-pointer rounded-2xl hover:bg-blue-950 text-white font-bold ">{dato}</button>
        </>
    )
}

export default Button;