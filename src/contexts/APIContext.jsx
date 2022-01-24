import axios from "axios";
import { createContext } from "react";
import { getConfiguration } from '../config';


export const APIContext = createContext(undefined)

const APIContextProvider = (props) => {
    const baseURL = getConfiguration().apiUrl
    const salesURL = 'sells/'
    const groupsURL = 'group/'
    const vendorsURL = 'vendors/'
    const localsURL = 'locals/'
    const saleURL = 'sell/'
    const salesDetailURL = 'sales/'
    const saleDetailURL = 'sale/'
    const itemsURL = 'items/'
    const itemURL = 'item/'
    const localURL = 'local/'
    const regionURL = 'region/'
    const bankURL = 'bank/'
    const paymentURL = 'payment/'
    const catURL = 'cat/'
    const oldAccURL = 'oldacc/'
    const reSellURL = 'resell/'
    const buyURL = "orders/"
    const buysURL = "orders/"
    const orderedURL = "ordereds/"
    const tradersURL = "traders/"
    const feeURL = "buy/"
    const requestOrder = "reqOrder/"
    const requestDetail = "reqDetail/"

    const zenderAXIOS = axios.create({
        baseURL: baseURL
    })
    const value = {
        requestOrder,
        requestDetail,
        feeURL,
        itemURL,
        buyURL,
        tradersURL,
        orderedURL,
        buysURL,
        oldAccURL,
        catURL,
        paymentURL,
        bankURL,
        baseURL,
        itemsURL,
        salesURL,
        groupsURL,
        zenderAXIOS,
        vendorsURL,
        localURL,
        localsURL,
        saleURL,
        saleDetailURL,
        salesDetailURL,
        regionURL,
        reSellURL
    }

    return (
        <APIContext.Provider value={value}>
            {props.children}
        </APIContext.Provider>
    )
}

export default APIContextProvider
