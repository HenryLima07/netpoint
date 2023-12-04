import NoBurderButton from "../../Buttons/NoBorderButton/NoBorderButton";

import { useEffect } from "react";
import { UseAuthContext } from "../../../context/authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserDescription = ({ className, ...props }) => {
  const { user, logout, setFieldLength, setPromoLength } = UseAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);
  return (
    <article
      className={` flex flex-col pt-4 sm:m-4 md:m-7 sm:flex-row md:flex-col sm:items-center ${className}`}
    >
      <div className=" flex flex-col items-center ">
        <div
          className={`bg-[url('./img/formback.jpg')] bg-center bg-cover bg-no-repeat min-w-[180px] min-h-[180px] rounded-[100%] border border-dark-gray 2xl:w-96 2xl:h-[23rem] xl:w-80 xl:h-[19rem] lg:w-64 lg:h-60 sm:w-60 sm:h-50 w-60 h-56`}
        ></div>
      </div>
      <div className="border-b sm:border-0 md:border-b border-light-gray font-inter sm:px-4 md:px-8 py-3">
        <h2 className="font-bold xl:text-2xl md:text-xl text-lg ">
          {user ? user.data.perNombres : ""}
        </h2>
        <h6 className="text-sm md:text-base xl:text-lg">
          ¡Bienvenido de nuevo! Listo para la emoción del tenis en tu cuenta.
        </h6>
        <NoBurderButton
          onClick={() => {
            logout();

            localStorage.clear();
            setFieldLength(0);
            setPromoLength(0);
            navigate("/");
          }}
          className={
            " p-2 my-4 bg-[#DCDCDC] w-full text-black border border-light-gray text-sm md:text-base xl:text-lg font-medium "
          }
        >
          Cerrar sesión
        </NoBurderButton>
      </div>
    </article>
  );
};

export default UserDescription;
