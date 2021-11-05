import {Button, Form} from "react-bootstrap";
import Select from "react-select";
import React, {useContext, useState} from "react";
import {ItemsContext} from "../../contexts/ItemsContext";
import {CatsContext} from "../../contexts/CategoresContext";

const ItemEditForm = ({theItem}) => {
    const {updateItem} = useContext(ItemsContext);
    const {cats} = useContext(CatsContext)


    const catsOpt = [...cats.map((opt) => ({value: opt.id, label: opt.name}))]

    const [name, setName] = useState(theItem.name)
    // const [bag, setBag] = useState(theItem.bag)
    // const [wight, setWight] = useState(theItem.wight)
    // const [quantity, setQuantity] = useState(theItem.quantity)
    const [code, setCode] = useState(theItem.barcode)
    const [price, setPrice] = useState(theItem.price)
    const [addPrice, setAddPrice] = useState(parseFloat(theItem.addprice) * 100)
    const [stock, setStock] = useState(theItem.stock)
    const [category, setCategory] = useState(theItem.category)

    const handleSubmit = (e) => {
        e.preventDefault();
        updateItem(theItem.id,
            {
                "name": name,
                "bag": theItem.bag,
                "wight": theItem.wight,
                "quantity": theItem.quantity,
                "barcode": code,
                "price": price,
                "addprice": addPrice / 100,
                "stock": stock,
                "image": null,
                "deleted": false,
                "category": category,
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>جۆر</Form.Label>
                <Select defaultValue={catsOpt[theItem.category - 1]} placeholder="هەڵبژاردن..." name="group"
                        options={catsOpt} onChange={(e) => setCategory(e.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>فرۆشگا</Form.Label>
                <Form.Control type='text' defaultValue={name} onChange={(event) => setName(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>کۆد</Form.Label>
                <Form.Control type='text' defaultValue={code} onChange={(event) => setCode(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>نرخ</Form.Label>
                <Form.Control type='number' defaultValue={price} onChange={(event) => setPrice(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>رێژە</Form.Label>
                <Form.Control type='number' defaultValue={addPrice}
                              onChange={(event) => setAddPrice(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>مانەوەی یەکەمجار</Form.Label>
                <Form.Control type='number' defaultValue={stock} min={0}
                              onChange={(event) => setStock(event.target.value)}/>
            </Form.Group>
            <hr/>
            <Button variant="success" type="submit">
                زیادکردنی داواکاری
            </Button>
        </Form>
    )
}

export default ItemEditForm