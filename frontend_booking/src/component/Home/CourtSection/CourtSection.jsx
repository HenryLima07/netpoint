import CourtContainer from "./CourtContainer/CourtContainer";

const CourtSection =()=>{
    return(
        <section className="flex flex-col items-center bg-mustard-yellow w-full font-inter text-dark-gray text-center md:m-0 p-8 py-14 pt-10">
            <h2 className="font-bold text-center text-3xl md:text-5xl py-6">Escoge el lugar más cerca de ti</h2>
            <h4 className="mb-8 md:text-xl">Escoge entre una de nuestras sedes para comenzar esta aventura</h4>

            <article className="flex flex-col md:flex-row justify-around gap-8 mt-10 lg:w-[80%]">
                <CourtContainer title={"C.D. GAMBETA PRÓCERES"}>
                    <p className="text-sm sm:text-base md:text-lg">Descubre la experiencia del tenis en nuestra sede en Gambeta Los Próceres con nuestras instalaciones y únete a nosotros con el mejor ambiente.</p> 
                </CourtContainer>
                <CourtContainer title={"RES. LAS LUCES ZARAGOZA"}>
                    <p className=" text-sm  sm:text-base md:text-lg">Se parte de la diversión en la cancha en Residencial Las Luces, Zaragoza. La experiencia se crea aquí.</p>
                </CourtContainer>
            </article>
        </section>
    );
}

export default CourtSection;