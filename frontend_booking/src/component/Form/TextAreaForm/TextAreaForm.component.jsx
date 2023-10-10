import { useState } from "react";

const TextAreaForm = ({className, icon, validation, innerRef, children, ...props}) =>{
    
    const [isFocus, setFocus] = useState(false);

        return(
        <div className={`flex flex-row gap-2 border-2 rounded-xl p-3 w-full ${isFocus ? "border-azure": "border-dark-gray"} ${className}`}>
            <textarea 
                className={`w-full font-inter font-medium placeholder:text-light-gray text-base md:text-lg xl:text-xl ${icon? "": ""}`}
                {...props} {...innerRef}
                
                onFocus={()=>setFocus(true)}
                onBlur={()=>setFocus(false)}
            />
            <figure className={`text-light-gray flex items-start justify-center`}>{icon}</figure>
            {children}  {/* contains validation information */}
        </div>
    );
}

export default TextAreaForm;