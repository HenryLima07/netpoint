import BorderButton from "../../../Buttons/BorderButton/BorderButton";

import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const ClaseDescriptionContainer = ({title, subtitle, extraInfo, btnClass, divClass, textClass, className, onClick=()=>{}, children})=>{
    return (
        <article className={`flex flex-col justify-center items-center gap-2 mb-5 lg:mb-2 xl:m-0 font-inter ${className}`}>
            <div className={`flex flex-col ${divClass} px-4`}>
                <h3 className=" text-dark-gray font-bold text-2xl md:text-3xl lg:text-4xl">{title}</h3>
                <h5 className=" font-light pb-2 lg:pb-5 text-md lg:text-2xl">{subtitle}</h5>
                <p className={`${textClass} text-sm lg:text-lg xl:text-xl`}>{children}</p>
                <p className="py-3 xl:py-8 font-light text-sm lg:text-xl">{extraInfo}</p>
            </div>
                        
            <BorderButton onClick={onClick} className={` flex flex-row items-center justify-around gap-6 font-bold  text-black bg-pure-white shadow-rounded-button-yellow ${btnClass}
                px-2 text-sm py-2
                sm:text-lg sm:p-2 sm:px-4
                lg:px-8 lg:text-xl`}> 
                <p>Inscríbete ahora</p>
                <SupportAgentIcon />
            </BorderButton>

        </article>
    );
}

export default ClaseDescriptionContainer;