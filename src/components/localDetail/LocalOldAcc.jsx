import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react'
import { Button, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Currency from '../../helper/Currency'
import Select from "react-select";
import { GroupsContext } from '../../contexts/GroupsContext';
import { OldAccsContext } from '../../contexts/OldAccsContext';

const LocalOldAcc = ({ oldAcc }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { updateOldAcc } = useContext(OldAccsContext);
    const { groups } = useContext(GroupsContext)

    const groupsOpt = [...groups.map((opt) => ({ value: opt.id, label: opt.name }))]

    const [payed, setPayed] = useState(oldAcc.income)
    const [loan, setLoan] = useState(oldAcc.loan)
    const [group, setGroup] = useState(oldAcc.group)
    const [dinar, setDinar] = useState(1480)

    const handleSubmit = (e) => {
        e.preventDefault();
        updateOldAcc(oldAcc.id,
            {
                "income": payed,
                "loan": loan,
                "group": group,
                "local": oldAcc.local
            }
        )
    }
    return (
        <>
            <td>{oldAcc.id}</td>
            <td>{oldAcc.group_name}</td>
            <td>{oldAcc.local_name}</td>
            <td>{Currency(parseFloat(oldAcc.income))}</td>
            <td>{Currency(parseFloat(oldAcc.loan))}</td>
            <td>{oldAcc.date}</td>
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
                        نوێکردنەوەی حساب
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
                            <Form.Label>پارەی داشکێنراو</Form.Label>
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

export default LocalOldAcc
