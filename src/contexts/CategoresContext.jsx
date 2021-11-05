import {createContext, useContext, useEffect, useState} from "react";
import {APIContext} from './APIContext'

export const CatsContext = createContext(undefined)

const CatsContextProvider = (props) => {
    const [cats, setCats] = useState([])
    const {catURL, zenderAXIOS} = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(catURL).then((response) => {
            setCats(response.data);
        });
        // eslint-disable-next-line
    }, [])


    const value = {cats}
    return (
        <CatsContext.Provider value={value}>
            {props.children}
        </CatsContext.Provider>
    )
}
export default CatsContextProvider
