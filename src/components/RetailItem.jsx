import Currency from "../helper/Currency";

const RetailItem = ({item}) => {

    return (
        <>
            <th>{item.group}</th>
            <th>{item.barcode}</th>
            <th>{item.item}</th>
            <th>{item.item_price}</th>
            <th>{item.itemp}</th>
            <th>{item.quantity}</th>
            <th>{item.mawe}</th>
            <th>{Currency(item.price)}</th>
            <th>{Currency(item.maweprice)}</th>
            <th>{item.qazanc}</th>
            <th>{item.date}</th>
        </>
    )
}

export default RetailItem
