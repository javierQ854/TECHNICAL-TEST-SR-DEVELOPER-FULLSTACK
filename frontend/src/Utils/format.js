
const formato = (dato) =>{
    return new Intl.NumberFormat("en-US",{
        style:"currency",
        currency:"USD"
    }).format(dato)
}

export default formato