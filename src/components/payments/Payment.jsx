import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import React, { useState } from 'react'
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Currency from '../../helper/Currency'
import EditPayForm from './EditPayForm'

const Payment = ({ payment }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <td>{payment.id}</td>
            <td>{payment.group_name}</td>
            <td>{payment.local_name} <Link className="d-print-none" to={`/paymentForm/${payment.id}`}><FontAwesomeIcon icon={faEdit} /></Link></td>
            <td><Link to={`/localDetail/${payment.local}`}>{payment.local_code}</Link></td>
            <td><Link className="text-decoration-none text-dark" to={`/paymentForm/${payment.id}`}>{payment.local_phone}</Link></td>
            <td>{Currency(payment.bank_income - payment.bank_loan)} </td>
            <td>{payment.date}</td>
            <td>{moment(new Date(payment.date)).format("DD/MM/YYYY")}</td>
            <td className="d-print-none">{moment(new Date(payment.datetime)).format("DD/MM/YYYY HH:MM:SS")}</td>
            <td>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            گۆڕین
                        </Tooltip>
                    }>
                    <Button variant={"outline-warning"} onClick={handleShow} data-toggle="modal">
                        <FontAwesomeIcon icon={faEdit} /></Button>
                </OverlayTrigger>
            </td>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                         نوێکردنەوەی فرۆش
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditPayForm dpay={payment}/>
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

export default Payment
