import { Link } from "react-router-dom";


const ItemInformation = ({item, className})=>{
    return(
        <article className={` font-inter text-dark-gray ${className}`}>
            <h4 className=" font-semibold text-lg md:text-2xl">{item.canNombre}</h4>
            <p className=" font-light text-sm md:text-base md:-mt-2">{item.canDireccion}</p>
        </article>
    )
}


const ItemCanchaComponent = ({item})=>{
    return(
        <div className=" rounded-lg shadow-cards max-h-60 h-60 max-w-sm min-w-[250px] w-11/12 sm:w-[10rem] md:w-[18rem] lg:w-[24rem] hover:scale-[1.02] transition-all duration-500 ease-in-out">
            <Link to ={`/cancha/${item.id}`} className=" h-fit w-fit" aria-label="ver cancha">
                <div className=" bg-[url('./img/formback.jpg')] bg-cover bg-center w-full h-4/6 rounded-t-xl "></div>
                
                <ItemInformation item={item} className={" p-4 md:px-5 md:py-4"} />
            </Link>
        </div>
    )
}

export default ItemCanchaComponent;