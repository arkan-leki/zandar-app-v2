import {Button, Form} from "react-bootstrap";
import Select from "react-select";
import React, {useContext, useState} from "react";
import {LocalsContext} from "../../contexts/LocalsContext";
import {GroupsContext} from "../../contexts/GroupsContext";
import Currency from "../../helper/Currency";

const LocalPayment = ({theLocal, groupid}) => {
    const {addPaymentLocal} = useContext(LocalsContext);
    const {groups} = useContext(GroupsContext)

    const groupsOpt = [...groups.map((opt) => ({value: opt.id, label: opt.name}))]

    const [payed, setPayed] = useState(0)
    const [loan, setLoan] = useState(0)
    const [group, setGroup] = useState(groupid)
    const [dinar, setDinar] = useState(1480)

    const handleSubmit = (e) => {
        e.preventDefault();
        addPaymentLocal(
            {
                "group": group,
                "local": theLocal.id,
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
                زیادکردنی داواکاری
            </Button>
        </Form>
    )
}
export default LocalPayment