const Button = ({dato,tipo,onclick}) =>{
    return(
        <>
            <button type={tipo} onClick={onclick} className="bg-black px-1 py-1 cursor-pointer rounded-2xl hover:bg-black  font-bold ">{dato}</button>
        </>
    )
}

export default Button;