const Input = ({tipo,placeHolder,value,onChange})=>{
    return(
        <>
            <input className="border-1 px-3 rounded border-gray-200" 
            value={value}
            onChange={onChange}
            type={tipo} 
            placeholder={placeHolder} />
        </>
    )
}

export default Input;