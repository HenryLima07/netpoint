import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Tiktok } from "react-bootstrap-icons";
import { WhatsApp } from "@mui/icons-material";
import { Mail } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="">
      <article className="flex flex-col sm:flex-row gap-6 items-start md:items-center justify-around bg-mustard-yellow text-dark-gray p-8 font-inter">
        <div className=" flex flex-col lg:flex-row gap-6 lg:gap-14 sm:w-1/2 lg:w-auto">
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-bebas tracking-wide text-2xl md:text-4xl py-1">
              Soporte online
            </h3>
            <ul className="flex flex-row gap-3 md:gap-8">
              <li>
                <a
                  target="_blank"
                  href={
                    "https://api.whatsapp.com/message/USWJBQ2THPYVN1?autoload=1&app_absent=0"
                  }
                >
                  <WhatsApp style={{ fontSize: "38px" }} />
                </a>
              </li>
              <li>
                <a target="_blank" href={"mailto:netpoint.tenis@gmail.com"}>
                  <Mail style={{ fontSize: "38px" }} />
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-bebas tracking-wide text-2xl md:text-4xl py-1">
              Redes sociales
            </h3>
            <ul className="flex flex-row gap-3 md:gap-8">
              <li>
                <a
                  target="_blank"
                  href={"https://www.facebook.com/netpoint.tenis/?locale=es_LA"}
                >
                  <FacebookRoundedIcon style={{ fontSize: "38px" }} />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href={"https://www.instagram.com/netpointteniselsalvador/"}
                >
                  <InstagramIcon style={{ fontSize: "38px" }} />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href={"https://www.facebook.com/netpoint.tenis/?locale=es_LA"}
                >
                  <Tiktok style={{ fontSize: "38px" }} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="uppercase md:w-1/2 lg:w-1/2 ">
          <h3 className="font-bebas tracking-wide text-2xl md:text-4xl py-2">
            Más información
          </h3>
          <ul className="flex flex-col md:flex-row flex-wrap gap-4 text-sm sm:text-lg md:text-xl">
            <li>
              <HashLink smooth to={"/#home"}>
                Inicio
              </HashLink>
            </li>
            <li>
              <Link to={"/cancha"}>Cancha</Link>
            </li>
            <li>
              <HashLink smooth to={"/#clases"}>
                Clases
              </HashLink>
            </li>
            <li>
              <HashLink smooth to={"/#promo"}>
                Promos
              </HashLink>
            </li>
            <li>
              <Link to={"/"}>Nosotros</Link>
            </li>
            <li>
              <Link to={"/"}>Políticas de seguridad</Link>
            </li>
          </ul>
        </div>
      </article>
      <article className="font-bebas text-lg md:text-2xl p-4 text-center text-pure-white tracking-wide bg-black">
        <p>COPYRIGHT © 2023, Netpoint. </p>
      </article>
    </footer>
  );
};

export default Footer;
