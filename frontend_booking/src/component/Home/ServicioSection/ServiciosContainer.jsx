import ServicioContainer from "./ServicioContainer/ServicioContainer";

import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClassIcon from '@mui/icons-material/Class';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import DiscountIcon from '@mui/icons-material/Discount';

const ServicioSection = ()=>{
    return (
        <section className=" flex flex-col p-10 lg:p-16 text-center font-inter text-md md:text-xl text-dark-gray">
            <article className="flex flex-col justify-center items-center">
               
                <h2 className=" font-bold text-3xl md:text-5xl lg:mx-48 xl:mx-72">Sumate al <span className=" text-neon-sky"> nuevo lado </span> del tenis salvadoreño</h2>
                <p className=" text-light-gray lg:mx-20 xl:mx-28 my-4 md:my-8" >
                    Sumérgete en la experiencia única del tenis en nuestro país. Contamos con clases para principiantes hasta entrenamiento avanzado, en Netpoint Tenis El Salvador, tenemos todo lo que necesitas para mejorar tu juego y ser parte del nuevo lado del tenis salvadoreño. 
                </p>
            
            </article>
            <article className="flex flex-col md:flex-row flex-wrap gap-6 items-center justify-around py-4">
                <ServicioContainer title={"Sedes"} icon={<LocationOnIcon />}>
                    <p className=" text-light-gray text-sm md:text-lg sm:w-72">Llevamos el tenis cerca de todos, con nuestras sedes en Los Proceres y Zaragoza</p>
                </ServicioContainer>

                <ServicioContainer title={"Clases"} icon={<ClassIcon />}>
                    <p className=" text-light-gray text-sm md:text-lg sm:w-72">Ponte en movimiento  y disfruta del tenis para todas las edades con nuestras clases individuales y grupales.</p>
                </ServicioContainer>

                <ServicioContainer title={"Canchas"} icon={<SportsTennisIcon />}>
                    <p className=" text-light-gray text-sm md:text-lg sm:w-72">Ahora puedes jugar tenis sin restricciones. Tenemos nuestra cancha disponible para que la reserves y juegues. </p>
                </ServicioContainer>

                <ServicioContainer title={"Promos"} icon={<DiscountIcon />}>
                    <p className=" text-light-gray text-sm md:text-lg sm:w-72">Perfeccionar tu juego con las mejores promociones y experimenta una mejora real en tu habilidad.</p>
                </ServicioContainer>
            </article>
        </section>
    );
}

export default ServicioSection;