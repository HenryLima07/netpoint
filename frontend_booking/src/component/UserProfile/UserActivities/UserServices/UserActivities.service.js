import axios from "axios";

import { UseConfiguration } from "../../../../context/configContext";

const KEY = "Bearer";

export const UserActivities = () => {
  const { startLoading, stopLoading } = UseConfiguration();

  const fetchUserReservas = async (token) => {
    startLoading();
    try {
      const { data } = await axios.get(`/reserva/own`, {
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

  return {
    fetchUserReservas,
  };
};
