import {createContext, useContext, useEffect, useState} from 'react'
import {APIContext} from './APIContext'
import {useParams} from "react-router-dom/cjs/react-router-dom";

export const SaleDetailContext = createContext(undefined)

const SaleDetailContextProvider = (props) => {
    const [saleDetail, setSaleDetail] = useState([])
    const [sale, setSale] = useState([])
    const {id} = useParams();

    const {salesURL, saleDetailURL, salesDetailURL, zenderAXIOS} = useContext(APIContext)

    useEffect(() => {
        if (id)
            return getSale(id)
        zenderAXIOS.get(salesDetailURL).then((response) => {
            setSaleDetail(response.data);
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
        // eslint-disable-next-line
    }, [])

    const addSale = (temp_id, data) => {
        zenderAXIOS.post(salesDetailURL, data).then((response) => {
            setSaleDetail([...saleDetail.filter((sale) => sale.id !== temp_id), response.data])
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const deleteSale = (id) => {
        zenderAXIOS.delete(`${saleDetailURL}${id}/`).then((response) => {
            setSaleDetail(saleDetail.filter(sale => sale.id !== id))
        }).catch(err => {
            setSaleDetail(saleDetail.filter(sale => sale.id !== id))
        })
    }

    const updateSale = (id, updatedSale) => {
        zenderAXIOS.patch(`${salesDetailURL}${id}/`, updatedSale).then((response) => {
            setSaleDetail(saleDetail.map((sale) => sale.id === id ? response.data : sale))
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const updateSaleDate = (dates) => {
        zenderAXIOS.get(salesDetailURL).then((response) => {
            setSaleDetail(response.data.filter((sale) => (new Date(sale.date) - dates.startDate) >= 0 && (new Date(sale.date) - dates.endDate <= 0)));
        });
    }

    const getSale = (id) => {
        zenderAXIOS.get(`${salesURL}${id}/`).then((response) => {
            setSale(response.data);
            setSaleDetail(response.data.sell_detail);
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const addToList = (item) => {
        const id = Math.floor(Math.random() * 1000) + 1
        const newCart = {id, ...item}
        setSaleDetail([...saleDetail, newCart])
    }

    return (
        <SaleDetailContext.Provider
            value={{saleDetail, sale, getSale, addSale, deleteSale, updateSale, updateSaleDate, addToList}}>
            {props.children}
        </SaleDetailContext.Provider>
    )
}

export default SaleDetailContextProvider
