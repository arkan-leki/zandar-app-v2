import React, { createContext, useContext, useEffect, useState } from 'react'
import { APIContext } from './APIContext'

export const TradersContext = createContext(undefined)

const TradersContextProvider = (props) => {
    const [traders, setTraders] = useState([])
    const { tradersURL, payloanURL, bankURL, zenderAXIOS } = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(tradersURL).then((response) => {
            setTraders(response.data);
        });
        // eslint-disable-next-line
    }, [])


    const addPayLoan = (pay, bank) => {
        zenderAXIOS.post(bankURL, bank).then((response) => {
            const bankID = response.data.id
            zenderAXIOS.post(payloanURL, {
                "group": pay.group,
                "trader": pay.trader,
                "bank": bankID
            }).then(() => {
                zenderAXIOS.get(`${tradersURL}${pay.trader}/`).then((response) => {
                    setTraders(traders.map((com) => com.id === pay.trader ? response.data : com))
                });
            }).catch(err => {
                console.log(err)
                alert("داواکاریەکەت سەرنەکەوت");
            })

        }).catch(err => {
            console.log(err)
            alert("داواکاریەکەت سەرنەکەوت");
        })

    }


    const value = { traders, addPayLoan }
    return (
        <TradersContext.Provider value={value}>
            {props.children}
        </TradersContext.Provider>
    )
}

export default TradersContextProvider
