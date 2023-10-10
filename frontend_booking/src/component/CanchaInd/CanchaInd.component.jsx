import FieldDescription from "./FieldDescription/FieldDescription.component";
import FieldBooking from "./FieldBooking/FieldBooking.component";

const CanchaIndComponent = ({...props})=>{
    return(
        <section className="p-5 flex flex-col gap-12 sm:px-12 lg:px-5 xl:px-16 2xl:px-32">
            <FieldDescription />
            <FieldBooking ToggleModalHandler={props.ToggleModalHandler} />
        </section>
    );
}

export default CanchaIndComponent;