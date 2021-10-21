import {createContext, useContext, useEffect, useState} from "react";
import {APIContext} from "./APIContext";

export const ItemsContext = createContext(undefined)

const ItemsContextProvider = (props) => {
    const [items, setItems] = useState([])
    const [itemForList, setItemForList] = useState([])

    const {itemsURL, zenderAXIOS} = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(itemsURL).then((response) => {
            setItems(response.data);
            setItemForList(response.data)
        });
        // eslint-disable-next-line
    }, [])

    const filterItems = (data) => {
        if(data === '0')
            return setItems(itemForList);
        setItems(itemForList.filter((item) =>
            item.barcode === data
        ));
    }

    const value = {items, filterItems, itemForList}
    return (
        <ItemsContext.Provider value={value}>
            {props.children}
        </ItemsContext.Provider>
    )
}

export default ItemsContextProvider;