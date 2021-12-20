import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import React, { useContext, useState } from 'react'
import { Button, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { GroupsContext } from '../../contexts/GroupsContext'
import { PaymentsContext } from '../../contexts/PaymentsContext'
import Currency from '../../helper/Currency'
import Select from "react-select";

const LocalPayment = ({ payment }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { updatePayment } = useContext(PaymentsContext);
    const { groups } = useContext(GroupsContext)

    const groupsOpt = [...groups.map((opt) => ({ value: opt.id, label: opt.name }))]

    const [payed, setPayed] = useState(payment.bank_income)
    const [loan, setLoan] = useState(payment.bank_loan)
    const [group, setGroup] = useState(payment.group)
    const [dinar, setDinar] = useState(1480)

    const handleSubmit = (e) => {
        e.preventDefault();
        updatePayment(payment.id,
            {
                "group": group,
                "local": payment.local,
                "bank": null
            },
            {
                "group": group,
                "income": payed,
                "loan": loan
            }
        );
    }
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
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>بنکەی وەسڵ</Form.Label>
                            <Select value={
                                groupsOpt.filter(option =>
                                    option.value === group)
                            } name="group" options={groupsOpt} onChange={(e) => setGroup(e.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>پارەی دراو</Form.Label>
                            <Form.Control type="text" defaultValue={payed} onChange={(event) => setPayed(event.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>جیاوازی حساب</Form.Label>
                            <Form.Control type='text' defaultValue={loan} onChange={(event) => setLoan(event.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>نرخی دینار</Form.Label>
                            <Form.Control type='number' defaultValue={dinar} onChange={(event) => setDinar(event.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>بەدینار</Form.Label>
                            <Form.Control type='text' value={Currency(payed * dinar)} disabled={true} />
                        </Form.Group>
                        <hr />
                        <Button variant="success" type="submit">
                            زیادکردنی مبلغ
                        </Button>
                    </Form>
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

export default LocalPayment
