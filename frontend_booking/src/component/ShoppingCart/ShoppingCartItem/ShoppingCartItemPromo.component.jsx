import ErrorMessage from "../../Form/ErrorMessage/ErrorMessage";

import CloseIcon from "@mui/icons-material/Close";

import { ISOtoOnlyDate } from "../../../utils/utils";
import ErrorMessages from "../../../data/data";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ItemInformation = ({ item, className }) => {
  return (
    <article
      className={` flex flex-col justify-center font-inter text-dark-gray ${className}`}
    >
      <h4 className=" font-semibold text-base md:text-2xl">{item.paqNombre}</h4>
      <p className=" font-light text-sm md:text-lg md:-mt-1">
        Tipo:
        <span className="font-semibold text-sm md:text-base">
          {" " + item.paqTipo}
        </span>
      </p>
      <p className=" font-light text-sm md:text-lg md:-mt-1">
        Fecha Desde:
        <span className="font-semibold text-sm md:text-base">
          {" " + ISOtoOnlyDate(item.paqFechaDesde)}
        </span>
      </p>
      <p className=" font-light text-sm md:text-lg md:-mt-1">
        Fecha Hasta:
        <span className="font-semibold text-sm md:text-base">
          {" " + ISOtoOnlyDate(item.paqFechaHasta)}
        </span>
      </p>
      <h6 className=" font-light text-sm md:text-lg md:-mt-1">
        Costo:
        <span className="font-semibold text-sm md:text-base">
          ${item.paqPrecio}
        </span>{" "}
      </h6>
    </article>
  );
};

const ShoppingCartItemPromoComponent = ({ item, onRemoveItem }) => {
  return (
    <>
      <div className="rounded-lg shadow-cards max-h-40 h-40 min-h-[8rem] md:h-52 min-w-[175px] w-full hover:scale-[1.02] transition-all duration-500 ease-in-out">
        <div className="flex flex-col md:flex-row w-full h-full relative">
          <button
            className="flex flex-col items-center p-2 absolute top-0 right-0 bg-pure-white rounded-bl-lg"
            onClick={() => onRemoveItem()}
          >
            <CloseIcon style={{ fontSize: "24px" }} />
          </button>
          <ItemInformation
            className={" py-2 px-4 md:px-5 md:py-4"}
            item={item}
          />
        </div>
      </div>
    </>
  );
};

export default ShoppingCartItemPromoComponent;
