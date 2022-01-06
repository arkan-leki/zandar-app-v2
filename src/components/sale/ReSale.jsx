import {Button, Form} from "react-bootstrap";
import Select from "react-select";
import React, {useContext, useState} from "react";
import { ReSellContext } from "../../contexts/ReSellContext";

const ReSale = ({theSale}) => {
    const {addReSale} = useContext(ReSellContext);

    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [item, setItem] = useState('')
    const itemsOpt = [...theSale.sell_detail.map((opt) => ({value: opt.item, label: opt.item_name, price: opt.price, quantity: opt.quantity}))]

    const handleSubmit = (e) => {
        e.preventDefault();
        addReSale(theSale.id, item, quantity, price);
    }

    const handleItem = (e) => {
        setItem(e.value)
        setPrice(e.price)
        setQuantity(e.quantity)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label >کاڵا</Form.Label>
                <Select placeholder="هەڵبژاردن..." name="item" options={itemsOpt}
                        onChange={(e) => handleItem(e)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>دانە</Form.Label>
                <Form.Control type='number' defaultValue={quantity} onChange={(event) => setQuantity(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>نرخ</Form.Label>
                <Form.Control type='number' defaultValue={price} onChange={(event) => setPrice(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>کۆ</Form.Label>
                <Form.Control type={"number"} defaultValue={price*quantity} value={price*quantity} disabled={true}/>
            </Form.Group>
            <hr/>
            <Button variant="success" type="submit">
                گەڕانەوە بۆ مخزن
            </Button>
        </Form>
    )
}

export default ReSale