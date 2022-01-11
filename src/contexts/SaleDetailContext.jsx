import { createContext, useContext, useEffect, useState } from 'react'
import { APIContext } from './APIContext'
import { useParams } from "react-router-dom/cjs/react-router-dom";

export const SaleDetailContext = createContext(undefined)

const SaleDetailContextProvider = (props) => {
    const [saleDetail, setSaleDetail] = useState([])
    const [sale, setSale] = useState([])
    const { id } = useParams();
    const [items, setItems] = useState([])
    // const [itemsTemp, setItemsTemp] = useState([])

    const [itemForList, setItemForList] = useState([])
    const { itemsURL, salesURL, saleDetailURL, salesDetailURL, zenderAXIOS } = useContext(APIContext)

    useEffect(() => {
        if (id)
            return getSale(id)
        zenderAXIOS.get(salesDetailURL).then((response) => {
            setSaleDetail(response.data)
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
        // eslint-disable-next-line
    }, [])

    const getItems = (id) => {
        zenderAXIOS.get(`${itemsURL}?group=${id}`).then((response) => {
            setItems(response.data);
            // setItemsTemp(response.data)
            setItemForList(response.data)
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const addSale = (temp_id, data) => {
        zenderAXIOS.post(salesDetailURL, data).then((response) => {
            setSaleDetail(saleDetail.map((sale) => sale.id === temp_id ? response.data : sale))
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const deleteSale = (id) => {
        if (id < 0) {
            return setSaleDetail(saleDetail.filter(sale => sale.id !== id))
        }
        zenderAXIOS.delete(`${saleDetailURL}${id}/`).then(() => {
            setSaleDetail(saleDetail.filter(sale => sale.id !== id))
        }).catch(err => {
            setSaleDetail(saleDetail.filter(sale => sale.id !== id))
        })
    }

    const updateSale = (id, updatedSale) => {
        zenderAXIOS.patch(`${salesDetailURL}${id}/`, updatedSale).then((response) => {
            setSaleDetail(saleDetail.map((sale) => sale.id === id ? response.data : sale))
        }).catch(() => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const updateSell = (id, data) => {
        zenderAXIOS.patch(`${salesURL}${id}/`, data).then((response) => {
            alert("done");
        }).catch(() => {
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
            setSaleDetail(response.data.sell_detail)
            getItems(response.data.group)
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const filterItems = (data) => {
        if (data === '0')
            return setItems(itemForList);
        setItems(itemForList.filter((item) =>
            item.barcode === data
        ));
    }

    const addToList = (item) => {
        const id = Math.floor(Math.random() * -1000) + 1
        const newCart = { id, ...item }
        setSaleDetail([...saleDetail, newCart])
    }

    return (
        <SaleDetailContext.Provider
            value={{ saleDetail, sale, getSale, addSale, deleteSale, updateSale, updateSaleDate, addToList, items, filterItems, itemForList, updateSell }}>
            {props.children}
        </SaleDetailContext.Provider>
    )
}

export default SaleDetailContextProvider
