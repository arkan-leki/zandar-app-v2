import { createContext, useContext, useEffect, useState } from "react";
import { APIContext } from './APIContext'
import Currency from "../helper/Currency";

export const LocalsContext = createContext(undefined)

const LocalsContextProvider = (props) => {
    const [locals, setLocals] = useState([])
    const { paymentURL, bankURL, localsURL, zenderAXIOS } = useContext(APIContext)
    const [localsTemp, setLocalsTemp] = useState([])
    const [groupFilter, setGroupFilter] = useState({ value: 0, label: 'هەموو' })

    useEffect(() => {
        zenderAXIOS.get(localsURL).then((response) => {
            setLocals(response.data);
            setLocalsTemp(response.data)
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
                })).reduce((r, { totallint }) => r + parseFloat(totallint), 0)

                oldValue = Object.values(mob.oldacc_compnay.filter((para) => {
                    return (para.group) === sale.group && para.datetime <= sale.id
                })).reduce((r, { loan }) => r + parseFloat(loan), 0)

                pay = Object.values(mob.payment_compnay.filter((para) => {
                    return (para.group) === sale.group && para.datetime <= sale.id
                })).reduce((r, { bank_income }) => r + parseFloat(bank_income), 0)
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

    const addPaymentLocal = (pay, bank) => {
        zenderAXIOS.post(bankURL, bank).then((response) => {
            const bankID = response.data.id
            zenderAXIOS.post(paymentURL, {
                "group": pay.group,
                "local": pay.local,
                "bank": bankID
            }).then(() => {
                zenderAXIOS.get(`${localsURL}${pay.local}/`).then((response) => {
                    setLocals(locals.map((local) => local.id === pay.local ? response.data : local))
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

    const updateLocal = (id, data) => {
        zenderAXIOS.patch(`${localsURL}${id}/`, data).then((response) => {
            setLocals(locals.map((local) => local.id === id ? response.data : local))
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const onlyNeed = () => {
        if (groupFilter.value === 0)
            return setLocals(locals.filter((loc) => Object.values(loc.mawe).reduce((r, item) => r + item, 0) !== 0))
        return setLocals(locals.filter((loc) => loc.mawe[groupFilter.value] !== 0))
    }

    const value = {
        onlyNeed,
        locals,
        getLocal,
        setLocalRegion,
        groupFilter,
        setGroupFilter,
        addLocal,
        updateLocal,
        addPaymentLocal
    }
    return (
        <LocalsContext.Provider value={value}>
            {props.children}
        </LocalsContext.Provider>
    )
}
export default LocalsContextProvider
