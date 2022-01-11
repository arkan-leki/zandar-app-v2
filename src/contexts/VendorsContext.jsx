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

    const addVendor = (data) => {
        zenderAXIOS.post(vendorsURL, data).then((response) => {
            setVendors([response.data, ...vendors])
        }).catch(err => {
            console.log(err)
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const updateVendor = (id, data) => {
        zenderAXIOS.patch(`${vendorsURL}${id}/`, data).then((response) => {
            setVendors(vendors.map((vendor) => vendor.id === id ? response.data : vendor))
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }


    const value = {vendors, addVendor, updateVendor}
    return (
        <VendorsContext.Provider value={value}>
            {props.children}
        </VendorsContext.Provider>
    )
}

export default VendorsContextProvider ;