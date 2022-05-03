import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Select from "react-select";
import { GroupsContext } from '../../contexts/GroupsContext';
import { Locals2Context } from '../../contexts/Locals2Context';
import { PaymentsContext } from '../../contexts/PaymentsContext';
import Currency from '../../helper/Currency';

const EditPayForm = ({ dpay }) => {
    const { updatePayment, updateBank } = useContext(PaymentsContext);
    const { groups } = useContext(GroupsContext)
    const { locals } = useContext(Locals2Context)

    const groupsOpt = [...groups.map((opt) => ({ value: opt.id, label: opt.name }))]
    const localsOpt = [...locals.map((opt) => ({value: opt.id, label: `${opt.name} ${opt.region_name} ${opt.code}`}))]

    const [payed, setPayed] = useState(dpay.bank_income)
    const [loan, setLoan] = useState(dpay.bank_loan)
    const [local, setLocal] = useState(dpay.local)
    const [group, setGroup] = useState(dpay.group)
    const [dinar, setDinar] = useState(1480)

    const handleSubmit = (e) => {
        e.preventDefault();
        updatePayment(dpay.id,
            {
                "group": group,
                "local": local,
                "bank": dpay.bank
            },
        )
        updateBank(dpay.bank,
            {
                "group": group,
                "income": payed,
                "loan": loan
            }
        )
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>کڕیار</Form.Label>
                <Select value={
                    localsOpt.filter(option =>
                        option.value === local)
                } placeholder="هەڵبژاردن..." name="local" options={localsOpt}
                    onChange={(e) => setLocal(e.value)} />
            </Form.Group>
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
    )
}

export default EditPayForm