import React, { useContext, useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Select from 'react-select';
import { CatsContext } from '../../contexts/CategoresContext';
import { GroupsContext } from '../../contexts/GroupsContext';
import { ItemsContext } from '../../contexts/ItemsContext';
import { TradersContext } from '../../contexts/TradersContext';

const AddNewItemForm = () => {
    const { addNewItem } = useContext(ItemsContext);
    const { groups } = useContext(GroupsContext)
    const { traders } = useContext(TradersContext)
    const { cats } = useContext(CatsContext)

    const [trader, setTrader] = useState('')
    const [group, setGroup] = useState('')
    const [category, setCat] = useState('')

    const groupsOpt = [...groups.map((opt) => ({ value: opt.id, label: opt.name }))]
    const tradersOpt = [...traders.map((opt) => ({ value: opt.id, label: opt.name }))]
    const catsOpt = [...cats.map((opt) => ({ value: opt.id, label: opt.name }))]

    
    const nameRef = useRef("")
    const bagRef = useRef("")
    const codeRef = useRef("")
    const wightRef = useRef(0)
    const priceRef = useRef(0)
    const addpriceRef = useRef(0)

    const handleSubmit = (e) => {
        e.preventDefault();
        addNewItem({
            "name": nameRef.current,
            "bag": bagRef.current,
            "wight": wightRef.current,
            "price": priceRef.current,
            "addprice": addpriceRef.current,
            "quantity": 0,
            "barcode": codeRef.current,
            "stock": 0,
            "image": null,
            "deleted": false,
            "category": category,
            "group": group,
            "trader": trader
        });
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label >بنکە</Form.Label>
                <Select placeholder="هەڵبژاردن..." name="group" options={groupsOpt}
                    onChange={(e) => setGroup(e.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label >کۆمپانیا</Form.Label>
                <Select placeholder="هەڵبژاردن..." name="trader" options={tradersOpt}
                    onChange={(e) => setTrader(e.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label >جۆر</Form.Label>
                <Select placeholder="هەڵبژاردن..." name="cat" options={catsOpt}
                    onChange={(e) => setCat(e.value)} />
            </Form.Group>
            <hr />
            <Form.Group>
                <Form.Label >ناو</Form.Label>
                <Form.Control type='text' ref={nameRef} onChange={(event) => nameRef.current = event.target.value} />
            </Form.Group>
            <Form.Group>
                <Form.Label >بستە</Form.Label>
                <Form.Control type='text' ref={bagRef} onChange={(event) => bagRef.current = event.target.value} />
            </Form.Group>
            <Form.Group>
                <Form.Label >کێش</Form.Label>
                <Form.Control type='text' ref={wightRef} onChange={(event) => wightRef.current = event.target.value} />
            </Form.Group>
            <Form.Group>
                <Form.Label >کۆد</Form.Label>
                <Form.Control type='text' ref={codeRef} onChange={(event) => codeRef.current = event.target.value} />
            </Form.Group>
            <Form.Group>
                <Form.Label >نرخ</Form.Label>
                <Form.Control type='text' ref={priceRef} onChange={(event) => priceRef.current = event.target.value} />
            </Form.Group>
            <Form.Group>
                <Form.Label >نسبە</Form.Label>
                <Form.Control type="text" ref={addpriceRef} onChange={(event) => addpriceRef.current = event.target.value} />
            </Form.Group>
            <hr />
            <Button variant="success" type="submit">
                زیادکردنی کالا
            </Button>
        </Form>
    )
}

export default AddNewItemForm
