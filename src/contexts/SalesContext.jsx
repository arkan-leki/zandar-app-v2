import {createContext, useContext, useEffect, useState} from 'react'
import {APIContext} from './APIContext'

export const SalesContext = createContext(undefined)

const SalesContextProvider = (props) => {
    const [sales, setSales] = useState([])
    const [salesTemp, setSalesTemp] = useState([])

    const {salesURL, zenderAXIOS, reSellURL} = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(`${salesURL}?status=false`).then((response) => {
            setSales(response.data);
            setSalesTemp(response.data)
        });
        // eslint-disable-next-line
    }, [])

    const allSales = () => {
        zenderAXIOS.get(salesURL).then((response) => {
            setSales(response.data);
            setSalesTemp(response.data)
        });
    }

    const addSale = (vendor, group, local) => {
        zenderAXIOS.post(salesURL, {
            vendor: vendor, group: group, local: local
        }).then((response) => {
            setSales([response.data, ...sales])
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const deleteSale = (id) => {
        zenderAXIOS.delete(`${salesURL}${id}/`).then((response) => {
            setSales(sales.filter(sale => sale.id !== id))
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const updateSale = (id, updatedSale) => {
        zenderAXIOS.patch(`${salesURL}${id}/`, updatedSale).then((response) => {
            setSales(sales.map((sale) => sale.id === id ? response.data : sale))
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const updateSaleDate = (dates, group, visitor) => {
        if(visitor){
            setSales(salesTemp.filter((sale) => sale.vendor === visitor))
            setSales(sales.filter((sale) => (new Date(sale.date) - dates.startDate) >= 0 && (new Date(sale.date) - dates.endDate <= 0)));
            return
        }
        if (group) {
            setSales(salesTemp.filter((sale) => sale.group === group))

            if(visitor){
                setSales(salesTemp.filter((sale) => sale.vendor === visitor))
                setSales(sales.filter((sale) => (new Date(sale.date) - dates.startDate) >= 0 && (new Date(sale.date) - dates.endDate <= 0)));
                return
            }
            setSales(sales.filter((sale) => (new Date(sale.date) - dates.startDate) >= 0 && (new Date(sale.date) - dates.endDate <= 0)));

            return
        }
        setSales(salesTemp.filter((sale) => (new Date(sale.date) - dates.startDate) >= 0 && (new Date(sale.date) - dates.endDate <= 0)));
    }

    const setSaleGroup = (data) => {
        setSales(salesTemp.filter((sale) => sale.group === data))
    }

    
    const setSaleVisitor = (data) => {
        setSales(salesTemp.filter((sale) => sale.vendor === data))
    }
    const addReSale = (sell, item, quantity, price) => {
        zenderAXIOS.post(reSellURL, {
            sell: sell, item: item, quantity: quantity, price: price
        }).then(() => {
            zenderAXIOS.get(`${salesURL}${sell}/`).then((response) => {
                setSales(sales.map((sale) => sale.id === sell ? response.data : sale))
            });
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const values = {sales, addSale, deleteSale, updateSale, updateSaleDate, setSaleGroup, allSales, addReSale, setSaleVisitor};

    return (
        <SalesContext.Provider value={values}>
            {props.children}
        </SalesContext.Provider>
    )
}

export default SalesContextProvider
