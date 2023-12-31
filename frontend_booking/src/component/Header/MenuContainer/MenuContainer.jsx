import NoBorderButton from "../../Buttons/NoBorderButton/NoBorderButton";
import LinkContainer from "../LinkContainer/LinkContainer";
import HashLinkContainer from "../LinkContainer/HashLink.container";

import { UseAuthContext } from "../../../context/authContext";

import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { ArrowRightShort } from "react-bootstrap-icons";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import profilepic from "../../../assets/img/profile.jpg";

const NoUserButtons = ({ solid = false }) => {
  return (
    <div className="flex flex-row items-center justify-around min-w-1/4">
      <LinkContainer to={"/singin"} classLink={"text-mustard-yellow mr-6"}>
        iniciar sesion
      </LinkContainer>

      <NoBorderButton
        className={`flex flex-row items-center pl-5 pr-2 py-2 ${
          solid
            ? "bg-dark-gray text-pure-white"
            : "bg-pure-white text-dark-gray"
        }
                 md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl`}
      >
        <Link to={"/singup"}>Registrarse</Link>
        <ArrowRightShort className="ml-2" />
      </NoBorderButton>
    </div>
  );
};

const UserButtons = ({ itemsCart, ...props }) => {
  return (
    <div className="flex flex-row items-center justify-end gap-4 lg:gap-8 w-full min-w-1/4 hover:cursor-pointer">
      <button
        onClick={() => props.shoppingCartHandler(true)}
        className="bg-pure-white px-2 py-1 border-2 border-black rounded-lg w-min relative"
      >
        <ShoppingCartIcon style={{ fontSize: "24px" }} />
        {itemsCart > 0 ? (
          <div className=" rounded-full p-0 w-[22px] h-[22px] bg-light-gray text-pure-white text-[10px] font-semibold absolute top-[20px] right-[2px] ">
            <p className=" relative -top-[5px]">{itemsCart}</p>
          </div>
        ) : (
          <></>
        )}
      </button>
      <div>
        <Link to={"/user"}>
          <img
            src={profilepic}
            alt="user image profile"
            className="rounded-[50%] w-[45px] lg:w-[55px] min-w-[40px] lg:h-[55px] h-[45px] min-h-[40px] border-2 border-black"
          />
        </Link>
      </div>
    </div>
  );
};

const MenuContainer = ({ solid = false, ...props }) => {
  const { user, itemsCart } = UseAuthContext();

  return (
    <article className="hidden md:flex flex-row justify-around items-center w-full lg:w-4/5 xl:w-3/4">
      <ul
        className={`flex flex-row ${
          solid ? "text-dark-gray" : "text-pure-white"
        }`}
      >
        <HashLinkContainer to={"/#home"}>inicio</HashLinkContainer>
        <LinkContainer to={"/cancha"}>canchas</LinkContainer>
        <HashLinkContainer to={"/#clases"}>clases</HashLinkContainer>
        <HashLinkContainer to={"/#promo"}>promos</HashLinkContainer>

        {!user ? (
          <></>
        ) : (
          <LinkContainer
            to={"/user"}
            classLink={" md:w-[5.25rem] lg:w-[5.2rem] xl:w-[8.05rem]"}
          >
            Tu perfil
          </LinkContainer>
        )}
        <LinkContainer to={"/"}>nosotros</LinkContainer>
      </ul>

      <div className="w-full flex items-center justify-center">
        {!user ? (
          <NoUserButtons solid={solid} />
        ) : (
          <UserButtons itemsCart={itemsCart} {...props} />
        )}
      </div>
    </article>
  );
};

export default MenuContainer;
