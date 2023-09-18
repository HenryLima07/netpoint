
import BorderButton from "../../Buttons/BorderButton/BorderButton";

import poster from "../../../assets/img/video-poster.png"
import video from "../../../assets/video/landing-hero.mp4"
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const LandingText = () => {
    return(
        <div className="absolute flex flex-col items-center  font-inter text-pure-white
            bottom-3 sm:bottom-10 lg:bottom-14 xl:bottom-20 2xl:bottom-48">

            <h3 className="uppercase font-semibold
                text-sm
                sm:text-2xl
                md:text-4xl 
                lg:text-5xl 
            ">las mejores canchas en la zona</h3>

            <p className="font-medium
                text-[0.75rem] sm:text-xl md:text-2xl lg:text-3xl">Haz ya tu reserva</p>
            
            <BorderButton classB=" flex flex-row items-center justify-around gap-6 font-bold  text-black bg-pure-white shadow-rounded-button-yellow
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
        <section className="w-full relative flex items-center justify-center">
            <div>
                <video muted playsInline loop poster={poster} autoPlay className="w-full">
                    <source src={video} type="video/mp4"/>
                    Browser not supported
                </video>
            </div>
            <LandingText/>
        </section>
    );
}

export default LandingContainer;