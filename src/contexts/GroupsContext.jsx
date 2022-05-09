import {createContext, useContext, useEffect, useState} from "react";
import {APIContext} from './APIContext'

export const GroupsContext = createContext(undefined)

const GroupsContextProvider = (props) => {
    const [groups, setGroups] = useState([])
    const [grop, setGrop] = useState([])
    const [xgrop, setXGrop] = useState([])
    const {groupsURL, zenderAXIOS, groupURL} = useContext(APIContext)
    const [gropId, setGropId] = useState([])

    useEffect(() => {
        zenderAXIOS.get(groupURL).then((response) => {
            setGroups(response.data);
            setGrop(response.data)
        });
        zenderAXIOS.get(groupsURL).then((response) => {
            setXGrop(response.data)
        });
        // eslint-disable-next-line
    }, [])


    const value = {groups,xgrop, grop, setGrop, gropId, setGropId}
    return (
        <GroupsContext.Provider value={value}>
            {props.children}
        </GroupsContext.Provider>
    )
}
export default GroupsContextProvider
