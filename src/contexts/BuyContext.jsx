import React, { createContext, useContext, useEffect, useState } from 'react'
import { APIContext } from './APIContext'

export const BuysContext = createContext(undefined)

const BuyContextProvider = (props) => {
    const [buys, setbuys] = useState([])
    const { buysURL, zenderAXIOS } = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(buysURL).then((response) => {
            setbuys(response.data);
        });
        // eslint-disable-next-line
    }, [])

    const addBuy = (code, group, trader) => {
        zenderAXIOS.post(buysURL, {
            code: code, group: group, trader: trader
        }).then((response) => {
            setbuys([response.data, ...buys])
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }


    const value = { buys, addBuy }
    return (
        <BuysContext.Provider value={value}>
            {props.children}
        </BuysContext.Provider>
    )
}

export default BuyContextProvider
