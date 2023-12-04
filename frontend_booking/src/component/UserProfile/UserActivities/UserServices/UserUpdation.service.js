import axios from "axios";

import { UseConfiguration } from "../../../../context/configContext";

const KEY = "Bearer";

export const UserUpdationService = () => {
  const { startLoading, stopLoading } = UseConfiguration();

  const fetchUser = async (token) => {
    startLoading();
    try {
      const { data } = await axios.get(`/own/usuario`, {
        headers: {
          Authorization: `${KEY} ${token}`,
        },
      });
      return data;
    } catch (e) {
      console.log(e.message);
    } finally {
      stopLoading();
    }
  };
  const updateUser = async (
    name,
    lastname,
    date,
    phone,
    email,
    password,
    token,
  ) => {
    startLoading();
    try {
      const { data } = await axios.patch(
        `/own/usuario`,
        {
          perNombres: name,
          perApellidos: lastname,
          perFechaNac: new Date(date).toISOString(),
          perTelefono: phone,
          perEmail: email,
          perClave: password,
        },
        {
          headers: {
            Authorization: `${KEY} ${token}`,
          },
        },
      );
      return data;
    } catch (e) {
      console.log(e.message);
    } finally {
      stopLoading();
    }
  };

  return {
    fetchUser,
    updateUser,
  };
};
