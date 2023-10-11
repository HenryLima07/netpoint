import Form from "../../../Form/Form";
import ErrorMessage from "../../../Form/ErrorMessage/ErrorMessage";
import InputForm from "../../../Form/InputForm/InputForm";
import BorderButton from "../../../Buttons/BorderButton/BorderButton";
import TextAreaForm from "../../../Form/TextAreaForm/TextAreaForm.component";
import SelectForm from "../../../Form/SelectForm/SelectForm.component";

import ErrorMessages from "../../../../data/data";

import { useForm } from "react-hook-form";
import { UseAuthContext } from "../../../../context/authContext";
import { toast } from "react-toastify";
import { useState } from "react";
import moment from 'moment';

import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';


const BookingForm = ({...props})=>{
    const { user } = UseAuthContext();

    const [ selectedDate, setSelectedDate ] = useState("");

    const selectedDateHandler = (e)=>{
        e.target.value >= actualDate() ? setSelectedDate(e.target.value) : setSelectedDate("")
    }

    const {
        register, 
        formState: { errors },
        handleSubmit,
    } = useForm();


    const onSuccess = async(data)=>{
        if(!data || !startTime || !endTime){
            onFail()
            return;
        }
       console.log(data);

    }
    const onFail = ()=>{
        toast.warn("Revisa bien tus datos e intenta de nuevo", {
            toastId: "warning"
        });
    }

    const actualDate = ()=>{
        return moment().format("YYYY-MM-DD");
    }
    return(
        <div className="w-full font-inter">
            <h3 className="font-bebas text-4xl md:text-6xl">Reserva ahora</h3>
            <Form className={"flex flex-col items-start"} onSubmit = {handleSubmit(onSuccess, onFail)}>
                <div className="w-[95%] flex flex-col items-start gap-4">
                    <label htmlFor="bookingType" className="font-semibold lg:text-2xl">Tipo de reserva</label>
                    <SelectForm
                        id={"bookingType"}
                        name={"bookingType"}
                        aria-invalid={errors.bookingType ? "true" : "false"}
                        innerRef={{...register("bookingType", { required: true})}}
                        validation={errors.bookingType}
                        placeholder={""}
                        className={"flex-row-reverse"}
                        icon={<CheckCircleOutlineIcon />}
                    >
                        <option value=""></option>
                        <option value="ALQ">Alquiler</option>
                        <option value="IND">Clase individual</option>
                    </SelectForm>
                      {errors.bookingType?.type === "required" && (<ErrorMessage> <span className="font-medium">Nota: </span> {ErrorMessages.require} </ErrorMessage>)}
                    <label htmlFor="date" className="font-semibold lg:text-2xl">Día</label>
                    <InputForm
                      id={"date"}
                      name={"date"}
                      min = {actualDate()}
                      aria-invalid={errors.date ? "true" : "false"}
                      innerRef={{ ...register("date", {required: true, onChange: (e)=> selectedDateHandler(e) }) }}
                      validation={errors.date}
                      placeholder={""}
                      type={"date"}
                      className={"flex-row-reverse"}
                    />
                      {errors.date?.type === "required" && (<ErrorMessage> <span className="font-medium">Nota: </span> {ErrorMessages.require} </ErrorMessage>)}
                      {errors.date?.type === "notDate" && (<ErrorMessage> <span className="font-medium">Nota: </span> {ErrorMessages.notDate} </ErrorMessage>)}
                      {
                        selectedDate ?
                            <BorderButton onClick={(e)=>{e.preventDefault(); props.ToggleModalHandler(true)}} className=" flex flex-row self-end items-center justify-around gap-6 font-bold text-black bg-pure-white shadow-rounded-button-azure border border-black
                                mt-4 py-2 px-3 text-sm
                                sm:p-2 sm:px-4
                                md:px-5 md:py-3 md:text-base"> 
                                <p className="uppercase">selecciona tus horas</p>
                                <EmojiPeopleIcon />
                            </BorderButton>
                            :
                            <></>
                      }
                      
                    <label htmlFor="comment" className="font-semibold lg:text-2xl">Comentario</label>
                    <TextAreaForm 
                        id={"comment"}
                        name={"comment"}
                        innerRef={{ ...register("comment") }}
                        placeholder={"Dejanos tu comentario..."}
                        icon={<ChatBubbleOutlineIcon style={{fontSize: "24px"}}/>}
                        className={"flex-row-reverse"}
                    />
                </div>

                <BorderButton className=" flex flex-row self-center items-center justify-around gap-6 font-bold text-black bg-pure-white shadow-rounded-button-azure border border-black
                    mt-5 py-2 px-3 text-sm
                    sm:p-2 sm:px-4
                    md:text-base
                    lg:mt-8 lg:py-3 lg:px-8 lg:text-lg"> 
                    <p className="uppercase">Reservar ahora</p>
                    <EmojiPeopleIcon />
                </BorderButton>
            </Form>
        </div>
    )
}
export default BookingForm;