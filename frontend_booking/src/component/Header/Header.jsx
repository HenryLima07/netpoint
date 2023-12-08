import React, { useState } from "react";

import { Link } from "react-router-dom";

import MenuContainer from "./MenuContainer/MenuContainer";
import AsideMenu from "./AsideMenu/AsideMenu.component";
import ShoppingCartComponent from "../ShoppingCart/ShoppingCart.component";

import Logo from "../../assets/img/logo.png";

import { UseAuthContext } from "../../context/authContext";

const Header = ({ solid = true }) => {
  const { logout } = UseAuthContext();

  //toggle shopping cart
  const [toggleShoppingCart, setToggleShoppingCart] = useState(false);

  const shoppingCartHandler = (state) => {
    setToggleShoppingCart(state);
  };

  return (
    <header
      className={`w-full max-w-[1920px] flex flex-row justify-between items-center font-bebas fixed top-0 z-10 ${
        solid ? "bg-pure-white" : ""
      }
            h-12 p-1
            md:h-28 md:p-4
            text-3xl
        `}
    >
      <div className="max-w-[10rem] min-w-[7rem] pl-4">
        <Link to="/">
          <img src={Logo} alt="Netpoint logo" className="w-full" />
        </Link>
      </div>

      {/* (screenWidth.current > 758) ?  */}
      <MenuContainer
        solid={solid}
        logoutEvent={logout}
        shoppingCartHandler={shoppingCartHandler}
      />

      <AsideMenu solid={solid} shoppingCartHandler={shoppingCartHandler} />

      <ShoppingCartComponent
        toggleShoppingCart={toggleShoppingCart}
        shoppingCartHandler={shoppingCartHandler}
      />
    </header>
  );
};

export default Header;
