
import ErrorMessages from "../../data/data";

import BorderButton from "../Buttons/BorderButton/BorderButton";
import InputForm from "../Form/InputForm/InputForm";
import ErrorMessage from "../Form/ErrorMessage/ErrorMessage";
import Form from "../Form/Form";

import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContextProvider, UseAuthContext } from "../../context/authContext";

const Login =({})=>{

    const [ showPassword, setShowPassword ] = useState(false);
    const navigateTo = useNavigate();
    const { login, user } = UseAuthContext();

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
        const { email, password } = data;
        if(!email || !password) {
            toast.warn("Revisa bien tus datos e intenta de nuevo", {
                toastId: "warning"
            });
            return;
        }
        
        await login(email, password);

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
                <div className="w-[95%] flex flex-col items-start gap-4">
                    <label htmlFor="email" className="font-semibold text-lg lg:text-3xl">Correo</label>
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

                    <label htmlFor="password" className="font-semibold text-lg lg:text-3xl">Contraseña</label>
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
                    <Link to={"/"} className="lowercase text-dark-gray underline underline-offset-2 self-end">¿olvidaste tu contraseña?</Link>
                </div>

                <BorderButton className=" flex flex-row self-center items-center justify-around gap-6 font-bold text-black bg-pure-white shadow-rounded-button-yellow border border-black
                    mt-2 py-1 px-2 text-sm
                    sm:p-2 sm:px-4
                    md:text-base
                    lg:mt-8 lg:py-3 lg:px-8 lg:text-lg"> 
                    <p className="uppercase">iniciar sesión</p>
                    <EmojiPeopleIcon />
                </BorderButton>
            </Form>

        </section>
    )
}

export default Login;