import icon from "../../../assets/img/logo.png";

const PhraseSection = ()=>{
    return(
        <section className="flex flex-col items-center justify-center font-inter p-6">
            <div className="lg:w-[80%]">
                <h2 className="font-bold text-center text-3xl md:text-5xl py-6">¡Únete a la comunidad de tenis más apasionada y eleva tu juego con nosotros!</h2>
           
                <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-neutral">
                    <p className="text-sm sm:text-base md:text-lg text-center w-3/4">Prepárate para alcanzar la grandeza en el tenis: Tu victoria comienza aquí. Reserva canchas para jugar a tu ritmo, apuntarte a clases con los mejores instructores y aprovechar promociones exclusivas, todo en un solo lugar. </p>
                    <img src={icon} alt="Netpoint icono" className="w-44"/>
                </div>

            </div>
        </section>
    )
}

export default PhraseSection;