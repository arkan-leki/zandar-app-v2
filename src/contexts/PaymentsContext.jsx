import {createContext, useContext, useEffect, useState} from "react";
import {APIContext} from './APIContext'

export const PaymentsContext = createContext(undefined)

const PaymentsContextProvider = (props) => {
    const [payments, setPayments] = useState([])
    const {paymentURL,bankURL, zenderAXIOS} = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(paymentURL).then((response) => {
            setPayments(response.data);
        });
        zenderAXIOS.get(bankURL).then((response) => {
            setPayments(response.data);
        });
        // eslint-disable-next-line
    }, [])


    const value = {payments}
    return (
        <PaymentsContext.Provider value={value}>
            {props.children}
        </PaymentsContext.Provider>
    )
}
export default PaymentsContextProvider
