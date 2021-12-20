import React, { createContext, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { APIContext } from './APIContext'
export const BuyDetailContext = createContext(undefined)

const BuyDetailContextProvider = (props) => {
    const {id} = useParams();

    const [buy, setBuy] = useState([])
    const [ordereds, setOrdereds] = useState([])
    const {buysURL, orderedURL, zenderAXIOS} = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(`${buysURL}${id}/`).then((response) => {
            setBuy(response.data)
            setOrdereds(response.data.order_detail);
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
        // eslint-disable-next-line
    }, [])


    const addToList = (item) => {
        const id = Math.floor(Math.random() * -1000) + 1
        const newCart = {id, ...item}
        setOrdereds([...ordereds, newCart])
    }

    const addOrdered = (temp_id, data) => {
        zenderAXIOS.post(orderedURL, data).then((response) => {
            setOrdereds(ordereds.map((order) => order.id === temp_id ? response.data : order))
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const deleteOrdered = (id) => {
        if(id<0){
            return setOrdereds(ordereds.filter(order => order.id !== id))
        }
        zenderAXIOS.delete(`${orderedURL}${id}/`).then(() => {
            setOrdereds(ordereds.filter(order => order.id !== id))
        }).catch(err => {
            setOrdereds(ordereds.filter(order => order.id !== id))
        })
    }
    

    const value = {ordereds, buy, addToList, addOrdered, deleteOrdered}
    return (
        <BuyDetailContext.Provider value={value}>
            {props.children}
        </BuyDetailContext.Provider>
    )
}

export default BuyDetailContextProvider
