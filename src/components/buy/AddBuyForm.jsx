import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Select from 'react-select'
import { BuysContext } from '../../contexts/BuyContext'
import { GroupsContext } from '../../contexts/GroupsContext'
import { TradersContext } from '../../contexts/TradersContext'

const AddBuyForm = (props) => {
    const {addBuy} = useContext(BuysContext)
    const {groups} = useContext(GroupsContext)
    const {traders} = useContext(TradersContext)

    const [group, setGroup] = useState('')
    const [trader, setTrader] = useState('')
    const [code, setCode] = useState('')

    const groupsOpt = [...groups.map((opt) => ({value: opt.id, label: opt.name}))]
    const traderOpt = [...traders.map((opt) => ({value: opt.id, label: opt.name}))]

    const handleSubmit = (e) => {
        e.preventDefault();
        addBuy(code, group, trader);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label >بنکە</Form.Label>
                <Select placeholder="هەڵبژاردن..." name="group" options={groupsOpt}
                        onChange={(e) => setGroup(e.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label >کۆمپانیا</Form.Label>
                <Select placeholder="هەڵبژاردن..." name="local" options={traderOpt}
                        onChange={(e) => setTrader(e.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>کۆد</Form.Label>
                <Form.Control type='text' defaultValue={code} onChange={(event) => setCode(event.target.value)}/>
            </Form.Group>
            <hr/>
            <Button variant="success" type="submit">
                زیادکردنی داواکاری
            </Button>
        </Form>
    )
}

export default AddBuyForm
