import PromoContainer from "./PromoContainer/PromoContainer";

import { ISOtoOnlyDate } from "../../../utils/utils";
import { useState } from "react";

const PromoSection = ({...props})=>{
    const { promoData } = props;
    
    const firstPromo = promoData.length > 0 ? promoData[0] : [];
    //remove first taken
    return(
        <section className="flex flex-col items-center justify-center place-self-center w-full lg:w-[80%] px-4 font-inter">
            <h2 className="font-bold text-3xl text-center md:text-5xl text-black p-12" id="promo">Las <span className="text-neon-sky">promos</span> para los deportistas</h2>
            {
                firstPromo ? 
                    <PromoContainer
                        className={"w-full"}
                        price={firstPromo.paqPrecio}
                        name={firstPromo.paqNombre}
                    >
                        <p className="text-sm sm:text-lg md:text-xl">Pellentesque morbi non condi mentum iaculis dictum neque, velit. Disponible desde: {ISOtoOnlyDate(firstPromo.paqFechaDesde)} hasta {ISOtoOnlyDate(firstPromo.paqFechaHasta)}</p>
                    </PromoContainer>
                    : <></>
           
            }
            <div className="flex flex-row overflow-x-scroll w-full justify-start">
                <div className="flex flex-row flex-nowrap justify-center w-full">

                {
                    promoData.length > 1 ? 
                    promoData.map((item, index)=> {
                        if(index > 0)
                            return(
                                <PromoContainer 
                                 id = {item.id}
                                 key={item.id}
                                 className={"w-1/3 min-w-[239px] md:min-w-[392px]"}
                                 price={item.paqPrecio}
                                 name={item.paqNombre}
                                >
                                    <p className="text-sm sm:text-lg md:text-xl">Pellentesque morbi non condi mentum iaculis dictum neque, velit. Disponible desde: {ISOtoOnlyDate(item.paqFechaDesde)} hasta {ISOtoOnlyDate(item.paqFechaHasta)}</p>
                                </PromoContainer>
                            );
                        })
                        :
                        <></>
                }
                </div>
            </div>
        </section>
    )
}

export default PromoSection;
