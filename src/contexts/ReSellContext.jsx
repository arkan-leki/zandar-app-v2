import React, { useContext } from 'react'
import { createContext } from 'react'
import { APIContext } from './APIContext'

export const ReSellContext = createContext(undefined)

const ReSellContextProvider = (props) => {
    const {zenderAXIOS, reSellURL} = useContext(APIContext)

    const addReSale = (sell, item, quantity, price) => {
        zenderAXIOS.post(reSellURL, {
            sell: sell, item: item, quantity: quantity, price: price
        }).then(() => {
            alert("داواکاریەکەت سەرکەوتووبەە");
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const value = { addReSale }

    return (
        <ReSellContext.Provider value={value}>
            {props.children}
        </ReSellContext.Provider>
    )
}

export default ReSellContextProvider
