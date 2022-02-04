import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Modal, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import PayLoan from './PayLoan';

const Trader = ({ trader }) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    useEffect(() => {
        handleClose()
    }, [trader])

    return <>
        <td>
            {trader.id}
        </td>
        <td>
            {trader.group_name}
        </td>
        {/* <td>
            {trader.code}
        </td> */}
        <td>
            {trader.name}
        </td>
        <td>
            {trader.phone}
        </td>
        <td>
            {trader.address}
        </td>

        <td>
            {trader.exchange}
        </td>
        <td>
            {trader.totallBuy}
        </td>
        <td>
            {trader.totallLoan}
        </td>
        <td>
            {trader.mawe}
        </td>
        {/* <td>
            {trader.date}
        </td> */}

        <OverlayTrigger
            overlay={
                <Tooltip id={`tooltip-top`}>
                    پارەدان
                </Tooltip>
            }>
            <Button variant={"outline-success"} onClick={handleShow} data-toggle="modal">
                <FontAwesomeIcon icon={faMoneyBill} /></Button>
        </OverlayTrigger>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    پارەدانەوە
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PayLoan theTrader={trader} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    داخستن
                </Button>
            </Modal.Footer>
        </Modal>
    </>
};

export default Trader;
