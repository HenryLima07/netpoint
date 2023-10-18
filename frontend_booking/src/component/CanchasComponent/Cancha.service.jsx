import axios from "axios"
import { UseConfiguration } from "../../context/configContext";
import { toast } from "react-toastify";


export const CanchaService = ()=>{
    const { startLoading, stopLoading } = UseConfiguration();

    const fetchActiveCourts = async()=>{
        startLoading();

        try{
            const { data } = await axios.get("/cancha?estado=ACT");
            return data.data;
        }
        catch(e){
            console.log(e.message());
            toast.warn("Error inesperado", {toastId: "warn"})
        }
        finally{
            stopLoading();
        }
    }

    const service = {
        fetchActiveCourts,
    }

    return service;
}