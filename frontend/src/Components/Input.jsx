const Input = ({tipo,placeHolder,value,onChange,id,name,checked})=>{
    return(
        <>
            <input 
            className={`${tipo === "radio"? "h-4 w-4 rounded-full border-1 border-black checked:border-black checked:bg-gradient-radial checked:from-black checked:to-yellow-500 transition-all duration-300":"border rounded-xl px-5 py-1 border-gray-300 w-full md:max-w-[400px]"}`}   
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            checked={checked}
            type={tipo} 
            placeholder={placeHolder} />
        </>
    )
}

export default Input;