
import BorderButton from "../../Buttons/BorderButton/BorderButton";

import poster from "../../../assets/img/video-poster.png"
import video from "../../../assets/video/landing-hero.mp4"
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const LandingText = () => {
    return(
        <div className=" absolute bottom-44 flex flex-col items-center  font-inter text-pure-white">
            <h3 className="uppercase text-5xl font-semibold">las mejores canchas en la zona</h3>
            <p className="text-3xl font-medium">Haz ya tu reserva</p>
            
            <BorderButton classB=" flex flex-row items-center gap-6 mt-8 font-bold text-xl text-black bg-pure-white shadow-rounded-button-yellow "> 
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