
export const formato = (dato) =>{
    return new Intl.NumberFormat("en-US",{
        style:"currency",
        currency:"USD"
    }).format(dato)
}

export const formatoFecha = (dato)=> {
   return new Date(dato).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }) 
}