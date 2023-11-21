import axios from "axios";
import { UseConfiguration } from "../../context/configContext";
import { toast } from "react-toastify";

import {
  FechaHoraMappingForCalendar,
  TipoRerservaToTitleMapping,
} from "../../utils/utils";

const KEY = "Bearer";

export const BookingFormService = () => {
  const { startLoading, stopLoading } = UseConfiguration();

  const CreateBooking = async (
    token,
    rscTipoReserva,
    rscFechaReserva,
    rscHoraDesde,
    rscHoraHasta,
    rscComentarios,
    rscTipoPago,
    canchaId,
    rscEstado,
  ) => {
    startLoading();
    try {
      const data = await axios.post(
        "/reserva/own",
        {
          rscTipoReserva,
          rscFechaReserva,
          rscHoraDesde,
          rscHoraHasta,
          rscComentarios,
          rscTipoPago,
          canchaId,
          rscEstado,
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

  const SelectAllBookingsOnDate = async (fecha, id) => {
    startLoading();
    try {
      const { data } = await axios.get(
        `/reserva/fecha/?date=${fecha}&id=${id}`,
      );
      return data;
    } catch (e) {
      console.log(e.message);
    } finally {
      stopLoading();
    }
  };

  const FetchCourt = async (id) => {
    startLoading();
    try {
      const { data } = await axios.get(`/cancha/${id}`);
      return data;
    } catch (e) {
      console.log(e.message());
    } finally {
      stopLoading();
    }
  };
  const crud = {
    CreateBooking,
    SelectAllBookingsOnDate,
    FetchCourt,
  };

  return crud;
};
