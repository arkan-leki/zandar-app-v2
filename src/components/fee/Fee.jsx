import moment from 'moment'
import React from 'react'
import Currency from '../../helper/Currency'

const Fee = ({ theFee }) => {
    return (
        <>
            <td>{theFee.id}</td>
            <td>{theFee.name}</td>
            <td>{theFee.group_name}</td>
            <td>{Currency(theFee.bank_income - theFee.bank_loan)} </td>
            <td>{moment(new Date(theFee.date)).format("DD/MM/YYYY")}</td>
            <td className="d-print-none">{moment(new Date(theFee.datetime)).format("DD/MM/YYYY HH:MM:SS")}</td>
        </>
    )
}

export default Fee
