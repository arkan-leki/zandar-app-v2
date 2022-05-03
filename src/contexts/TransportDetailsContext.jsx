import { createContext, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { APIContext } from './APIContext'

export const TransportDetailsContext = createContext(undefined)

const TransportDetailsContextProvider = (props) => {
    const { id } = useParams();

    const [transportz, setTransportz] = useState([]);
    const { transportzURL, salesURL, zenderAXIOS } = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(`${transportzURL}${id}/`).then((response) => {
            setTransportz(response.data);
        });
        // eslint-disable-next-line
    }, [])

    const updateSale = (id, updatedSale) => {
        zenderAXIOS.patch(`${salesURL}${id}/`, updatedSale).then((response) => {
            setTransportz(transportz.map((sale) => sale.request.id === id ? response.data : sale))
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const values = { transportz, updateSale }
    return (
        <TransportDetailsContext.Provider value={values}>
            {props.children}
        </TransportDetailsContext.Provider>
    );
};

export default TransportDetailsContextProvider;
