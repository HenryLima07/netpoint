import SingUp from "../component/SingUp/SingUp";
import { Link } from "react-router-dom";


import { ArrowLeft } from "react-bootstrap-icons";



const SingUpView= ()=>{
    return(
        <main className="h-screen md:py-10 font-inter flex items-center justify-center relative bg-[url('./img/formback.jpg')] bg-no-repeat bg-center bg-cover">
            <div className="absolute w-full h-full top-0 left-0 bg-lapis-lazuli bg-opacity-20"></div>

            <div className="w-full bg-pure-white sm:rounded-xl flex flex-col justify-center sm:h-auto sm:w-[90%] md:w-4/5 lg:w-3/4 xl:w-3/5 2xl:w-[50%] z-10">
                <Link to={"/"} className=" flex w-min flex-row items-center gap-3 m-6 hover:cursor-pointer text-lg md:m-8 lg:m-10 lg:text-xl">
                    <ArrowLeft />
                    Regresar
                </Link>
                <h1 className="self-start uppercase font-bebas mx-6 my-1 leading-3 text-3xl md:mx-8 lg:mx-10 md:text-4xl lg:text-5xl">Crear cuenta</h1>
                <p className="m-6 text-base lg:mx-10 md:text-lg">Prepárate para alcanzar la grandeza en el tenis: <span className="font-bold">Tu victoria comienza aquí. </span></p>

                <SingUp/>

                <Link to={"/singin"} className="self-center uppercase font-bebas underline underline-offset-4 hover:cursor-pointer m-6 md:mx-8 leading-3 text-xl md:text-2xl lg:text-3xl">iniciar sesión</Link>
            </div>
        </main>
    );
}

export default SingUpView;