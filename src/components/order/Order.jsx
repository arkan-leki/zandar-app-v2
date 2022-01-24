import moment from 'moment';
import React from 'react';
import Currency from '../../helper/Currency';

const Order = ({ theOrder }) => {
    return (
        <>
            <td>{theOrder.id}</td>
            <td>{theOrder.name}</td>
            <td>{theOrder.group_name}</td>
            <td>{theOrder.totall}</td>
            <td>{Currency(theOrder.Totalprice)} </td>
            <td>{moment(new Date(theOrder.date)).format("DD/MM/YYYY")}</td>
        </>
    );
};

export default Order;
