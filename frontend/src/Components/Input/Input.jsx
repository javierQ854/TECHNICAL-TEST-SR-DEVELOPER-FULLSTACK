const Input = ({tipo,placeHolder,value,onChange,id,name,checked})=>{
    return(
        <>
            <input 
            className={`${tipo === "radio"? "h-4 w-4 rounded-full border-1 border-black checked:border-black checked:bg-gradient-radial checked:from-black checked:to-yellow-500 transition-all duration-300":"border-none w-full backdrop-blur-sm bg-white/15 rounded-xl placeholder-white px-6 py-1 border-gray-300 w-fulls"}`}   
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