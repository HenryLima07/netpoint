import axios from "axios";
import React, { useEffect, useState } from "react";
import { Await } from "react-router-dom";
import { toast } from "react-toastify";
import { UseConfiguration } from "./configContext";
import { Logout } from "@mui/icons-material";

const AuthContext = React.createContext();
const KEY = "netpoint_token";

export const AuthContextProvider = (props) => {
  //token and user states
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [promosLength, setPromoLength] = useState(
    getShoppingCartPromo().length,
  );
  const [fieldLength, setFieldLength] = useState(getFieldCartPromo().length);
  const [itemsCart, setItemsCart] = useState(null);
  const { startLoading, stopLoading } = UseConfiguration();

  const addPromoLength = () => setPromoLength(promosLength + 1);
  const removePromoLength = () => setPromoLength(promosLength - 1);
  const addFieldLength = () => setFieldLength(fieldLength + 1);
  const removeFieldLength = () => setFieldLength(fieldLength - 1);

  //check token validity
  useEffect(() => {
    const _tken = getTokenLS();
    if (_tken) {
      setToken(_tken);
    }
  }, []);

  //check user
  useEffect(() => {
    //get user information
    fetchUserData();
  }, [token]);

  useEffect(() => {
    setItemsCart(promosLength + fieldLength);
  }, [promosLength, fieldLength]);

  const fetchUserData = async () => {
    //token null check
    if (!token || token == "null") return;

    startLoading();
    try {
      const { data } = await axios.get("/own/usuario", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data);
    } catch (error) {
      console.log(error.message);
      toast.error("Error inesperado", {
        toastId: "error",
      });

      logout(false);
    } finally {
      stopLoading();
    }
  };

  const login = async (email, password) => {
    startLoading();
    try {
      const { data } = await axios.post("/user/login", {
        email,
        password,
      });

      const _tken = data.data.jwtToken;
      setToken(_tken);
      setTokenLS(_tken);

      toast.success("Inicio de sesión exitoso", {
        toastId: "success",
      });
    } catch (error) {
      //logout to prevent future errors
      logout(false);
      const { status } = error.response || { status: 500 };
      const msg = {
        400: "Datos erroneos " + error.message,
        404: "Email no registrado",
        401: "Contraseña incorrecta",
        500: "Something went wrong!",
      };
      toast.error(msg[String(status)], {
        toastId: "error",
      });
    } finally {
      stopLoading();
    }
  };

  const singUp = async (
    perNombres,
    perApellidos,
    perFechaNac,
    perTelefono,
    perEmail,
    perClave,
  ) => {
    startLoading();
    try {
      const { data } = await axios.post("/user/singin", {
        perNombres,
        perApellidos,
        perFechaNac,
        perTelefono,
        perEmail,
        perClave,
      });

      toast.success("Registro de usuario exitoso", {
        toastId: "success",
      });
    } catch (error) {
      const { status } = error.response || { status: 500 };
      const msg = {
        400: "error 400" + error.message,
        404: "error 404",
        401: "Error 401",
        500: "Something went wrong!",
      };
      toast.error(msg[String(status)], {
        toastId: "error",
      });
    } finally {
      stopLoading();
    }
  };
  //get token state
  const getToken = () => token;

  //logout
  const logout = (showToast = true) => {
    removeTokenLS();
    setTokenLS(null);
    setUser(null);
    if (showToast)
      toast.success("Sesión cerrada", {
        toastId: "success",
      });
  };

  //returning all functions of provider
  const state = {
    token,
    user,
    itemsCart,
    login,
    logout,
    getToken,
    singUp,
    addPromoLength,
    removePromoLength,
    addFieldLength,
    removeFieldLength,
    setFieldLength,
    setPromoLength,
  };

  return <AuthContext.Provider value={state} {...props} />;
};

export const UseAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (!context)
    throw new Error(
      "authContext must be call inside of authContextProvider component",
    );

  return context;
};

//token global control
const setTokenLS = (token) => localStorage.setItem(KEY, token);
const getTokenLS = () => localStorage.getItem(KEY);
const removeTokenLS = () => localStorage.removeItem(KEY);
const KEY_CANCHA = "shopppingFieldNTP";
const KEY_PROMO = "shopppingPromoNTP";
const getShoppingCartPromo = () =>
  JSON.parse(localStorage.getItem(KEY_PROMO)) || [];
const getFieldCartPromo = () =>
  JSON.parse(localStorage.getItem(KEY_CANCHA)) || [];
