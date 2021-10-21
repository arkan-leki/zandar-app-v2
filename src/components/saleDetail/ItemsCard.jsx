import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {ItemsContext} from "../../contexts/ItemsContext";
import React, {useContext, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import {SaleDetailContext} from "../../contexts/SaleDetailContext";
import CartItem from "./CartItem";


const ItemsCard = ({sale}) => {
    const {items, filterItems, itemForList} = useContext(ItemsContext)
    const {addToList} = useContext(SaleDetailContext)
    const [text, setText] = useState([])


    const handleChange = (data) => {
        filterItems(data)
    }

    const handeInput = (value) => {
        setText(value)
        handleChange(value)
    }

    const codeOpt = [{value: '0', label: 'هەموو'}, ...itemForList.filter((i)=> i.group === sale.group).map((opt) => ({
        value: opt.barcode,
        label: opt.barcode
    }))]

    const addToCart = (data) => {
        addToList(data)
    }

    return (
        <>
            <section className='text-center my-5'>
                <h2 className='h1-responsive font-weight-bold text-center my-5'>Our bestsellers</h2>
                <Form>
                    <InputGroup>
                        <Select placeholder="هەڵبژاردن..." name="group" className="form-control rounded"
                                options={codeOpt} onChange={(event) => handeInput(event.value)}/>
                        <Button variant="outline-primary" onClick={() => handleChange(text)}><FontAwesomeIcon
                            icon={faSearch}/></Button>
                    </InputGroup>
                </Form>
                <Row>
                    {items.filter((i)=> i.group === sale.group).map((item, index) =>
                        (
                            <Col key={index} lg='4' md='6' className='mb-lg-0 mb-4'>
                                <CartItem sale={sale} addToCart={addToCart} item={item}/>
                            </Col>
                        )
                    )}
                </Row>
            </section>
        </>
    )
}

export default ItemsCard