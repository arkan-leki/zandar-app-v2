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

    const addLocal = (data) => {
        zenderAXIOS.post(localURL, data).then((response) => {
            setLocals([response.data, ...locals])
        }).catch(err => {
            console.log(err)
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const updateLocal = (id, data) => {
        zenderAXIOS.patch(`${localURL}${id}/`, data).then((response) => {
            setLocals(locals.map((local) => local.id === id ? response.data : local))
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const value = {
        locals,
        addLocal,
        updateLocal
    }
    
    return (
        <Locals2Context.Provider value={value}>
            {props.children}
        </Locals2Context.Provider>
    )
}
export default Locals2ContextProvider
