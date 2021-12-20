import React, { createContext, useContext, useEffect, useState } from 'react'
import { APIContext } from './APIContext'

export const TradersContext = createContext(undefined)

const TradersContextProvider = (props) => {
    const [traders, settraders] = useState([])
    const {tradersURL, zenderAXIOS} = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(tradersURL).then((response) => {
            settraders(response.data);
        });
        // eslint-disable-next-line
    }, [])

    const value = {traders}
    return (
        <TradersContext.Provider value={value}>
            {props.children}
        </TradersContext.Provider>
    )
}

export default TradersContextProvider
