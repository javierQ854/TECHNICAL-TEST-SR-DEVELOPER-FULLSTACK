const Button = ({dato,tipo,onclick,id}) =>{
    return(
        <>
            <button id={id} type={tipo} onClick={onclick} className={`${id ? 'bg-black text-amber-300 px-3 rounded cursor-pointer py-2':'bg-black px-1 py-1 shadow-inner shadow-amber-50 cursor-pointer rounded-2xl  text-amber-300 font-bold '}`}>{dato}</button>
        </>
    )
}

export default Button;