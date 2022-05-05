import {createContext, useContext, useEffect, useState} from "react";
import {APIContext} from "./APIContext";

export const ItemsContext = createContext(undefined)

const ItemsContextProvider = (props) => {
    const [items, setItems] = useState([])
    const [itemsTemp, setItemsTemp] = useState([])

    const [itemForList, setItemForList] = useState([])

    const {itemsURL, itemURL, zenderAXIOS} = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(itemsURL).then((response) => {
            setItems(response.data);
            setItemsTemp(response.data)
            setItemForList(response.data)
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
        // eslint-disable-next-line
    }, [])

    const filterItems = (data) => {
        if(data === '0')
            return setItems(itemForList);
        setItems(itemForList.filter((item) =>
            item.barcode === data
        ));
    }

    const searchItems = (data) => {
        setItems(itemsTemp.filter((item) =>
            item.id === data
        ));
    }

    const setItemsGroup = (data) => {
        if(data ===  0)
            return setItems(itemsTemp);
        setItems(itemsTemp.filter((sale) => sale.group === data))
    }

    const updateItem = (id,data) => {
        zenderAXIOS.patch(`${itemsURL}${id}/`, data).then((response) => {
            setItems(items.map((item) => item.id === id ? response.data : item))
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const addNewItem = (data) => {
        zenderAXIOS.post(`${itemURL}`, data).then((response) => {
            setItems([response.data, ...items])
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const value = {items, filterItems, itemForList, itemsTemp, searchItems, setItemsGroup, updateItem, addNewItem}
    return (
        <ItemsContext.Provider value={value}>
            {props.children}
        </ItemsContext.Provider>
    )
}

export default ItemsContextProvider;