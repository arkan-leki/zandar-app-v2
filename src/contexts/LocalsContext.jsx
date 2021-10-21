import {createContext, useContext, useEffect, useState} from "react";
import {APIContext} from './APIContext'

export const LocalsContext = createContext(undefined)

const LocalsContextProvider = (props) => {
    const [locals, setLocals] = useState([])
    const {localURL, zenderAXIOS} = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(localURL).then((response) => {
            setLocals(response.data);
        });
        // eslint-disable-next-line
    }, [])

    const value = {locals}
    return (
        <LocalsContext.Provider value={value}>
            {props.children}
        </LocalsContext.Provider>
    )
}
export default LocalsContextProvider
