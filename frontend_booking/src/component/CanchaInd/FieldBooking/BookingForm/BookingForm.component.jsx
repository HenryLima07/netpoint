import Form from "../../../Form/Form";
import ErrorMessage from "../../../Form/ErrorMessage/ErrorMessage";
import InputForm from "../../../Form/InputForm/InputForm";
import BorderButton from "../../../Buttons/BorderButton/BorderButton";
import NoBorderButton from "../../../Buttons/NoBorderButton/NoBorderButton";
import TextAreaForm from "../../../Form/TextAreaForm/TextAreaForm.component";
import SelectForm from "../../../Form/SelectForm/SelectForm.component";

import ErrorMessages from "../../../../data/data";

import { useForm } from "react-hook-form";
import { UseAuthContext } from "../../../../context/authContext";
import { toast } from "react-toastify";
import { useState } from "react";
import moment from "moment";

import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { OverlapsAndDayHandler, actualDate, BookingDateToEventsDateMapping } from "../../../../utils/utils";
import { BookingFormService } from "../../CanchaInd.service";
import { ShoppingCartService } from "../../../ShoppingCart/ShoppingCart.service";
import { useParams } from "react-router-dom";

const BookingForm = ({ ...props }) => {
  //avoid overlapping elements on cart
  const [overlaps, setOverlaps] = useState(false);
  const { user, token } = UseAuthContext();
  const { addElement, getElements } = ShoppingCartService();
  const { id } = useParams();

  const {
    CreateBooking,
    SelectAllBookingsOnDate,
    FetchCourt,
  } = BookingFormService();

  //props element comes from cancha view
  const {
    startTime,
    endTime,
    title,
    titleHandler,
    selectedDate,
    dateHandler,
    setEventsHandler,
    clearSelectedTimeHandler,
  } = props;

  const selectedDateHandler = (e) => {
    e.target.value ? dateHandler(e.target.value) : dateHandler("");
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSelectTimeButton = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.warn("Seleccione el tipo de reserva", { toastId: "warn" });
      return;
    }
    if (!selectedDate) return;

    const data = await SelectAllBookingsOnDate(selectedDate, id);
    if (data) setEventsHandler(BookingDateToEventsDateMapping(data.data));

    props.ToggleModalHandler(true);
  };

  const onSuccess = async (data) => {
    if (!data || !startTime || !endTime) {
      toast.warn("Selecciona tus horarios primero", {
        toastId: "warning",
      });
      return;
    }

    if (!user || !token) {
      toast.warn("Se necesita iniciar sesión primero", {
        toastId: "warning",
      });
      return;
    }

    // get forms data
    const { bookingType, date, comment } = data;

    //data quemada por no saber si existe o no la informacion
    const estado = "ACT";
    const rscTipoDePago = null;
    const _id = crypto.randomUUID();

    //verify overlapping
    let _overlaps = false;
    const eventsCart = getElements();
    if (eventsCart) {
      _overlaps = OverlapsAndDayHandler(date, startTime, endTime, eventsCart);
    }

    if (_overlaps) {
      setOverlaps(true);
      toast.warn("Horarios ya guardados!", {
        toastId: "warn",
      });
      return;
    } else {
      setOverlaps(false);
    }

    //fetch cancha to save it on petition
    const cancha = await FetchCourt(id);

    if (!data) {
      toast.warn("Algo salió mal!", {
        toastId: "warn",
      });
      return;
    }

    //saving in localstorage
    addElement({
      _id: _id,
      bookingType: bookingType,
      date: new Date(date).toISOString(),
      startTime: startTime,
      endTime: endTime,
      comment: comment,
      rscTipoDePago: rscTipoDePago,
      canchaId: id,
      estado: estado,
      canNombre: cancha.data.canNombre,
      canDireccion: cancha.data.canDireccion,
    });

    toast.success("Cancha agregada al carrito de compas", {
      toastId: "success",
    });

    dateHandler(null);
    clearSelectedTimeHandler();
    reset();
  };

  const onFail = () => {
    toast.warn("Revisa bien tus datos e intenta de nuevo", {
      toastId: "warning",
    });
  };

  return (
    <div className="w-full font-inter">
      <h3 className="font-bebas text-4xl md:text-6xl">Reserva ahora</h3>
      <Form
        className={"flex flex-col items-start"}
        onSubmit={handleSubmit(onSuccess, onFail)}
      >
        <div className="w-[95%] flex flex-col items-start gap-4">
          <label htmlFor="bookingType" className="font-semibold lg:text-2xl">
            Tipo de reserva
          </label>
          <SelectForm
            id={"bookingType"}
            name={"bookingType"}
            aria-invalid={errors.bookingType ? "true" : "false"}
            innerRef={{
              ...register("bookingType", {
                required: true,
                onChange: (e) => {
                  let index = e.nativeEvent.target.selectedIndex;
                  let title = e.nativeEvent.target[index].text;
                  titleHandler(title);
                },
              }),
            }}
            validation={errors.bookingType}
            className={"flex-row-reverse"}
            icon={<CheckCircleOutlineIcon />}
          >
            <option value=""></option>
            <option value="ALQ">Alquiler</option>
            <option value="IND">Clase individual</option>
          </SelectForm>
          {errors.bookingType?.type === "required" && (
            <ErrorMessage>
              {" "}
              <span className="font-medium">Nota: </span>{" "}
              {ErrorMessages.require}{" "}
            </ErrorMessage>
          )}
          <label htmlFor="date" className="font-semibold lg:text-2xl">
            Día
          </label>
          <InputForm
            id={"date"}
            name={"date"}
            min={actualDate()}
            aria-invalid={errors.date ? "true" : "false"}
            innerRef={{
              ...register("date", {
                required: true,
                onChange: (e) => selectedDateHandler(e),
              }),
            }}
            validation={errors.date}
            placeholder={""}
            type={"date"}
            className={"flex-row-reverse"}
          />
          {errors.date?.type === "required" && (
            <ErrorMessage>
              {" "}
              <span className="font-medium">Nota: </span>{" "}
              {ErrorMessages.require}{" "}
            </ErrorMessage>
          )}
          {errors.date?.type === "notDate" && (
            <ErrorMessage>
              {" "}
              <span className="font-medium">Nota: </span>{" "}
              {ErrorMessages.notDate}{" "}
            </ErrorMessage>
          )}

          {/* selected hours display */}
          {startTime && endTime ? (
            <p>
              Horas seleccionadas:{" "}
              <span className="font-medium">
                {" "}
                {startTime} - {endTime}{" "}
              </span>
            </p>
          ) : (
            <></>
          )}
          {selectedDate ? (
            <NoBorderButton
              handleClick={(e) => onSelectTimeButton(e)}
              className={`font-bebas flex flex-row self-end items-center gap-6 justify-around bg-dark-gray text-pure-white
                                  py-2 px-3 text-base
                                  sm:p-2 sm:px-4
                                  md:px-5 md:py-3 md:text-lg
                                 `}
            >
              <p className="uppercase">Seleccionar hora</p>
              <EmojiPeopleIcon />
            </NoBorderButton>
          ) : (
            <></>
          )}

          <label htmlFor="comment" className="font-semibold lg:text-2xl">
            Comentario
          </label>
          <TextAreaForm
            id={"comment"}
            name={"comment"}
            innerRef={{ ...register("comment") }}
            placeholder={"Dejanos tu comentario..."}
            icon={<ChatBubbleOutlineIcon style={{ fontSize: "24px" }} />}
            className={"flex-row-reverse"}
          />
        </div>

        <BorderButton
          className=" flex flex-row self-center items-center justify-around gap-6 font-bold text-black bg-pure-white shadow-rounded-button-azure border border-black
                    mt-5 py-2 px-3 text-sm
                    sm:p-2 sm:px-4
                    md:text-base
                    lg:mt-8 lg:py-3 lg:px-8 lg:text-lg"
        >
          <p className="uppercase">Agregar al carrito</p>
          <EmojiPeopleIcon />
        </BorderButton>
        {overlaps ? (
          <div className="self-center mt-3 md:mt-4">
            <ErrorMessage>
              <span className="font-medium">Nota: </span> horas ya guardadas en
              el carrito de compras
            </ErrorMessage>
          </div>
        ) : (
          <></>
        )}
      </Form>
    </div>
  );
};
export default BookingForm;
