import { createContext, useEffect, useState } from "react";


export const StoreContext = createContext();

export const StoreContextProvider = ({children})=>{
    const [details, setDetails] = useState({});
    const [searchedDetails, setSearchedDetails] = useState([]); // State to hold search results

    useEffect(()=>{
        console.log(details)
    }, [details])

    return (
        <StoreContext.Provider value={{details, setDetails, searchedDetails, setSearchedDetails}}>
            {children}
        </StoreContext.Provider>
    );
}

