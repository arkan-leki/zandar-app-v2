import { createContext, useContext, useEffect, useState } from "react";
import { APIContext } from './APIContext'

export const PaymentsContext = createContext(undefined)

const PaymentsContextProvider = (props) => {
    const [paymentsTemp, setPaymentsTemp] = useState([])

    const [payments, setPayments] = useState([])
    const [banks, setBanks] = useState([])

    const { paymentURL, bankURL, zenderAXIOS } = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(paymentURL).then((response) => {
            setPayments(response.data);
            setPaymentsTemp(response.data);
        });
        zenderAXIOS.get(bankURL).then((response) => {
            setBanks(response.data);
        });
        // eslint-disable-next-line
    }, [])

    const addPayment = (pay, bank) => {
        zenderAXIOS.post(bankURL, bank).then((response) => {
            const bankID = response.data.id
            zenderAXIOS.post(paymentURL, {
                "group": pay.group,
                "local": pay.local,
                "bank": bankID
            }).then((response) => {
                setPayments([response.data, ...payments])
            }).catch(err => {
                console.log(err)
                alert("داواکاریەکەت سەرنەکەوت");
            })

        }).catch(err => {
            console.log(err)
            alert("داواکاریەکەت سەرنەکەوت");
        })

    }

    const updatePayment = (id, updatedPayment) => {
        zenderAXIOS.patch(`${paymentURL}${id}/`, updatedPayment).then((response) => {
            setPayments(payments.map((payment) => payment.id === id ? response.data : payment))
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const updateBank = (id, updatedData) => {
        zenderAXIOS.patch(`${bankURL}${id}/`, updatedData).then((response) => {
            setPayments(payments)
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const updatePaymentDate = (dates, group) => {
        if (group) {
            setPayments(paymentsTemp.filter((payment) => payment.group === group))
            setPayments(payments.filter((payment) => (new Date(payment.date) - dates.startDate) >= 0 && (new Date(payment.date) - dates.endDate <= 0)));
            return
        }
        setPayments(paymentsTemp.filter((payment) => (new Date(payment.date) - dates.startDate) >= 0 && (new Date(payment.date) - dates.endDate <= 0)));
    }

    const setPaymentGroup = (data) => {
        setPayments(paymentsTemp.filter((payment) => payment.group === data))
    }

    const value = { payments, banks, updatePaymentDate, setPaymentGroup, addPayment, updatePayment, updateBank }
    return (
        <PaymentsContext.Provider value={value}>
            {props.children}
        </PaymentsContext.Provider>
    )
}
export default PaymentsContextProvider
