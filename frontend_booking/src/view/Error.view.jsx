import BorderButton from "../component/Buttons/BorderButton/BorderButton";

import { useNavigate } from "react-router-dom";

import NotFound from "../assets/img/notfoundpic.png";

const Error=()=>{
    const navigate = useNavigate();
    return (
        <main className="flex items-center justify-center max-w-[1920px]">
            <div className=" flex flex-col p-6 md:flex-row items-center gap-6 lg:gap-16">
                <img src={NotFound} alt="Error image" className=" lg:w-full md:w-3/5"/>
                <div className="flex flex-col font-inter w-full md:w-3/4">
                    <h1 className="font-nunito font-black text-5xl lg:text-8xl mb-1">¡Ups!</h1>
                    <h4 className="font-semibold text-2xl lg:text-4xl">Al parecer algo se ha perdido</h4>
                    <p className="font-light text-lg lg:text-2xl">Pero no te preocupes, creemos que seguro  regresará.</p>
                    <BorderButton onClick={()=>navigate("/")}
                        className={`flex flex-row items-center justify-around self-start gap-6 font-bold  text-black bg-pure-white shadow-rounded-button-sky shadow-black border m-2 uppercase
                            text-sm py-2 px-16
                            sm:text-lg
                            lg:text-xl px-20`}
                    >  Regresar</BorderButton>
                    
                </div>
            </div>
        </main>
    );
}

export default Error;