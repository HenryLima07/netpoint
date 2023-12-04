import axios from "axios";
import { UseConfiguration } from "../../../context/configContext";
import { toast } from "react-toastify";

const KEY = "Bearer";

export const BookingPromoServices = () => {
  const { startLoading, stopLoading } = UseConfiguration();

  const CreatePromoBooking = async (
    token,
    paqId,
    pqcEstado,
    pqcRestricciones,
    pqcCantidad,
    pqcPrecio,
    pqcDescuento,
  ) => {
    startLoading();
    try {
      const data = await axios.post(
        "/paqueteComprado/own ",
        {
          paqId,
          pqcEstado,
          pqcRestricciones,
          pqcCantidad,
          pqcPrecio,
          pqcDescuento,
        },
        {
          headers: {
            Authorization: `${KEY} ${token}`,
          },
        },
      );
      return data;
    } catch (e) {
      console.log(e.response.data.message);
      const errors = {
        400: "No se ha podido reservar correctamente",
        404: "No se ha encontrado la cancha que desea reservar",
        422: "Horarios duplicados, ya han sido reservados",
      };
      toast.warn(errors[e.response.status], { toastId: "warn" });
      return e.response.status;
    } finally {
      stopLoading();
    }
  };
  const crud = {
    CreatePromoBooking,
  };

  return crud;
};
