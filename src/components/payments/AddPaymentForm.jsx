import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Select from "react-select";
import { GroupsContext } from '../../contexts/GroupsContext';
import { LocalsContext } from '../../contexts/LocalsContext';
import { PaymentsContext } from '../../contexts/PaymentsContext';
import Currency from '../../helper/Currency';

const AddPaymentForm = () => {
    const {addPayment} = useContext(PaymentsContext);
    const {groups} = useContext(GroupsContext)
    const {locals} = useContext(LocalsContext)

    const groupsOpt = [...groups.map((opt) => ({value: opt.id, label: opt.name}))]
    const localsOpt = [...locals.map((opt) => ({value: opt.id, label: opt.name}))]

    const [payed, setPayed] = useState(0)
    const [loan, setLoan] = useState(0)
    const [local, setLocal] = useState(0)
    const [group, setGroup] = useState(0)
    const [dinar, setDinar] = useState(1480)

    const handleSubmit = (e) => {
        e.preventDefault();
        addPayment(
            {
                "group": group,
                "local": local,
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
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>کڕیار</Form.Label>
                <Select defaultValue={localsOpt[group - 1]} placeholder="هەڵبژاردن..." name="group" options={localsOpt}
                        onChange={(e) => setLocal(e.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>بنکەی وەسڵ</Form.Label>
                <Select defaultValue={groupsOpt[group - 1]} placeholder="هەڵبژاردن..." name="group" options={groupsOpt}
                        onChange={(e) => setGroup(e.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>پارەی دراو</Form.Label>
                <Form.Control type="text" defaultValue={payed} onChange={(event) => setPayed(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>جیاوازی حساب</Form.Label>
                <Form.Control type='text' defaultValue={loan} onChange={(event) => setLoan(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>نرخی دینار</Form.Label>
                <Form.Control type='number' defaultValue={dinar} onChange={(event) => setDinar(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>بەدینار</Form.Label>
                <Form.Control type='text' value={Currency(payed * dinar)} disabled={true}/>
            </Form.Group>
            <hr/>
            <Button variant="success" type="submit">
                زیادکردنی مبلغ
            </Button>
        </Form>
    )
}

export default AddPaymentForm
