import { createContext, useContext, useEffect, useState } from 'react'
import { APIContext } from './APIContext'

export const TransportsContext = createContext(undefined)

const TransportsContextProvider = (props) => {
    const [transports, setTransport] = useState([]);
    const { salesURL, transportsURL, zenderAXIOS } = useContext(APIContext)
    const [sales, setSales] = useState([])


    useEffect(() => {
        zenderAXIOS.get(`${salesURL}?status=false`).then((response) => {
            setSales(response.data);
        });
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        zenderAXIOS.get(transportsURL).then((response) => {
            setTransport(response.data);
        });
        // eslint-disable-next-line
    }, [])

    const addTrans = (dliver, sells, date) => {
        zenderAXIOS.post(transportsURL, {
            dliver: dliver, request: sells, start_date: date, end_date: date
        }).then((response) => {
            setSales([response.data, ...sales])
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const values = { transports, sales, addTrans }
    return (
        <TransportsContext.Provider value={values}>
            {props.children}
        </TransportsContext.Provider>
    );
};

export default TransportsContextProvider;
