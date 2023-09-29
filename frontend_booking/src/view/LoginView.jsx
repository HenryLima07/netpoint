import Login from "../component/Login/Login";
import { Link } from "react-router-dom";


import { ArrowLeft } from "react-bootstrap-icons";

const LoginView= ()=>{
    return(
        <main className="h-screen bg-lapis-lazuli font-inter flex items-center justify-center">
            <div className="h-screen w-full bg-pure-white sm:rounded-xl flex flex-col justify-center sm:h-auto sm:w-[90%] md:w-4/5 lg:w-3/4 xl:w-3/5 2xl:w-[50%]">
                <Link to={"/"} className=" flex flex-row items-center gap-3 m-6 hover:cursor-pointer text-lg md:m-8 lg:m-10 lg:text-xl">
                    <ArrowLeft />
                    Regresar
                </Link>
                <h1 className="self-start uppercase font-bebas mx-6 my-1 leading-3 text-3xl md:mx-8 lg:mx-10 md:text-4xl lg:text-5xl">iniciar sesión</h1>
                <p className="m-6 text-base lg:mx-10 md:text-lg">Prepárate para alcanzar la grandeza en el tenis: <span className="font-bold">Tu victoria comienza aquí. </span></p>

                <Login/>

                <Link to={"/"} className="self-center uppercase font-bebas underline underline-offset-4 hover:cursor-pointer m-6 md:mx-8 leading-3 text-xl md:text-2xl lg:text-3xl">registrarse</Link>
            </div>
        </main>
    );
}

export default LoginView;