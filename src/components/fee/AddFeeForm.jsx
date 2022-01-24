import React, { useContext, useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Select from "react-select";
import { FeesContext } from '../../contexts/FeeContext';
import { GroupsContext } from '../../contexts/GroupsContext';
import Currency from '../../helper/Currency';

const AddFeeForm = () => {
    const { addFee } = useContext(FeesContext);
    const { groups } = useContext(GroupsContext)

    const groupsOpt = [...groups.map((opt) => ({ value: opt.id, label: opt.name }))]

    const [payed, setPayed] = useState(0)
    const [loan, setLoan] = useState(0)
    const reasonRef = useRef('')
    const [group, setGroup] = useState(0)
    const [dinar, setDinar] = useState(1480)

    const handleSubmit = (e) => {
        e.preventDefault();
        addFee(
            {
                "name": reasonRef.current,
                "group": group,
                "bank": null
            },
            {
                "group": group,
                "income": parseFloat(payed/dinar).toFixed(2),
                "loan":  parseFloat(loan/dinar).toFixed(2)
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label> هۆکار و ژمارەی مسڕف</Form.Label>
                <Form.Control type="text" ref={reasonRef} onChange={(event)=>reasonRef.current=event.target.value} />
            </Form.Group>
            <Form.Group>
                <Form.Label>بۆ بەشی</Form.Label>
                <Select defaultValue={groupsOpt[group - 1]} placeholder="هەڵبژاردن..." name="group" options={groupsOpt}
                    onChange={(e) => setGroup(e.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>پارەی گەڕوە</Form.Label>
                <Form.Control type="text" defaultValue={payed} onChange={(event) => setPayed(event.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>پارەی دراو</Form.Label>
                <Form.Control type='text' defaultValue={loan} onChange={(event) => setLoan(event.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>نرخی دۆلار</Form.Label>
                <Form.Control type='number' defaultValue={dinar} onChange={(event) => setDinar(event.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>بەدۆلار</Form.Label>
                <Form.Control type='text' value={Currency((payed-loan) /dinar )} disabled={true} />
            </Form.Group>
            <hr />
            <Button variant="success" type="submit">
                زیادکردنی مبلغ
            </Button>
        </Form>
    )
}

export default AddFeeForm
