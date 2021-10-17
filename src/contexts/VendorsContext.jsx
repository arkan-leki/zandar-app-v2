import {createContext, useContext, useEffect, useState} from "react";
import {APIContext} from "./APIContext";

export  const VendorsContext = createContext(undefined)

const VendorsContextProvider = (props) => {
    const [vendors, setVendors] = useState([])
    const {vendorsURL, zenderAXIOS} = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(vendorsURL).then((response) => {
            setVendors(response.data);
        });
        // eslint-disable-next-line
    }, [])

    const value = {vendors}
    return (
        <VendorsContext.Provider value={value}>
            {props.children}
        </VendorsContext.Provider>
    )
}

export default VendorsContextProvider ;