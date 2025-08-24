const Input = ({tipo,placeHolder,value,onChange,id})=>{
    return(
        <>
            <input className="border-1 px-3 py-2 rounded border-gray-200" 
            id={id}
            value={value}
            onChange={onChange}
            type={tipo} 
            placeholder={placeHolder} />
        </>
    )
}

export default Input;