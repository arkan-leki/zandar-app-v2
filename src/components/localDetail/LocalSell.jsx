import { faCartArrowDown, faEdit, faTruckLoading, faTruckMoving } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Modal, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Currency from '../../helper/Currency';
import ReSale from '../sale/ReSale';

const LocalSell = ({ sale }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        handleClose()
    }, [sale])
    return (
        <>
            <td>{sale.group_name}</td>
            <td>{sale.vendor_name}</td>
            <td>
                <Link to={`/saleDetail/${sale.id}`}>{sale.id}</Link>
            </td>
            <td>
                {sale.totallBar}
            </td>
            <td>{Currency(parseFloat(sale.totall))} </td>
            <td>{Currency(parseFloat(sale.discount))} </td>
            <td>{Currency(parseFloat(sale.totallint))} </td>
            <td>{Currency(parseFloat(sale.totalback))} </td>
            <td>{moment(new Date(sale.date)).format("DD/MM/YYYY")}</td>
            <td><span className={""}>{sale.status ? <FontAwesomeIcon icon={faTruckMoving} /> :
                <FontAwesomeIcon icon={faTruckLoading} />}</span></td>
            <td>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            دەستکاری
                        </Tooltip>
                    }>
                    <Link className="btn btn-outline-warning" to={`/saleDetail/${sale.id}`}>
                        <FontAwesomeIcon
                            icon={faEdit} /></Link>
                </OverlayTrigger>
            </td>
            <OverlayTrigger
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        گەڕانەوە
                    </Tooltip>
                }>
                <Button variant={"outline-danger"} onClick={handleShow} data-toggle="modal">
                    <FontAwesomeIcon icon={faCartArrowDown} /></Button>
            </OverlayTrigger>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        گەڕانەوە فرۆش
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReSale theSale={sale} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        داخستن
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LocalSell
