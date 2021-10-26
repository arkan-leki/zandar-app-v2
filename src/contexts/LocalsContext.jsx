import {createContext, useContext, useEffect, useState} from "react";
import {APIContext} from './APIContext'
import Currency from "../helper/Currency";

export const LocalsContext = createContext(undefined)

const LocalsContextProvider = (props) => {
    const [locals, setLocals] = useState([])
    const [localz, setLocalz] = useState([])
    const {localURL, localsURL, zenderAXIOS} = useContext(APIContext)
    const [localsTemp, setLocalsTemp] = useState([])
    const [groupFilter, setGroupFilter] = useState({value: 0, label: 'هەموو'})

    useEffect(() => {
        zenderAXIOS.get(localsURL).then((response) => {
            setLocals(response.data);
            setLocalsTemp(response.data)
        });
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        zenderAXIOS.get(localURL).then((response) => {
            setLocalz(response.data);
        });
        // eslint-disable-next-line
    }, [])
    const getLocal = (sale, id, plus) => {
        let attemptsValue = 0
        let oldValue = 0
        let pay = 0
        zenderAXIOS.get(`${localsURL}/${id}/`).then((response) => {
            response.data.map((mob) => {
                attemptsValue = Object.values(mob.attempts.filter((para) => {
                    return (para.group) === sale.group && para.datetime <= sale.id
                })).reduce((r, {totallint}) => r + parseFloat(totallint), 0)

                oldValue = Object.values(mob.oldacc_compnay.filter((para) => {
                    return (para.group) === sale.group && para.datetime <= sale.id
                })).reduce((r, {loan}) => r + parseFloat(loan), 0)

                pay = Object.values(mob.payment_compnay.filter((para) => {
                    return (para.group) === sale.group && para.datetime <= sale.id
                })).reduce((r, {bank_income}) => r + parseFloat(bank_income), 0)
                return Currency(parseFloat((attemptsValue + oldValue + parseFloat(mob.exchange)) - pay - plus))
            })
        });
    }

    const setLocalRegion = (data) => {
        if (data === 0)
            return setLocals(localsTemp)
        setLocals(localsTemp.filter((sale) => sale.region === data))
    }

    const addLocal = (data) => {
        zenderAXIOS.post(localsURL, data).then((response) => {
            setLocals([response.data, ...locals])
        }).catch(err => {
            console.log(err)
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const value = {locals, localz, getLocal, setLocalRegion, groupFilter, setGroupFilter, addLocal}
    return (
        <LocalsContext.Provider value={value}>
            {props.children}
        </LocalsContext.Provider>
    )
}
export default LocalsContextProvider
