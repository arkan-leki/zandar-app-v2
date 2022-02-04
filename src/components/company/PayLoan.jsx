import {Button, Form} from "react-bootstrap";
import Select from "react-select";
import React, {useContext, useState} from "react";
import { GroupsContext } from '../../contexts/GroupsContext';
import { TradersContext } from '../../contexts/TradersContext';
import Currency from "../../helper/Currency";

const PayLoan = ({ theTrader }) => {
    const { addPayLoan } = useContext(TradersContext);
    const { groups } = useContext(GroupsContext)

    const groupsOpt = [...groups.map((opt) => ({ value: opt.id, label: opt.name }))]

    const [payed, setPayed] = useState(0)
    const [loan, setLoan] = useState(0)
    const [group, setGroup] = useState(theTrader.group)
    const [dinar, setDinar] = useState(1480)

    const handleSubmit = (e) => {
        e.preventDefault();
        addPayLoan(
            {
                "group": group,
                "trader": theTrader.id,
                "bank": null
            },
            {
                "group": group,
                "income": payed,
                "loan": loan
            }
        );
    }

    return <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Label>بنکەی وەسڵ</Form.Label>
            <Select defaultValue={groupsOpt[group - 1]} placeholder="هەڵبژاردن..." name="group" options={groupsOpt}
                onChange={(e) => setGroup(e.value)} />
        </Form.Group>
        <Form.Group>
            <Form.Label>پارەی وەگیراو</Form.Label>
            <Form.Control type="text" defaultValue={payed} onChange={(event) => setPayed(event.target.value)} />
        </Form.Group>
        <Form.Group>
            <Form.Label>جیاوازی دراو</Form.Label>
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
};

export default PayLoan;
