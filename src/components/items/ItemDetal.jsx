import {Row, Col, Table, Form, Button} from "react-bootstrap";
import React, {useContext, useState} from "react";
import {ItemDetailContext} from "../../contexts/ItemDetailContext";
import Currency from "../../helper/Currency";
import Select from "react-select";
import {CatsContext} from "../../contexts/CategoresContext";

const ItemDetail = () => {
    const {sales, item, updateItem} = useContext(ItemDetailContext)
    const {cats} = useContext(CatsContext)

    const catsOpt = [...cats.map((opt) => ({value: opt.id, label: opt.name}))]

    const [name, setName] = useState(item.name)
    // const [bag, setBag] = useState(item.bag)
    // const [wight, setWight] = useState(item.wight)
    // const [quantity, setQuantity] = useState(item.quantity)
    const [code, setCode] = useState(item.barcode)
    const [price, setPrice] = useState(item.price)
    const [addPrice, setAddPrice] = useState(item.addprice)
    const [stock, setStock] = useState(item.stock)
    const [category, setCategory] = useState(item.category)


    const handleSubmit = (e) => {
        e.preventDefault();
        updateItem(item.id,
            {
                "name": name,
                "bag": item.bag,
                "wight": item.wight,
                "quantity": item.quantity,
                "barcode": code,
                "price": price,
                "addprice": addPrice,
                "stock": stock,
                "image": null,
                "deleted": false,
                "category": category,
            }
        );
    }
    return (
        <section>
            <Row className={"p-5"}>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>جۆر</Form.Label>
                            <Select defaultValue={catsOpt[item.category - 1]} placeholder="هەڵبژاردن..." name="group"
                                    options={catsOpt} onChange={(e) => setCategory(e.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>فرۆشگا</Form.Label>
                            <Form.Control type='text' defaultValue={item.name} onChange={(event) => setName(event.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>کۆد</Form.Label>
                            <Form.Control type='text' defaultValue={item.barcode} onChange={(event) => setCode(event.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>نرخ</Form.Label>
                            <Form.Control type='number' defaultValue={item.price} onChange={(event) => setPrice(event.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>رێژە</Form.Label>
                            <Form.Control type='number' defaultValue={(item.addprice)}
                                          onChange={(event) => setAddPrice(event.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>مانەوەی یەکەمجار</Form.Label>
                            <Form.Control type='number' defaultValue={item.stock} min={0}
                                          onChange={(event) => setStock(event.target.value)}/>
                        </Form.Group>
                        <hr/>
                        <Button variant="success" type="submit">
                            زیادکردنی داواکاری
                        </Button>
                    </Form>
                </Col>
                <Col>
                    <div className="table-title">
                        <h2>دەرچوونەکانی <b>{item.name}</b></h2>
                    </div>
                    <Table>
                        <thead>
                        <tr>
                            <th># زنجیرە</th>
                            <th> دانە</th>
                            <th> نرخ</th>
                            <th> بەروار</th>
                            <th> وەسڵ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sales.map((item) => (
                            <tr>
                                <th>{item.id}</th>
                                <th>{item.quantity}</th>
                                <th>{item.price}$</th>
                                <th>{item.date}</th>
                                <th>{item.sell}</th>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <th>{Object.values(sales).reduce((r) => r + 1,0)}</th>
                        <th>{Object.values(sales).reduce((r, {quantity}) => r + parseFloat(quantity),0)}</th>
                        <th>{Currency(Object.values(sales).reduce((r, {price}) => r + parseFloat(price),0))}</th>
                        </tfoot>
                    </Table>
                </Col>
            </Row>
        </section>
    )
}

export default ItemDetail