import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";
import LandingContainer from "../component/Home/LandingContainer/LandingContainer";
import ServicioSection from "../component/Home/ServicioSection/ServiciosContainer";
import ClasesSection from "../component/Home/ClasesSection/ClasesSection";
import CourtSection from "../component/Home/CourtSection/CourtSection";
import PromoSection from "../component/Home/PromoSection/PromoSection";
import PhraseSection from "../component/Home/PhraseSection/PhraseSection";

import Loader from "../component/Loader/Loader";

import { useState } from "react";


const Home = () => {

    const [solid, isSolid] = useState(false);


    //scrolling event 
    const handleScroll = () => {
        if(window.scrollY > 0) isSolid(true);
        else isSolid(false);
    }

    window.addEventListener("scroll", handleScroll);
    return(
        <div className=" flex flex-col">
            <Loader />
            <Header solid={solid} />
            <LandingContainer />
            <ServicioSection />
            <ClasesSection />
            <CourtSection />
            <PromoSection />
            <PhraseSection />
            <Footer />
        </div>
    );
}

export default Home;