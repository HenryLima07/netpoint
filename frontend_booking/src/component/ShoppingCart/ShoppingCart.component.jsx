import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { UseAuthContext } from "../../context/authContext";
import { BookingFormService } from "../CanchaInd/CanchaInd.service";
import { ISOtoOnlyDate, OverlapsHandler } from "../../utils/utils";
import { ShoppingCartService } from "./ShoppingCart.service";

import ShoppingCartItemComponent from "./ShoppingCartItem/ShoppingCartItem.component";
import NoBorderButton from "../Buttons/NoBorderButton/NoBorderButton";

import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import moment from "moment";

const ShoppingCartComponent = ({
  className,
  solid = false,
  toggleShoppingCart = false,
  shoppingCartHandler,
}) => {
  const { getElements, removeElement, clearShoppingCart, addElement } =
    ShoppingCartService();
  /*Handler to save and verify in each item*/
  const { SelectAllBookingsOnDate, CreateBooking } = BookingFormService();

  const { user, token } = UseAuthContext();
  const [shoppingCartData, setShoppingCartData] = useState([]);

  //state to force items fetch they own day activities and compare
  const [fetchNow, setFecthNow] = useState(false);

  //state to show item with overlap error
  const [isOverlapping, setIsOverlapping] = useState(-1);

  const handleSetFetchNow = () => setFecthNow(!fetchNow);

  useEffect(() => {
    handleShowItems();
  }, [toggleShoppingCart]);

  const onRemoveItem = (id) => {
    removeElement(id);
    const aux = shoppingCartData.filter((item, index) => index != id) || [];
    setShoppingCartData(aux);
    setIsOverlapping(-1);
    handleShowItems();
  };

  const handleShowItems = () => {
    const localShopping = getElements();
    if (localShopping == null || localShopping.length < 0) return;
    setShoppingCartData([]);
    setShoppingCartData(localShopping);
  };

  const shoppingItems = shoppingCartData.map((item) => {
    return (
      <ShoppingCartItemComponent
        item={item}
        key={item._id}
        keyRef={item._id}
        onRemoveItem={() => onRemoveItem(item._id)}
        fetchNow={fetchNow}
        isOverlapping={isOverlapping}
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

    const auxCartData = shoppingCartData;
    auxCartData.forEach((item, index) => {
      Booking(item, index);
    });
  };

  const Booking = async (item, index) => {
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

    const response = await CreateBooking(
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
    handleShowItems();
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
        {shoppingCartData.length > 0 ? shoppingItems : <></>}
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
