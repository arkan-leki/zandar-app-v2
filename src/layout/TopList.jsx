import React, { useContext, useEffect, useState } from 'react'
import { GroupsContext } from '../contexts/GroupsContext'
import { ItemsContext } from '../contexts/ItemsContext'
import Currency from '../helper/Currency'

const TopList = ({ list }) => {
    const { gropId  } = useContext(GroupsContext)

    
    const { items } = useContext(ItemsContext)
    const [tday, setTday] = useState([]);

    const fetchData = (startDate, endDate, group) => {
        const _item_sell = []
        // saleDetail.filter((i) => i.group === group)
        // updateSaleDate({ startDate, endDate }, group)
        console.log(group);
        // items
        items.filter((i) => i.group === group).map((_item) => {
            let item_sell = _item.item_sell
                .filter((sale) => (new Date(sale.date) - startDate) >= 0 && (new Date(sale.date) - endDate <= 0))
            let quantity = Object.values(item_sell).reduce((r, { quantity }) => r + quantity, 0)
            let date = Object.values(item_sell).reduce((r, { date }) => date, 0)
            let price = Object.values(item_sell).reduce((r, { price, quantity }) => r + (parseFloat(quantity) * parseFloat(price)), 0);
            return _item_sell.push({ "item": _item.name, "item_price": parseFloat(_item.price), "qazanc": price - (_item.price * quantity), "barcode": _item.barcode, "quantity": quantity, "mawe": _item.mawe, "maweprice": (_item.mawe * _item.price), "price": price, "date": date, "group": _item.group, 'itemp': (price / quantity) })
        })
        setTday(_item_sell.filter((_items) => _items.quantity !== 0))
    }

    useEffect(() => {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth() - 2, 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        fetchData(firstDay, lastDay, gropId);
    }, [items, gropId])
    return (
        <>
            <table className="table table-striped table-valign-middle">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Sales</th>
                        <th>More</th>
                    </tr>
                </thead>
                <tbody>
                    {tday
                        // .filter((i) => i.deleted === false)
                        .sort((a, b) => (a.qazanc) < (b.qazanc) ? 1 : -1)
                        .slice(0, 5)
                        .map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <img src="dist/img/default-150x150.png" alt="Product 1" className="img-circle img-size-32 mr-2" />
                                    {item.item}{item.quantity}
                                </td><td>{Currency(parseFloat(item.item_price))} USD</td><td>
                                    <small className="text-success mr-1">
                                        <i className="fas fa-arrow-up" />
                                        12%
                                    </small>
                                    {Currency(parseFloat(item.qazanc))}
                                </td><td>
                                    <a href="#" className="text-muted">
                                        <i className="fas fa-search" />
                                    </a>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    )
}

export default TopList