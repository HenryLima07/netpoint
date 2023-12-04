import Form from "../../Form/Form";
import InputForm from "../../Form/InputForm/InputForm";
import ErrorMessage from "../../Form/ErrorMessage/ErrorMessage";
import BorderButton from "../../Buttons/BorderButton/BorderButton";

import ErrorMessages from "../../../data/data";
import { UserUpdationService } from "./UserServices/UserUpdation.service";

import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { UseAuthContext } from "../../../context/authContext";
import { toast } from "react-toastify";
import { ISOtoOnlyDate } from "../../../utils/utils";

const UserUpdation = ({ className }) => {
  const { token } = UseAuthContext();
  const navigateTo = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { fetchUser, updateUser } = UserUpdationService();
  const [user, setUser] = useState({});

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: async () => {
      const { data } = await fetchUser(token);
      setUser(data);
      return {
        name: data.perNombres,
        lastname: data.perApellidos,
        email: data.perEmail,
        phone: data.perTelefono,
        date: ISOtoOnlyDate(data.perFechaNac),
      };
    },
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordButton = (
    <button onClick={togglePassword} type="button">
      {showPassword ? (
        <VisibilityIcon style={{ fontSize: "24px" }} />
      ) : (
        <VisibilityOffIcon style={{ fontSize: "24px" }} />
      )}
    </button>
  );

  const onSuccess = async (data) => {
    const { name, lastname, date, phone, email, password } = data;
    if (!email || !password || !name || !lastname || !date || !phone) {
      toast.warn("Revisa bien tus datos e intenta de nuevo", {
        toastId: "warning",
      });
    }
    const response = await updateUser(
      name,
      lastname,
      date,
      phone,
      email,
      password,
      token,
    );
    if (response)
      toast.success("Actualizado correctamente", { toastId: "success" });
    else toast.warn("Ups! Usuario no actualizado", { toastId: "warn" });
  };
  const onFail = () => {
    toast.warn("Revisa bien tus datos e intenta de nuevo", {
      toastId: "warning",
    });
  };

  return (
    <section className={`${className} w-full flex justify-center items-center`}>
      <Form
        className={
          "flex flex-col items-start font-inter md:w-[85%] md:px-0 sm:px-12 px-5 mt-4"
        }
        onSubmit={handleSubmit(onSuccess, onFail)}
      >
        <div className="w-[95%] flex flex-col items-start gap-3">
          {/* same row inputs for name and lastname */}
          <div className="w-full flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex flex-col gap-3 w-full">
              <label
                htmlFor="name"
                className="font-semibold text-lg lg:text-xl"
              >
                Nombres
                <InputForm
                  id={"name"}
                  name={"name"}
                  aria-invalid={errors.name ? "true" : "false"}
                  innerRef={{
                    ...register("name", {
                      required: true,
                      pattern: /^[A-Za-z\s]*$/,
                      // value: user ? user.perNombres : "",
                    }),
                  }}
                  validation={errors.name}
                  placeholder={"Jhon Player"}
                  icon={
                    <PermIdentityOutlinedIcon style={{ fontSize: "24px" }} />
                  }
                  className={"flex-row-reverse mt-1"}
                />
              </label>

              {errors.name?.type === "required" && (
                <ErrorMessage>
                  {" "}
                  <span className="font-medium">Nota: </span>{" "}
                  {ErrorMessages.require}{" "}
                </ErrorMessage>
              )}
              {errors.name?.type === "pattern" && (
                <ErrorMessage>
                  {" "}
                  <span className="font-medium">Nota: </span>{" "}
                  {ErrorMessages.onlyString}{" "}
                </ErrorMessage>
              )}
            </div>

            <div className="w-full flex flex-col gap-3">
              <label
                htmlFor="lastname"
                className="font-semibold text-lg lg:text-xl"
              >
                Apellidos
                <InputForm
                  id={"lastname"}
                  name={"lastname"}
                  aria-invalid={errors.lastname ? "true" : "false"}
                  innerRef={{
                    ...register("lastname", {
                      required: true,
                      pattern: /^[A-Za-z\s]*$/,
                    }),
                  }}
                  validation={errors.lastname}
                  placeholder={"Peters Holder"}
                  icon={
                    <PermIdentityOutlinedIcon style={{ fontSize: "24px" }} />
                  }
                  className={"flex-row-reverse mt-1"}
                />
              </label>
              {errors.lastname?.type === "required" && (
                <ErrorMessage>
                  {" "}
                  <span className="font-medium">Nota: </span>{" "}
                  {ErrorMessages.require}{" "}
                </ErrorMessage>
              )}
              {errors.lastname?.type === "pattern" && (
                <ErrorMessage>
                  {" "}
                  <span className="font-medium">Nota: </span>{" "}
                  {ErrorMessages.onlyString}{" "}
                </ErrorMessage>
              )}
            </div>
          </div>
          {/* same row inputs for date birth and phone number */}
          <div className="w-full flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex flex-col gap-3 w-full">
              <label
                htmlFor="date"
                className="font-semibold text-lg lg:text-xl"
              >
                Fecha de nacimiento
                <InputForm
                  id={"date"}
                  name={"date"}
                  aria-invalid={errors.date ? "true" : "false"}
                  innerRef={{ ...register("date", { required: true }) }}
                  validation={errors.date}
                  placeholder={""}
                  type={"date"}
                  className={"flex-row-reverse mt-1"}
                />
              </label>
              {errors.date?.type === "required" && (
                <ErrorMessage>
                  {" "}
                  <span className="font-medium">Nota: </span>{" "}
                  {ErrorMessages.require}{" "}
                </ErrorMessage>
              )}
            </div>

            <div className="w-full flex flex-col gap-3">
              <label
                htmlFor="phone"
                className="font-semibold text-lg lg:text-xl"
              >
                Teléfono
                <InputForm
                  id={"phone"}
                  name={"phone"}
                  aria-invalid={errors.phone ? "true" : "false"}
                  innerRef={{
                    ...register("phone", {
                      required: true,
                      pattern: /^[726][0-9]{7}$/,
                    }),
                  }}
                  validation={errors.phone}
                  placeholder={"7091 0612"}
                  icon={<LocalPhoneIcon style={{ fontSize: "24px" }} />}
                  className={"flex-row-reverse mt-1"}
                />
              </label>
              {errors.phone?.type === "required" && (
                <ErrorMessage>
                  {" "}
                  <span className="font-medium">Nota: </span>{" "}
                  {ErrorMessages.require}{" "}
                </ErrorMessage>
              )}
              {errors.phone?.type === "pattern" && (
                <ErrorMessage>
                  {" "}
                  <span className="font-medium">Nota: </span>{" "}
                  {ErrorMessages.phoneNumber}{" "}
                </ErrorMessage>
              )}
            </div>
          </div>
          <label
            htmlFor="email"
            className="font-semibold text-lg lg:text-xl w-full"
          >
            Correo
            <InputForm
              id={"email"}
              name={"email"}
              type={"text"}
              aria-invalid={errors.email ? "true" : "false"}
              innerRef={{
                ...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                }),
              }}
              validation={errors.email}
              placeholder={"lovetenis@netpoint.com"}
              className={"flex-row-reverse mt-1 w-full"}
              icon={<AlternateEmailIcon />}
            />
          </label>
          {errors.email?.type === "required" && (
            <ErrorMessage>
              {" "}
              <span className="font-medium">Nota: </span>{" "}
              {ErrorMessages.require}{" "}
            </ErrorMessage>
          )}
          {errors.email?.type === "pattern" && (
            <ErrorMessage>
              {" "}
              <span className="font-medium">Nota: </span>{" "}
              {ErrorMessages.validateEmail}{" "}
            </ErrorMessage>
          )}
          <label
            htmlFor="password"
            className="font-semibold text-lg lg:text-xl w-full"
          >
            Contraseña
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
              className={"mt-1"}
            />
          </label>
          {errors.password?.type === "required" && (
            <ErrorMessage>
              {" "}
              <span className="font-medium">Nota: </span>{" "}
              {ErrorMessages.require}{" "}
            </ErrorMessage>
          )}
        </div>

        <BorderButton
          className=" flex flex-row self-center items-center justify-around gap-6 font-bold text-black bg-pure-white shadow-rounded-button-yellow border border-black
                    mt-2 py-1 px-2 text-sm
                    sm:p-2 sm:px-4
                    md:text-base
                    lg:mt-8 lg:py-3 lg:px-8 lg:text-lg"
        >
          <p className="uppercase">Actualizar</p>
          <EmojiPeopleIcon />
        </BorderButton>
      </Form>
    </section>
  );
};

export default UserUpdation;
