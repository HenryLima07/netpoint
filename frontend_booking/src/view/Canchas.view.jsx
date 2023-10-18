import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";
import CanchasComponent from "../component/CanchasComponent/Canchas.component";

const CanchaView = ()=>{


    return(
        <main className="w-full max-w-[1920px]">
            <Header />
            <div className="h-12 md:h-28"></div>

            <CanchasComponent />
            <Footer /> 
        </main>
    )
}

export default CanchaView;