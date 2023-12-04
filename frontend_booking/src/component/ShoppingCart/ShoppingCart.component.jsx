import { Link } from "react-router-dom";
import { useEffect, useState, useId } from "react";

import { UseAuthContext } from "../../context/authContext";
import { BookingFormService } from "../CanchaInd/CanchaInd.service";
import { ISOtoOnlyDate, OverlapsHandler } from "../../utils/utils";
import {
  ShoppingCartFieldService,
  ShoppingCartPromoService,
} from "./ShoppingCart.service";

import ShoppingCartItemFieldComponent from "./ShoppingCartItem/ShoppingCartItemField.component";
import ShoppingCartItemPromoComponent from "./ShoppingCartItem/ShoppingCartItemPromo.component";
import NoBorderButton from "../Buttons/NoBorderButton/NoBorderButton";

import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import moment from "moment";
import { BookingPromoServices } from "../Home/PromoSection/PromoService.service";

const ShoppingCartComponent = ({
  className,
  solid = false,
  toggleShoppingCart = false,
  shoppingCartHandler,
}) => {
  //field services
  const {
    getFieldElements,
    removeFieldElement,
    clearFieldShoppingCart,
    addFieldElement,
  } = ShoppingCartFieldService();

  //promo services
  const {
    getPromoElements,
    removePromoElement,
    clearPromoShoppingCart,
    addPromoElement,
  } = ShoppingCartPromoService();
  /*Handler to save and verify in each item*/
  const { CreateBooking } = BookingFormService();
  const { CreatePromoBooking } = BookingPromoServices();

  const { user, token } = UseAuthContext();
  const [shoppingCartFieldData, setShoppingCartFieldData] = useState([]);
  const [shoppingCartPromoData, setShoppingCartPromoData] = useState([]);

  //state to force items fetch they own day activities and compare
  const [fetchNow, setFecthNow] = useState(false);

  //state to show item with overlap error
  const [isOverlapping, setIsOverlapping] = useState(-1);

  const handleSetFetchNow = () => setFecthNow(!fetchNow);

  useEffect(() => {
    handleShowFieldItems();
    handleShowPromoItems();
  }, [toggleShoppingCart]);

  //remove field items
  const onRemoveFieldItem = (id) => {
    removeFieldElement(id);
    const aux =
      shoppingCartFieldData.filter((item, index) => index != id) || [];
    setShoppingCartFieldData(aux);
    setIsOverlapping(-1);
    handleShowFieldItems();
  };

  //remove promo items
  const onRemovePromoItem = (id) => {
    removePromoElement(id);
    const aux =
      shoppingCartPromoData.filter((item, index) => index != id) || [];
    setShoppingCartPromoData(aux);
    handleShowPromoItems();
  };

  //handler for field items show
  const handleShowFieldItems = () => {
    const localShopping = getFieldElements();
    if (localShopping == null || localShopping.length < 0) return;
    setShoppingCartFieldData([]);
    setShoppingCartFieldData(localShopping);
  };

  //handler for promo items show
  const handleShowPromoItems = () => {
    const localShopping = getPromoElements();
    if (localShopping == null || localShopping.length < 0) return;
    setShoppingCartPromoData([]);
    setShoppingCartPromoData(localShopping);
  };

  const shoppingFieldItems = shoppingCartFieldData.map((item) => {
    return (
      <ShoppingCartItemFieldComponent
        item={item}
        key={item._id}
        keyRef={item._id}
        onRemoveFieldItem={() => onRemoveFieldItem(item._id)}
        fetchNow={fetchNow}
        isOverlapping={isOverlapping}
      />
    );
  });
  const shoppingPromoItems = shoppingCartPromoData.map((item) => {
    return (
      <ShoppingCartItemPromoComponent
        item={item}
        key={item._id}
        onRemoveItem={() => onRemovePromoItem(item._id)}
        fetchNow={fetchNow}
      />
    );
  });

  const handlerComprar = () => {
    handleSetFetchNow();
    HandleBooking();
  };

  //state to control overlapping
  const HandleBooking = () => {
    //check token users
    if (!token) {
      toast.warn("Se necesita iniciar sesión primero", {
        toastId: "warning",
      });
      return;
    }
    const auxCartPromoData = shoppingCartPromoData;
    console.log(auxCartPromoData);
    auxCartPromoData.forEach((item, index) => {
      PromoBooking(item, index);
    });
    const auxCartFieldData = shoppingCartFieldData;
    auxCartFieldData.forEach((item, index) => {
      FieldBooking(item, index);
    });
  };

  //handler promo booking
  const PromoBooking = async (item, index) => {
    //get al item information
    const {
      _id,
      paqTipo,
      paqCantidad,
      paqFechaDesde,
      paqFechaHasta,
      paqLinkPago,
      paqNombre,
      paqPrecio,
      id,
    } = item;
    const paqEstado = "PEN";
    const restrinctions = "Ninungo";
    const paqDescuento = 60.5;
    const response = await CreatePromoBooking(
      token,
      id,
      paqEstado,
      restrinctions,
      paqCantidad,
      paqPrecio,
      paqDescuento,
    );
    if (response.status == 200) onRemovePromoItem(_id);
    handleShowFieldItems();
  };
  //handler field booking
  const FieldBooking = async (item, index) => {
    //get al item information
    const {
      _id,
      bookingType,
      date,
      startTime,
      endTime,
      comment,
      rscTipoDePago,
      canchaId,
      estado,
    } = item;

    const response = await FieldBooking(
      token,
      bookingType,
      new Date(date).toISOString(),
      startTime,
      endTime,
      comment,
      rscTipoDePago,
      canchaId,
      estado,
    );
    if (response == 422) setIsOverlapping(index);
    else if (response.status == 200) onRemoveItem(_id);
    handleShowFieldItems();
  };

  return (
    <aside
      className={`font-inter text-dark-gray bg-pure-white h-full fixed flex flex-col rounded-bl-2xl rounded-tl-2xl py-6 px-2 md:p-6 pr-2 transition-all ease-linear duration-500 min-w-80 w-3/4 md:w-2/3 lg:w-2/4 2xl:w-2/5 -right-[100rem] top-0 bottom-0 shadow-md shadow-black z-20 ${
        toggleShoppingCart ? "-translate-x-[100rem]" : " invisible"
      }`}
    >
      <div className="flex flex-col mb-6">
        <div className="flex flex-row justify-end items-center">
          <button
            className="flex flex-col items-center px-2"
            onClick={() => {
              shoppingCartHandler(false);
            }}
          >
            <CloseIcon style={{ fontSize: "24px" }} />
          </button>
        </div>
      </div>

      <div className="w-5/6 min-h-[33rem] md:min-h-[45rem] flex flex-col gap-9 md:gap-5 overflow-y-scroll overflow-x-hidden items-center self-center">
        {shoppingCartPromoData.length > 0 ? shoppingPromoItems : <></>}
        {shoppingCartFieldData.length > 0 ? shoppingFieldItems : <></>}
      </div>

      <div className="self-center h-full flex justify-end font-bebas">
        <NoBorderButton
          handleClick={handlerComprar}
          className={` justify-self-center self-center flex flex-row items-center gap-3 pl-6 pr-3 py-3 bg-dark-gray text-pure-white text-base md:pl-7 md:pr-4 md:py-4 md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl`}
        >
          Comprar ahora
          <ShoppingCartIcon style={{ fontSize: "24px" }} />
        </NoBorderButton>
      </div>
    </aside>
  );
};

export default ShoppingCartComponent;
