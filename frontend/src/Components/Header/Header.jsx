const Header = ({titulo,px,py,marca}) =>{
    const Tag = marca
    return(
        <>
        <Tag className={`px-${px} py-${py} text-center uppercase font-bold bg-black text-amber-300`}>{titulo}</Tag>
        </>
        
    )
}

export default Header;