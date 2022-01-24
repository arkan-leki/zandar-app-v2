import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { APIContext } from './APIContext';

export const OrdersContext = createContext(undefined)

const OrdersContextProvider = (props) => {
    const [orders, setOrders] = useState([])

    const { requestOrder, zenderAXIOS } = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(requestOrder).then((response) => {
            setOrders(response.data);
        });
        // eslint-disable-next-line
    }, [])    
    
    const value = { orders }

    return (
        <OrdersContext.Provider value={value}>
            {props.children}
        </OrdersContext.Provider>
    )
};

export default OrdersContextProvider;
