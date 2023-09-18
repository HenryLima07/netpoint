import React, {useState} from "react";
import { Link } from "react-router-dom";

import NoBorderButton from "../Buttons/NoBorderButton/NoBorderButton";
import LinkContainer from "./LinkContainer/LinkContainer";

import Logo from "../../assets/img/logo.png";
import {ArrowRightShort} from "react-bootstrap-icons"

const Header = () => {

    const [solid, isSolid] = useState(false);

    const handleScroll = () => {
        if(window.scrollY > 0) isSolid(true);
        else isSolid(false);
    }

    window.addEventListener("scroll", handleScroll);

    return(
        <header className={`w-full flex flex-row justify-around items-center font-bebas text-3xl fixed top-0 z-10 p-4 h-28 ${solid ? "bg-pure-white" : ""}`}>
            <div className="max-w-[13rem] min-w-[7rem]">
                <Link to= "/">
                    <img src={Logo} alt="Netpoint logo" className="w-full"/>
                </Link>
            </div>
            
            <article className="flex flex-row justify-between items-center w-2/3">

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

                    <NoBorderButton classNB={` flex flex-row items-center ${solid ? "bg-dark-gray text-pure-white" : "bg-pure-white text-dark-gray"}`}>
                        <p>Registrarse</p>
                        <ArrowRightShort className="ml-2"/>
                    </NoBorderButton>
                </div>
            </article>
        </header>
    );
}

export default Header;