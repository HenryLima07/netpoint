
import BorderButton from "../../Buttons/BorderButton/BorderButton";

import poster from "../../../assets/img/video-poster.png"
import video from "../../../assets/video/landing-hero.mp4"
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const LandingText = () => {
    return(
        <div className="absolute flex flex-col items-center  font-inter text-pure-white
            bottom-20 sm:bottom-28 lg:bottom-32 xl:bottom-28 2xl:bottom-36">

            <h3 className="uppercase font-semibold
                text-sm
                sm:text-2xl
                md:text-4xl 
                lg:text-5xl 
            ">las mejores canchas en la zona</h3>

            <p className="font-medium
                text-[0.75rem] sm:text-xl md:text-2xl lg:text-3xl">Haz ya tu reserva</p>
            
            <BorderButton className=" flex flex-row items-center justify-around gap-6 font-bold text-black bg-pure-white shadow-rounded-button-yellow
                mt-2 py-1 px-2 text-[0.6rem]
                sm:text-sm sm:p-2 sm:px-4
                md:text-md
                lg:mt-8 lg:py-3 lg:px-8 lg:text-xl"> 
                <p>Reservar ahora</p>
                <EmojiPeopleIcon />
            </BorderButton>
        </div>
    );
}

const LandingContainer = () => {
    return(
        <section className="w-full h-[55vh] sm:h-[65vh] md:h-[80vh] lg:h-screen relative flex items-center justify-center">
            <div className="relative overflow-hidden flex items-center justify-center h-full w-full"> 
                <video muted playsInline loop poster={poster} autoPlay className="object-fill w-full absolute h-full top-0 left-0">
                    <source src={video} type="video/mp4"/>
                    Browser not supported
                </video>
            </div>
            
            <LandingText/>
        </section>
    );
}

export default LandingContainer;