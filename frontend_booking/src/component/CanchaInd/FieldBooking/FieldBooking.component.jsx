
import BookingForm from "./BookingForm/BookingForm.component";

const FieldBooking = ({...props})=>{


    return(
        <section className="w-full mb-10 p-12 flex flex-col items-center justify-between gap-8 border border-black rounded-xl shadow-xl md:flex-row">
            <div className="flex flex-col items-center p-10 font-inter text-dark-gray">
                <h2 className="font-bebas text-7xl">$15.00 <span className="text-4xl">USD</span> </h2>
                <h4 className="text-4xl font-semibold -mt-2 -mb-1">Cancha de Tennis</h4>
                <h2 className="text-2xl text-light-gray">Sede C.D Gambeta Proceres</h2>
                <p className=" items-start text-light-gray text-xl my-4">El tenis es un desafío constante que te hará superar tus límites. ¡Únete a Netpoint y acepta el desafío hoy!</p>
            </div>
            <BookingForm ToggleModalHandler={props.ToggleModalHandler}/>
        </section>
    );
}

export default FieldBooking;