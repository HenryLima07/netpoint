import axios from "axios";

import { UseConfiguration } from "../../../../context/configContext";

const estate = "ACT";
const KEY = "Bearer";

export const UserGeneralProm = () => {
  const { startLoading, stopLoading } = UseConfiguration();

  const fetchPromos = async (token) => {
    startLoading();
    try {
      const { data } = await axios.get(
        `/paqueteComprado/own/historial?estado=${estate}`,
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
    fetchPromos,
  };
};
