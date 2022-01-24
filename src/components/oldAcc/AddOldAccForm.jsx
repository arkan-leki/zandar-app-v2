import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import Currency from '../../helper/Currency'
import Select from "react-select";
import { GroupsContext } from '../../contexts/GroupsContext';
import { OldAccsContext } from '../../contexts/OldAccsContext';

const AddOldAccForm = ({ thelocal }) => {
    const { addOldAcc } = useContext(OldAccsContext);
    const { groups } = useContext(GroupsContext)

    const groupsOpt = [...groups.map((opt) => ({ value: opt.id, label: opt.name }))]

    const [payed, setPayed] = useState(0)
    const [loan, setLoan] = useState(0)
    const [group, setGroup] = useState(1)
    const [dinar, setDinar] = useState(1480)
    // const [local, setLocal] = useState(thelocal)

    const handleSubmit = (e) => {
        e.preventDefault();
        addOldAcc(
            {
                "income": payed,
                "loan": loan,
                "group": group,
                "local": thelocal
            }
        )
    }

    return (
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
                <Form.Label>بەدۆلار</Form.Label>
                <Form.Control type='text' value={Currency(payed-loan * dinar)} disabled={true} />
            </Form.Group>
            <hr />
            <Button variant="success" type="submit">
                زیادکردنی مبلغ
            </Button>
        </Form>
    )
}

export default AddOldAccForm
