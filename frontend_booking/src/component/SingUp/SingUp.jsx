
import ErrorMessages from "../../data/data";

import BorderButton from "../Buttons/BorderButton/BorderButton";
import InputForm from "../Form/InputForm/InputForm";
import ErrorMessage from "../Form/ErrorMessage/ErrorMessage";
import Form from "../Form/Form";

import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';


import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { UseAuthContext } from "../../context/authContext";


const SingUp =({})=>{

    const [ showPassword, setShowPassword ] = useState(false);
    const navigateTo = useNavigate();
    const { singUp } = UseAuthContext();

    const {
        register, 
        formState: { errors },
        handleSubmit
    } = useForm();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };


    const togglePasswordButton = (
        <button onClick={togglePassword} type="button">
          {showPassword ? <VisibilityIcon style={{fontSize: "24px"}} /> : <VisibilityOffIcon style={{fontSize: "24px"}} />}
        </button>
    );

    const onSuccess = async(data)=>{
        const { name, lastname, date, phone, email, password } = data;
        if(!email || !password || !name || !lastname || !date || !phone) {
            toast.warn("Revisa bien tus datos e intenta de nuevo", {
                toastId: "warning"
            });
            return;
        }

        console.log(data);
        
        await singUp( name, lastname, date, phone, email, password );

        navigateTo("/");
          
    }
    const onFail = ()=>{
        toast.warn("Revisa bien tus datos e intenta de nuevo", {
            toastId: "warning"
        });
    }

    return(
        <section className="m-6 md:mx-8 lg:mx-10">
            <Form className={"flex flex-col items-start"} onSubmit = {handleSubmit(onSuccess, onFail)}>
                <div className="w-[95%] flex flex-col items-start gap-3">
                    <label htmlFor="name" className="font-semibold text-lg lg:text-2xl">Nombres</label>
                    <InputForm
                      id={"name"}
                      name={"name"}
                      aria-invalid={errors.name ? "true" : "false"}
                      innerRef={{ ...register("name", { required: true, pattern: /^[A-Za-z\s]*$/ }) }}
                      validation={errors.name}
                      placeholder={"Jhon Player"}
                      icon={<PermIdentityOutlinedIcon style={{fontSize: "24px"}} />}
                      className={"flex-row-reverse"}
                    />
                      {errors.name?.type === "required" && (<ErrorMessage> <span className="font-medium">Nota: </span> {ErrorMessages.require} </ErrorMessage>)}
                      {errors.name?.type === "pattern" && (<ErrorMessage> <span className="font-medium">Nota: </span> {ErrorMessages.onlyString} </ErrorMessage>)}

                    <label htmlFor="lastname" className="font-semibold text-lg lg:text-2xl">Apellidos</label>
                    <InputForm
                      id={"lastname"}
                      name={"lastname"}
                      aria-invalid={errors.lastname ? "true" : "false"}
                      innerRef={{ ...register("lastname", { required: true, pattern: /^[A-Za-z\s]*$/ }) }}
                      validation={errors.lastname}
                      placeholder={"Peters Holder"}
                      icon={<PermIdentityOutlinedIcon style={{fontSize: "24px"}} />}
                      className={"flex-row-reverse"}
                    />
                      {errors.lastname?.type === "required" && (<ErrorMessage> <span className="font-medium">Nota: </span> {ErrorMessages.require} </ErrorMessage>)}
                      {errors.lastname?.type === "pattern" && (<ErrorMessage> <span className="font-medium">Nota: </span> {ErrorMessages.onlyString} </ErrorMessage>)}

                    <label htmlFor="date" className="font-semibold text-lg lg:text-2xl">Fecha de nacimiento</label>
                    <InputForm
                      id={"date"}
                      name={"date"}
                      aria-invalid={errors.date ? "true" : "false"}
                      innerRef={{ ...register("date", { required: true }) }}
                      validation={errors.date}
                      placeholder={""}
                      icon={<CalendarMonthIcon style={{fontSize: "24px"}}/>}
                      type={"date"}
                      className={"flex-row-reverse"}
                    />
                      {errors.date?.type === "required" && (<ErrorMessage> <span className="font-medium">Nota: </span> {ErrorMessages.require} </ErrorMessage>)}
                      
                    <label htmlFor="phone" className="font-semibold text-lg lg:text-2xl">Teléfono</label>
                    <InputForm
                      id={"phone"}
                      name={"phone"}
                      aria-invalid={errors.phone ? "true" : "false"}
                      innerRef={{ ...register("phone", { required: true, pattern: /^[726][0-9]{7}$/ }) }}
                      validation={errors.phone}
                      placeholder={"7091 0612"}
                      icon={<LocalPhoneIcon style={{fontSize: "24px"}} />}
                      className={"flex-row-reverse"}
                    />
                    {errors.phone?.type === "required" && (<ErrorMessage> <span className="font-medium">Nota: </span> {ErrorMessages.require} </ErrorMessage>)}
                    {errors.phone?.type === "pattern" && (<ErrorMessage> <span className="font-medium">Nota: </span> {ErrorMessages.phoneNumber} </ErrorMessage>)}

                    <label htmlFor="email" className="font-semibold text-lg lg:text-2xl">Correo</label>
                    <InputForm
                        id={"email"}
                        name={"email"}
                        type={"text"}
                        aria-invalid={errors.email ? "true" : "false"}
                        innerRef={{...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i })}}
                        validation={errors.email}
                        placeholder={"lovetenis@netpoint.com"}
                        className={"flex-row-reverse"}
                        icon={<AlternateEmailIcon />}
                    />
                      {errors.email?.type === "required" && (<ErrorMessage> <span className="font-medium">Nota: </span> {ErrorMessages.require} </ErrorMessage>)}
                      {errors.email?.type === "pattern" && (<ErrorMessage> <span className="font-medium">Nota: </span> {ErrorMessages.validateEmail} </ErrorMessage>)}

                    <label htmlFor="password" className="font-semibold text-lg lg:text-2xl">Contraseña</label>
                    <InputForm
                      id={"password"}
                      name={"password"}
                      aria-invalid={errors.password ? "true" : "false"}
                      innerRef={{ ...register("password", { required: true }) }}
                      validation={errors.password}
                      placeholder={"**********"}
                      icon={togglePasswordButton}
                      type={showPassword ? "text" : "password"}
                      autoComplete={"off"}
                      className={""}
                    />
                      {errors.password?.type === "required" && (<ErrorMessage> <span className="font-medium">Nota: </span> {ErrorMessages.require} </ErrorMessage>)}
                </div>

                <BorderButton className=" flex flex-row self-center items-center justify-around gap-6 font-bold text-black bg-pure-white shadow-rounded-button-yellow border border-black
                    mt-2 py-1 px-2 text-sm
                    sm:p-2 sm:px-4
                    md:text-base
                    lg:mt-8 lg:py-3 lg:px-8 lg:text-lg"> 
                    <p className="uppercase">Registrarse</p>
                    <EmojiPeopleIcon />
                </BorderButton>
            </Form>

        </section>
    )
}

export default SingUp;