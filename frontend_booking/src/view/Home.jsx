import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";
import LandingContainer from "../component/Home/LandingContainer/LandingContainer";
import ServicioSection from "../component/Home/ServicioSection/ServiciosContainer";
import ClasesSection from "../component/Home/ClasesSection/ClasesSection";
import CourtSection from "../component/Home/CourtSection/CourtSection";
import PromoSection from "../component/Home/PromoSection/PromoSection";
import PhraseSection from "../component/Home/PhraseSection/PhraseSection";

import Loader from "../component/Loader/Loader";


const Home = () => {
    return(
        <div className=" flex flex-col">
            <Loader />
            <Header />
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