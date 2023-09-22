import NoBorderButton from "../../Buttons/NoBorderButton/NoBorderButton";
import LinkContainer from "../LinkContainer/LinkContainer";

import {ArrowRightShort} from "react-bootstrap-icons"


const MenuContainer = ({solid = false})=>{
    return(
        <article className="hidden md:flex flex-row w-full justify-around items-center w-full lg:w-4/5 xl:w-3/4">

            <ul className={`flex flex-row ${solid ? "text-dark-gray": "text-pure-white"}`}>
                <LinkContainer to={"/"}>inicio</LinkContainer>
                <LinkContainer to={"/"}>cancha</LinkContainer>
                <LinkContainer to={"/"}>clases</LinkContainer>
                <LinkContainer to={"/"}>promos</LinkContainer>
                <LinkContainer to={"/"}>reservar</LinkContainer>
                <LinkContainer to={"/"}>nosotros</LinkContainer>
            </ul>
    
            <div className="flex flex-row items-center justify-around min-w-1/4">

                <LinkContainer to={"/"} classLink={"text-mustard-yellow mr-6"}>iniciar sesion</LinkContainer>

                <NoBorderButton classNB={`flex flex-row items-center ${solid ? "bg-dark-gray text-pure-white" : "bg-pure-white text-dark-gray"}
                     md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl`}>
                    <p>Registrarse</p>
                    <ArrowRightShort className="ml-2"/>
                </NoBorderButton>
            </div>
        </article>
    );
}

export default MenuContainer;