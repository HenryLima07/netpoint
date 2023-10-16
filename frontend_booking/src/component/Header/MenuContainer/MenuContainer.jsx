import NoBorderButton from "../../Buttons/NoBorderButton/NoBorderButton";
import LinkContainer from "../LinkContainer/LinkContainer";

import { UseAuthContext } from "../../../context/authContext";

import { Link } from "react-router-dom";

import {ArrowRightShort} from "react-bootstrap-icons";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import profilepic from "../../../assets/img/profile.jpg"


const NoUserButtons = ({solid = false})=>{
    return(
        <div className="flex flex-row items-center justify-around min-w-1/4">
            <LinkContainer to={"/singin"} classLink={"text-mustard-yellow mr-6"}>iniciar sesion</LinkContainer>

            <NoBorderButton className={`flex flex-row items-center pl-5 pr-2 py-2 ${solid ? "bg-dark-gray text-pure-white" : "bg-pure-white text-dark-gray"}
                 md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl`}>
                <Link to={"/singup"}>Registrarse</Link>
                <ArrowRightShort className="ml-2"/>
            </NoBorderButton>
        </div>
    );
}

const UserButtons = ({...props})=>{
    return( 
        <div className="flex flex-row items-center justify-end gap-4 lg:gap-8 w-full min-w-1/4 hover:cursor-pointer">
            <Link to={"/"} className="bg-pure-white px-2 py-1 border-2 border-black rounded-lg w-min"><ShoppingCartIcon style={{fontSize: "24px"}}/></Link>
            <div onClick={props.logoutEvent}><img src={profilepic} alt="user image profile" className="rounded-[50%] w-[45px] lg:w-[55px] min-w-[40px] lg:h-[55px] h-[45px] min-h-[40px] border-2 border-black"/></div>
        </div>
     );
}

const MenuContainer = ({solid = false, ...props})=>{
    const { user } = UseAuthContext();

    return(
        <article className="hidden md:flex flex-row w-full justify-around items-center w-full lg:w-4/5 xl:w-3/4">

            <ul className={`flex flex-row ${solid ? "text-dark-gray": "text-pure-white"}`}>
                <LinkContainer to={"/"}>inicio</LinkContainer>
                <LinkContainer to={"/"}>canchas</LinkContainer>
                <LinkContainer to={"/"}>clases</LinkContainer>
                <LinkContainer to={"/"}>promos</LinkContainer>
                <LinkContainer to={"/"}>reservar</LinkContainer>
                <LinkContainer to={"/"}>nosotros</LinkContainer>
            </ul>
    
            <div className="w-full flex items-center justify-center">
                {
                    !user ? 
                        <NoUserButtons solid = {solid} />
                        :
                        <UserButtons {...props}/>
                }
            </div>
        </article>
    );
}

export default MenuContainer;