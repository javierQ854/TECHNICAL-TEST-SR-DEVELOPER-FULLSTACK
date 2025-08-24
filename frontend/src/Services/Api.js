const API_PROPERTIES = "http://localhost:5227/api/Properties"

export const ObtenerDatos = async({buscarCasa,buscarDireccion, min,max}) =>
{
  const params = new URLSearchParams()
  if(buscarCasa) params.append("name", buscarCasa)
  if(buscarDireccion) params.append("address", buscarDireccion)
  if(min) params.append("minPrice", min)
  if(max) params.append("maxPrice", max)

  const url = params.toString().length > 0 ? `http://localhost:5227/api/Properties/filter?${params.toString()}`: API_PROPERTIES 
  console.log(url)
  const res = await fetch(url)
  if(!res.ok) throw new Error ("No se pueden traer los datos") 
    const datos = await res.json()
    return Array.isArray(datos) ? datos : [datos]
}

export const ObtenerPropiedad = () =>{
  return "Hola"
}

