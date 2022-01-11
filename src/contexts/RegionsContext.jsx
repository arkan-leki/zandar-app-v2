import { createContext, useContext, useEffect, useState } from "react";
import { APIContext } from './APIContext'

export const RegionsContext = createContext(undefined)

const RegionsContextProvider = (props) => {
    const [regions, setRegions] = useState([])
    const { regionURL, zenderAXIOS } = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(regionURL).then((response) => {
            setRegions(response.data);
        });
        // eslint-disable-next-line
    }, [])

    const addRegion = (data) => {
        zenderAXIOS.post(regionURL, data).then((response) => {
            setRegions([response.data, ...regions])
        }).catch(err => {
            console.log(err)
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }


    const value = { regions, addRegion }
    return (
        <RegionsContext.Provider value={value}>
            {props.children}
        </RegionsContext.Provider>
    )
}
export default RegionsContextProvider
