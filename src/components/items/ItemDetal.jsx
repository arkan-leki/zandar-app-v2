import { Row, Col, Table, Form, Button, Image } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { ItemDetailContext } from "../../contexts/ItemDetailContext";
import Currency from "../../helper/Currency";
import Select from "react-select";
import { CatsContext } from "../../contexts/CategoresContext";

const ItemDetail = () => {
    const { sales, item, updateItem, updateImage } = useContext(ItemDetailContext)
    const { cats } = useContext(CatsContext)

    const catsOpt = [...cats.map((opt) => ({ value: opt.id, label: opt.name }))]

    const [name, setName] = useState(item.name)
    const [bag, setBag] = useState(item.bag)
    const [wight, setWight] = useState(item.wight)
    const [quantity, setQuantity] = useState(item.quantity)
    const [code, setCode] = useState(item.barcode)
    const [price, setPrice] = useState(item.price)
    const [addPrice, setAddPrice] = useState(item.addprice)
    const [stock, setStock] = useState(item.stock)
    const [category, setCategory] = useState(item.category)
    const [deleted, setDeleted] = useState(item.deleted)
    const [image, setImage] = useState('')
    const [isSelected, setIsSelected] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault();
        updateItem(item.id,
            {
                "name": name,
                "bag": bag,
                "wight": wight,
                "price": price,
                "addprice": addPrice,
                "quantity": quantity,
                "barcode": code,
                "stock": stock,
                "deleted": deleted,
                "category": category,
            }
        )
        if (isSelected) {
            let formData = new FormData();
            formData.append("image", image.f);
            console.log(formData)
            updateImage(item.id,
                formData
            )
        }
    }

    const Imagehandler = (event) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage({ p: reader.result, f: event.target.files[0] });
            }
        }
        reader.readAsDataURL(event.target.files[0]);
        setIsSelected(true)
    };

    return (
        <section>
            <Row className={"p-5"}>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>جۆر</Form.Label>
                            <Select defaultValue={catsOpt[item.category - 1]} placeholder={item.category_name} name="group"
                                options={catsOpt} onChange={(e) => setCategory(e.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>کاڵا</Form.Label>
                            <Form.Control type='text' defaultValue={item.name} onChange={(event) => setName(event.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>بەستەکارن</Form.Label>
                            <Form.Control type='text' defaultValue={item.bag} onChange={(event) => setBag(event.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>کیش</Form.Label>
                            <Form.Control type='text' defaultValue={item.wight} onChange={(event) => setWight(event.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>دانە</Form.Label>
                            <Form.Control type='text' defaultValue={item.quantity} onChange={(event) => setQuantity(event.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>کۆد</Form.Label>
                            <Form.Control type='text' defaultValue={item.barcode} onChange={(event) => setCode(event.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>نرخ</Form.Label>
                            <Form.Control type='text' defaultValue={item.price} onChange={(event) => setPrice(event.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>رێژە</Form.Label>
                            <Form.Control type='text' defaultValue={(item.addprice)}
                                onChange={(event) => setAddPrice(event.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>مانەوەی یەکەمجار</Form.Label>
                            <Form.Control type='number' defaultValue={item.stock}
                                onChange={(event) => setStock(event.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check >
                                <Form.Check.Label>
                                    دۆخ
                                    <Form.Check.Input
                                        defaultChecked={item.deleted}
                                        value={deleted}
                                        type="checkbox"
                                        onChange={() => setDeleted(item.deleted)}
                                    />
                                    <span className="form-check-sign" />
                                </Form.Check.Label>
                            </Form.Check>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>وێنە</Form.Label>
                            <Image src={isSelected ? image.p : item.image} />
                            <Form.Control type="file" onChange={Imagehandler} />
                        </Form.Group>
                        <hr />
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
                            <th>{Object.values(sales).reduce((r) => r + 1, 0)}</th>
                            <th>{Object.values(sales).reduce((r, { quantity }) => r + parseFloat(quantity), 0)}</th>
                            <th>{Currency(Object.values(sales).reduce((r, { price }) => r + parseFloat(price), 0))}</th>
                        </tfoot>
                    </Table>
                </Col>
            </Row>
        </section>
    )
}

export default ItemDetail