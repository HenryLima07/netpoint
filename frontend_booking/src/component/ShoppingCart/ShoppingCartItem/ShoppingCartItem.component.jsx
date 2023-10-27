import ErrorMessage from "../../Form/ErrorMessage/ErrorMessage";

import CloseIcon from "@mui/icons-material/Close";

import { ISOtoOnlyDate, OverlapsHandler } from "../../../utils/utils";
import ErrorMessages from "../../../data/data";
import { BookingFormService } from "../../CanchaInd/CanchaInd.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ItemInformation = ({ item, className }) => {
  return (
    <article
      className={` flex flex-col justify-center font-inter text-dark-gray ${className}`}
    >
      <h4 className=" font-semibold text-base md:text-2xl">{item.canNombre}</h4>
      <h5 className=" font-semibold text-sm md:text-lg md:-mt-1">
        {item.canDireccion}
      </h5>
      <p className=" font-light text-sm md:text-lg md:-mt-1">
        Fecha:
        <span className="font-semibold text-sm md:text-base">
          {" " + ISOtoOnlyDate(item.date)}
        </span>
      </p>
      <p className=" font-light text-sm md:text-lg md:-mt-1">
        Horas:{" "}
        <span className="font-semibold text-sm md:text-base">
          {item.startTime} - {item.endTime}
        </span>
      </p>
      <h6 className=" font-light text-sm md:text-lg md:-mt-1">
        Costo:{}
        <span className="font-semibold text-sm md:text-base">
          $15.00 {}
        </span>{" "}
      </h6>
    </article>
  );
};

const ShoppingCartItemComponent = ({
  item,
  onRemoveItem,
  fetchNow = false,
}) => {
  const { SelectAllBookingsOnDate } = BookingFormService();
  //state to control overlapping
  const [overlaps, setOverlaps] = useState(false);

  const fetchCourtDayActivities = async () => {
    const { data } = await SelectAllBookingsOnDate(item.date, item.canchaId);
    const overlaps = OverlapsHandler(item.startTime, endTime, data);
    if (overlaps) {
      setOverlaps(true);
      toast.warn("No se ha podido realizar la reserva", { toastId: "warn" });
      return;
    }

    const response = await CreateBooking(
      token,
      bookingType,
      new Date(date).toISOString(),
      startTime,
      endTime,
      comment,
      rscTipoDePago,
      canchaId,
      estado,
    );
  };

  useEffect(() => {
    if (fetchNow) fetchCourtDayActivities();
  }, [fetchNow]);

  return (
    <>
      <div className="rounded-lg shadow-cards max-h-60 h-60 min-h-[15rem] md:h-52 min-w-[175px] w-full hover:scale-[1.02] transition-all duration-500 ease-in-out">
        <div className="flex flex-col md:flex-row w-full h-full relative">
          <button
            className="flex flex-col items-center p-2 absolute top-0 right-0 bg-pure-white rounded-bl-lg"
            onClick={() => onRemoveItem()}
          >
            <CloseIcon style={{ fontSize: "24px" }} />
          </button>
          <div className="bg-[url('./img/formback.jpg')] w-full h-3/5 md:h-auto md:w-3/5 bg-cover bg-center rounded-tl-xl md:rounded-bl-xl "></div>

          <ItemInformation
            className={" py-2 px-4 md:px-5 md:py-4"}
            item={item}
          />
        </div>
      </div>
      {overlaps ? <ErrorMessage>{ErrorMessages.overlaps}</ErrorMessage> : <></>}
    </>
  );
};

export default ShoppingCartItemComponent;
