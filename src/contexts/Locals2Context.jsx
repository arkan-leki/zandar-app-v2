import { createContext, useContext, useEffect, useState } from "react";
import { APIContext } from './APIContext'

export const Locals2Context = createContext(undefined)

const Locals2ContextProvider = (props) => {
    const [locals, setLocals] = useState([])
    const { localURL, zenderAXIOS } = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(localURL).then((response) => {
            setLocals(response.data);
        });
        // eslint-disable-next-line
    }, [])

    const value = {
        locals
    }
    
    return (
        <Locals2Context.Provider value={value}>
            {props.children}
        </Locals2Context.Provider>
    )
}
export default Locals2ContextProvider
