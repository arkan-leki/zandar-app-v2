import { createContext, useContext, useEffect, useState } from "react";
import { APIContext } from './APIContext'
import { useParams } from "react-router-dom/cjs/react-router-dom";

export const ItemDetailContext = createContext(undefined)

const ItemDetailContextProvider = (props) => {
    const [item, setItem] = useState([])
    const [sales, setSales] = useState([])

    const { salesDetailURL, itemsURL, zenderAXIOS } = useContext(APIContext)
    const { id } = useParams();

    useEffect(() => {
        zenderAXIOS.get(`${itemsURL}${id}/`).then((response) => {
            setItem(response.data);
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
        zenderAXIOS.get(`${salesDetailURL}?item=${id}`).then((response) => {
            setSales(response.data);
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
        // eslint-disable-next-line
    }, [])

    const updateItem = (id, data) => {
        zenderAXIOS.patch(`${itemsURL}${id}/`, data).then((response) => {
            setItem(response.data)
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const updateImage = (id, data) => {
        zenderAXIOS.patch(`${itemsURL}${id}/`, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                setItem(response.data)
            }).catch(err => {
                alert("داواکاریەکەت سەرنەکەوت");
            })
    }

    const value = { item, sales, updateItem, updateImage }
    return (
        <ItemDetailContext.Provider value={value}>
            {props.children}
        </ItemDetailContext.Provider>
    )
}
export default ItemDetailContextProvider
