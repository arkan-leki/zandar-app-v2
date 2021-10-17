import {createContext, useContext, useEffect, useState} from "react";
import {APIContext} from './APIContext'

export const GroupsContext = createContext(undefined)

const GroupsContextProvider = (props) => {
    const [groups, setGroups] = useState([])
    const {groupsURL, zenderAXIOS} = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(groupsURL).then((response) => {
            setGroups(response.data);
        });
        // eslint-disable-next-line
    }, [])

    const value = {groups}
    return (
        <GroupsContext.Provider value={value}>
            {props.children}
        </GroupsContext.Provider>
    )
}
export default GroupsContextProvider
