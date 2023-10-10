import ClaseContainer from "./ClaseContainer/ClaseContainer";
import ClaseDescriptionContainer from "./ClaseDescriptionContainer/ClaseDescriptionContainer";

import claseNiño from "../../../assets/img/clases-ninos.png";
import clasesGrupal from "../../../assets/img/clases-grupal.png";
import claseIndie from "../../../assets/img/clases-indie.png";

const ClasesSection = ()=>{
    return (
        <section className="flex flex-col font-inter text-md md:text-xl text-dark-gray">
            <h2 className=" font-bold text-3xl text-center md:text-5xl lg:mx-48 xl:mx-72 text-black pb-12">Agenda tu <span className=" text-neon-sky"> primera clase </span> y disfruta</h2>
            
            <article className="flex flex-col">

                <ClaseContainer>
                    <div className="w-full md:w-1/2 self-end">
                        <img src={claseNiño} alt="imagen clases de tenis para niños"  className="w-full"/>
                    </div>                    
                    
                    <ClaseDescriptionContainer
                        title={"Clases para jóvenes y niños"}
                        subtitle={"De 10 a 14 años"}
                        extraInfo={"Horarios de 10:00 am a 4:00 pm"}
                        btnClass={"border border-black shadow-rounded-button-sky"}
                        divClass={"items-start"}
                        textClass={"text-left"}
                        className = {"w-full md:w-[42%] lg:w-[45%]"}
                    >
                        Ofrecemos clases de tenis adaptadas a las edades y habilidades de tus hijos. ¡Apúntalos y déjalos brillar en la cancha! 
                    </ClaseDescriptionContainer>
                </ClaseContainer>

                <ClaseContainer className={"flex-col-reverse md:flex-row"}>
                    <ClaseDescriptionContainer 
                        title={"Clases Individuales"}
                        subtitle={"Matutinas y vespertinas"}
                        extraInfo={"Todos los niveles"}
                        btnClass={"border border-black shadow-rounded-button-lime"}
                        divClass={"md:items-end"}
                        textClass={"md:text-right"}
                        className={""}
                    >
                        Clases personalizadas, programas específicos para desarrollar tu tenis y condición física.
                    </ClaseDescriptionContainer>

                    <img src={claseIndie} alt="imagen clases grupales" className="w-full md:w-1/2"/>
                </ClaseContainer>

                <ClaseContainer>
                        <img src={clasesGrupal} alt="imagen clases grupales" className="w-full md:w-1/2" />
                    <ClaseDescriptionContainer
                        title={"Clases grupales"}
                        subtitle={"Niños, jóvenes y adultos"}
                        extraInfo={"DIsponibles clases sabatinas"}
                        btnClass={"shadow-rounded-button-sky shadow-black border border-black"}
                        divClass={"items-start"}
                        textClass={"text-left"}
                        className={""}
                    >
                        Netpoint Tenis te ofrece clases grupales que se adaptan a todos los niveles de habilidad. ¡Ven y juega con nosotros! 
                    </ClaseDescriptionContainer>
                </ClaseContainer>
            </article>
        </section>
    );
}

export default ClasesSection;