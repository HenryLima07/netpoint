import React, { useState } from "react";

const ConfigurationContext = React.createContext();

export const ConfigurationProvider = (props) =>{
    //controls loading when fetching data
    const [loading, setLoading] = useState(false);

    //allow handling loading
    const startLoading = ()=> setLoading(true);
    const stopLoading = ()=> setLoading(false);
    
    const state = {
        loading,
        startLoading,
        stopLoading
    };
    return <ConfigurationContext.Provider value={state} {...props} />
}

export const UseConfiguration = ()=>{
    //check if useconfiguration is inside of configuration provider component
    const context = React.useContext(ConfigurationContext);

    if(!context)
        throw new Error(
            "UseConfigurationContext must be call inside of a ConfigurationContextProvider component"
        );
    return context;
}