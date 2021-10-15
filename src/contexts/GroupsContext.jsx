import {createContext, useContext, useEffect, useState} from "react";
import {APIContext} from './APIContext'

export const groupsContext = createContext()
const GroupsContextProvider = (props) => {
    const {groups, setGroups} = useState()
    const {groupsURL, zenderAXIOS} = useContext(APIContext)
    useEffect(() => {
        zenderAXIOS.get(groupsURL).then((response) => {
            setGroups(response.data);
        });
        // eslint-disable-next-line
    }, [])

    const value = [groups]
    return (
        <groupsContext.Provider value={{value}}>
            {props.children}
        </groupsContext.Provider>
    )
}
export default GroupsContextProvider
