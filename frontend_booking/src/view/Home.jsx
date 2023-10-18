import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";
import LandingContainer from "../component/Home/LandingContainer/LandingContainer";
import ServicioSection from "../component/Home/ServicioSection/ServiciosContainer";
import ClasesSection from "../component/Home/ClasesSection/ClasesSection";
import CourtSection from "../component/Home/CourtSection/CourtSection";
import PromoSection from "../component/Home/PromoSection/PromoSection";
import PhraseSection from "../component/Home/PhraseSection/PhraseSection";

import Loader from "../component/Loader/Loader";

import { HomeService } from "../component/Home/Home.service";

import { useEffect, useState } from "react";


const Home = () => {
    const [solid, isSolid] = useState(false);

    //fetch promotions
    const { fetchPromos } = HomeService();
    const [ promoData, setPromoData ] = useState([]);
    useEffect(() => {
        fetchPromotionsHandler();
    }, []);

    const fetchPromotionsHandler = async()=>{
        const { data } = await fetchPromos();
        if(!data) return;

        setPromoData(data);  
    }


    //scrolling event 
    const handleScroll = () => {
        if(window.scrollY > 0) isSolid(true);
        else isSolid(false);
    }

    window.addEventListener("scroll", handleScroll);
    return(
        <main className=" flex flex-col max-w-[1920px]">
            <Loader />
            <Header solid={solid} />
            <LandingContainer />
            <ServicioSection />
            <ClasesSection />
            <CourtSection />
            <PromoSection promoData = {promoData} />
            <PhraseSection />
            <Footer />
        </main>
    );
}

export default Home;