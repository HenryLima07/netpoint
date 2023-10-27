import BookingForm from "./BookingForm/BookingForm.component";

const FieldBooking = ({ ...props }) => {
  const { data } = props;

  return (
    <section className="w-full mb-10 flex flex-col items-center justify-between gap-8 border border-black rounded-xl shadow-xl p-6 md:flex-row md:p-12">
      <div className="flex flex-col items-center font-inter text-dark-gray md:p-10">
        <h2 className="font-bebas text-5xl md:text-7xl">
          $15.00 <span className="text-2xl md:text-4xl">USD</span>{" "}
        </h2>
        <h4 className="font-semibold -mt-2 -mb-1 text-2xl md:text-4xl w-3/4 text-center">
          Cancha de Tennis {data.canNombre}
        </h4>
        <h2 className="text-light-gray text-lg md:text-2xl ">
          Sede C.D Gambeta Proceres
        </h2>
        <p className=" items-start text-light-gray my-4 text-sm md:text-xl">
          El tenis es un desafío constante que te hará superar tus límites.
          ¡Únete a Netpoint y acepta el desafío hoy!
        </p>
      </div>
      <BookingForm
        startTime={props.startTime}
        endTime={props.endTime}
        title={props.title}
        selectedDate={props.selectedDate}
        canchaId={props.canchaId}
        ToggleModalHandler={props.ToggleModalHandler}
        dateHandler={props.dateHandler}
        titleHandler={props.titleHandler}
        setEventsHandler={props.setEventsHandler}
        clearSelectedTimeHandler={props.clearSelectedTimeHandler}
      />
    </section>
  );
};

export default FieldBooking;
