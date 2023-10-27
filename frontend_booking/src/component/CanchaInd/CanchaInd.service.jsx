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
      const { data } = await axios.post(
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
      console.log(e.message);
      toast.warn("No se ha podido reservar correctamente", { toastId: "warn" });
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

  const BookingDateToEventsDateMapping = (data) => {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();

    if (!data) return null;

    return data.map((event) => {
      return {
        title: TipoRerservaToTitleMapping(event.rscTipoReserva),
        start: FechaHoraMappingForCalendar(
          event.rscFechaReserva,
          event.rscHoraDesde,
        ),
        end: FechaHoraMappingForCalendar(
          event.rscFechaReserva,
          event.rscHoraHasta,
        ),
      };
    });
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
    BookingDateToEventsDateMapping,
    FetchCourt,
  };

  return crud;
};
