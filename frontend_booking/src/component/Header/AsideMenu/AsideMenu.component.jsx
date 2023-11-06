import { Link } from "react-router-dom";
import { useState } from "react";

import { UseAuthContext } from "../../../context/authContext";

import usericon from "../../../assets/img/profile.jpg";
import aside from "../../../assets/img/aside.png";

import CloseIcon from "@mui/icons-material/Close";
import { HashLink } from "react-router-hash-link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Hambuger = ({
  className,
  solid,
  setToogleAsideMenuHandler,
  shoppingCartHandler,
}) => {
  return (
    <div
      id="hamburger"
      className={`flex flex-row gap-2 z-10 md:hidden ${className}`}
    >
      <div className="flex flex-row items-center justify-end w-full min-w-1/4 hover:cursor-pointer">
        <button
          onClick={() => shoppingCartHandler(true)}
          className="bg-pure-white px-2 py-[1px] border-2 border-black rounded-lg w-min"
        >
          <ShoppingCartIcon style={{ fontSize: "18px" }} />
        </button>
      </div>

      <a className="flex flex-row w-full p-4 items-center">
        <div
          className="space-y-1.5 cursor-pointer"
          onClick={() => setToogleAsideMenuHandler(true)}
        >
          <span
            className={`block w-8 h-1 rounded-lg ${
              solid ? "bg-black" : "bg-pure-white"
            }`}
          ></span>
          <span
            className={`block w-8 h-1 rounded-lg ${
              solid ? "bg-black" : "bg-pure-white"
            }`}
          ></span>
          <span
            className={`block w-8 h-1 rounded-lg ${
              solid ? "bg-black" : "bg-pure-white"
            }`}
          ></span>
        </div>
      </a>
    </div>
  );
};

const MenuItemLink = ({ to, text, icon }) => {
  return (
    <Link to={to} className="m-3 capitalize flex flex-row">
      {" "}
      {icon} <li>{text}</li>
    </Link>
  );
};

const MenuItemHash = ({ to, text, icon }) => {
  return (
    <HashLink smooth to={to} className="m-3 capitalize flex flex-row">
      {" "}
      {icon} <li>{text}</li>
    </HashLink>
  );
};

const Menu = () => {
  const { user, logout } = UseAuthContext();

  return (
    <ul className="bg-white flex flex-col items-start text-lg">
      {user ? (
        <>
          <hr className="h-[1px] w-full bg-light-gray " />
          <MenuItemLink to={"/user"} text={"tu perfil"} />
        </>
      ) : (
        <></>
      )}
      <hr className="h-[1px] w-full bg-light-gray " />
      <MenuItemHash to={"/#home"} text={"inicio"} />
      <MenuItemLink to={"/cancha"} text={"canchas"} />
      <MenuItemHash to={"/#clases"} text={"clases"} />
      <MenuItemHash to={"/#promos"} text={"promos"} />
      <MenuItemLink to={"/"} text={"nosotros"} />

      {user ? (
        <>
          <hr className="h-[1px] w-full bg-light-gray " />
          <div className="m-3 capitalize flex flex-row" onClick={logout}>
            <li>cerrar sesión</li>
          </div>
        </>
      ) : (
        <>
          <hr className="h-[1px] w-full bg-light-gray " />
          <MenuItemLink to={"/singin"} text={"iniciar sesión"} />
          <MenuItemLink to={"/singup"} text={"registrarse"} />
        </>
      )}
    </ul>
  );
};

const AsideMenu = ({ className, solid = false, shoppingCartHandler }) => {
  const { user } = UseAuthContext();

  const [toogleAsideMenu, setToogleAsideMenu] = useState(false);

  //function controls toogle aside menu
  const setToogleAsideMenuHandler = (setState) => {
    setToogleAsideMenu(setState);
  };
  return (
    <>
      <Hambuger
        className={className}
        solid={solid}
        setToogleAsideMenuHandler={setToogleAsideMenuHandler}
        shoppingCartHandler={shoppingCartHandler}
      />
      {/* set class to toogle it */}
      <aside
        className={` font-inter text-dark-gray bg-pure-white h-full fixed flex flex-col rounded-bl-2xl rounded-tl-2xl p-6 pr-2 transition-all duration-300 w-80 -right-80 top-0 bottom-0 shadow-md shadow-black z-20 ${
          toogleAsideMenu ? "-translate-x-80" : " invisible"
        }`}
      >
        <div className="flex flex-col mb-6">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-4">
              {user ? (
                <Link to={"/user"}>
                  <img
                    src={usericon}
                    alt="user icon"
                    className="w-[40px] h-[41px] rounded-full border border-black"
                  />
                </Link>
              ) : (
                <></>
              )}
              <div>
                <h6 className="font-light text-xl">Hola de nuevo</h6>
                {user ? (
                  <p className="font-medium text-base -mt-1">
                    {user.data.perNombres}
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div
              className="w-1/4 flex flex-col items-center cursor-pointer"
              onClick={() => setToogleAsideMenuHandler(false)}
            >
              <CloseIcon style={{ fontSize: "24px" }} />
            </div>
          </div>
        </div>

        <Menu />

        <img
          src={aside}
          alt="image person aside"
          className="w-2/6 m-2 self-center"
        />
        <h2 className=" self-center justify-self-end font-bebas text-3xl text-black">
          netpoint
        </h2>
      </aside>
    </>
  );
};

export default AsideMenu;
