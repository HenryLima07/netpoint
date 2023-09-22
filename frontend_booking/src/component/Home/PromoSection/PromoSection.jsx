import PromoContainer from "./PromoContainer/PromoContainer";

const PromoSection = ()=>{
    return(
        <section className="flex flex-col items-center justify-center place-self-center w-full lg:w-[80%] px-4 font-inter">
            <h2 className="font-bold text-3xl text-center md:text-5xl text-black p-12">Las <span className="text-neon-sky">promos</span> para los deportistas</h2>
            <PromoContainer
                className={"w-full"}
                price={"15"}
                name={"Nombre del paquete"}
            >
                <p className="text-sm sm:text-lg md:text-xl">Pellentesque morbi non condi mentum iaculis dictum neque, velit</p>
            </PromoContainer>
            <div className="flex flex-row flex-nowrap overflow-x-scroll w-full">
                
                <PromoContainer
                    className={"w-1/3 min-w-[239px]"}
                    price={"15"}
                    name={"Nombre del paquete"}
                >
                    <p className="text-sm sm:text-lg md:text-xl">Pellentesque morbi non condi mentum iaculis dictum neque, velit</p>
                </PromoContainer>
                <PromoContainer
                    className={"w-1/3 min-w-[239px]"}
                    price={"15"}
                    name={"Nombre del paquete"}
                >
                    <p className="text-sm sm:text-lg md:text-xl">Pellentesque morbi non condi mentum iaculis dictum neque, velit</p>
                </PromoContainer>
                <PromoContainer
                    className={"w-1/3 min-w-[239px]"}
                    price={"15"}
                    name={"Nombre del paquete"}
                >
                    <p className="text-sm sm:text-lg md:text-xl">Pellentesque morbi non condi mentum iaculis dictum neque, velit</p>
                </PromoContainer>

            </div>
        </section>
    )
}

export default PromoSection;