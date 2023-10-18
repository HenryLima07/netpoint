import axios from "axios";

import { UseConfiguration } from "../../context/configContext";

export const HomeService =  ()=>{
    const { startLoading, stopLoading } = UseConfiguration();

    const fetchPromos = async()=>{
        startLoading();
        try{
            const { data } = await axios.get("/paquete");
            return data;
        }
        catch(e){
            console.log(e.message);
        }
        finally{
            stopLoading();
        }
    }

    return {
        fetchPromos,
    }

}