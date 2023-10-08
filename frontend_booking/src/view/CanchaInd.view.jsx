import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";

import CanchaIndComponent from "../component/CanchaInd/CanchaInd.component";

const CanchaIndView = ()=>{
    return(
        <main className=" min-h-screen h-screen">
            <Header />
            <div className="h-28"></div>
            <CanchaIndComponent />
            <Footer />
        </main>
    )
}

export default CanchaIndView;