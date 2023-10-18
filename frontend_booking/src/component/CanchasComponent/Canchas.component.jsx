import ItemCanchaComponent from "./ItemCanchaComponent/ItemCancha.component";
import { CanchaService } from "../../component/CanchasComponent/Cancha.service";

import { useEffect, useState } from "react";

const CanchasComponent = ()=>{


    const { fetchActiveCourts } = CanchaService();
    const [courtsData, setCourtsData] = useState([]);

    const setCourtsHandler = async() =>{
        const data = await fetchActiveCourts();
        if(!data) return;
        setCourtsData(data);
    }

    useEffect(() => {
        setCourtsHandler();
    }, []);

    return(
        <section className="w-full flex flex-col min-h-[60vh] items-center mb-14">
            <h2 className=" self-start font-inter text-dark-gray text-2xl font-bold md:text-6xl m-5 sm:mx-10 md:mx-20 md:my-10">Reserva <span className=" text-azure"> tu espacio  </span> de juego</h2>
            <article className=" flex flex-col items-center md:items-start gap-10 flex-wrap w-[95%] sm:flex-row sm:px-5 md:px-10">
                {
                    courtsData ? 
                        courtsData.map(item => <ItemCanchaComponent item={item} key={item.id} />)
                    :
                        <></>
                }
            </article>
        </section>
    )
}

export default CanchasComponent;