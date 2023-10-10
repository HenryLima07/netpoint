import img from "../../../assets/img/clases-indie.png";

import CheckIcon from '@mui/icons-material/Check';

const data = {
    "canDireccion": "RES. LAS LUCES ZARAGOZA",
    "canImg": img,
}

const TitleDescription = ({data})=>{
    return (
        <div className="font-inter text-dark-gray">
            <h1 className="font-bold text-4xl md:text-6xl">Cancha de Tennis</h1>
            {
                data ? 
                <> 
                    <h4 className="uppercase font-light text-base md:text-2xl ">ubicación {data.canDireccion}</h4>
                </>
                : <></>
            }
        </div>
    );
}

const RowDescription = ({children})=>{
    return <li className=" flex flex-row items-center gap-3 text-light-gray text-sm sm:text-lg md:text-xl"> <CheckIcon/> <p className=" w-[85%] text-center">{children}</p></li>
}

const BodyDescription =({data})=>{
    return(
        <div className="w-full flex flex-col lg:flex-row items-center gap-10 xl:gap-20">
            {
                data ? 
                <>
                    <img src={data.canImg} alt="imagen de cancha"  className=" w-full md:w-10/12 md:self-start lg:w-[70%] xl:w-2/3 rounded-xl shadow-lg"/>
                    <div className=" w-full lg:w-1/2 font-inter">
                        <p className="text-black text-lg sm:text-2xl pb-3">Recuerda que: </p>
                        <ul className="flex flex-col gap-4">
                            <RowDescription> Siempre reserva con anticipación y estar al tanto para no olvidarlas.</RowDescription>
                            <RowDescription> Respetar los horarios de entrada y salida establecidos al reservar.</RowDescription>
                            <RowDescription> No dañar las canchas de tennis, ni los complementos usados durante las practicas o juegos</RowDescription>
                            <RowDescription> Ir lo más cómodo y deportivo posible.</RowDescription>
                        </ul>
                    </div>

                </>
                :
                <></>
            }
        </div>
    )
}

const FieldDescription = ()=>{
    return(
        <section className="flex flex-col gap-12 py-5">   
            <TitleDescription data = {data}/>
            <BodyDescription data={data} />
        </section>
    );
}

export default FieldDescription;