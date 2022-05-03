import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";
import Currency from "../../helper/Currency";
import moment from "moment";
import { TransportDetailsContext } from "../../contexts/TransportDetailsContext";
import { useContext } from "react";
import { useState } from "react";
import SaleToPrint from "../SaleToPrint";

const TransportSale = ({ sale }) => {
    const { updateSale } = useContext(TransportDetailsContext)

    const [status, setStatus] = useState(false);

    const handleStatus = (stat) => {
        setStatus(!stat)
        updateSale(sale.id, { "status": !stat })
    }

    return <>
        <td className="d-print-none">{sale.group_name}</td>
        <td className="d-print-none">{sale.vendor_name}</td>
        <td>        {sale.id}
            <OverlayTrigger
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        وردەکاری
                    </Tooltip>
                }>
                <Link className="d-print-none" to={`/saleDetail/${sale.id}`}>
                    <FontAwesomeIcon
                        icon={faEdit} /></Link>
            </OverlayTrigger>
        </td>
        <td className="fs-5 ">{sale.local_name}
            <OverlayTrigger
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        کەشف حساب
                    </Tooltip>
                }>
                <Link className="d-print-none" to={`/localDetail/${sale.local}`}>
                    <FontAwesomeIcon
                        icon={faEdit} /></Link>
            </OverlayTrigger>
        </td>
        <td>{sale.totallBar}</td>
        <td>{sale.sell_detail && Object.values(sale.sell_detail).reduce((r, { allwight }) => r + allwight, 0).toFixed(0)} کگم</td>
        <td>{sale.local_region} </td>
        <td>{Currency(parseFloat(sale.totall))} </td>
        <td>{Currency(parseFloat(sale.discount))} </td>
        <td>{Currency(parseFloat(sale.totallint))} </td>
        <td>{Currency(parseFloat(sale.totalback))} </td>
        <td>{moment(new Date(sale.date)).format("DD/MM/YYYY")}</td>
        <td className="d-print-none">
            <Form.Check className="mb-1 pl-0">
                <Form.Check.Label>
                    <Form.Check.Input
                        defaultChecked={sale.status}
                        value={status}
                        type="checkbox"
                        onChange={() => handleStatus(sale.status)}
                    />
                    <span className="form-check-sign" />
                </Form.Check.Label>
            </Form.Check>
        </td>
        <td className="d-print-none">{moment(new Date(sale.datetime)).format("DD/MM/YYYY HH:MM:SS")}</td>
        <td>
        <SaleToPrint sale={sale} />
        </td>
    </>
};

export default TransportSale;
