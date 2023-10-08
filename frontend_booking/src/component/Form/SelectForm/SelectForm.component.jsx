import { useState } from "react";

const SelectForm = ({className, icon, validation, innerRef, children, ...props}) =>{
    
    const [isFocus, setFocus] = useState(false);

        return(
        <div className={`flex flex-row gap-2 border-2 rounded-xl p-3 w-full ${isFocus ? "border-azure": "border-dark-gray"} ${className}`}>
            <select 
                className={`w-full font-inter font-medium bg-pure-white text-base md:text-lg xl:text-xl ${icon? "": ""}`}
                {...props} {...innerRef}
                
                onFocus={()=>setFocus(true)}
                onBlur={()=>setFocus(false)}
            >
                {children}
            </select>
            <figure className={`text-light-gray flex items-center justify-center`}>{icon}</figure>
        </div>
    );
}

export default SelectForm;