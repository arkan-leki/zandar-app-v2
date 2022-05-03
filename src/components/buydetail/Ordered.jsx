import React, { useContext, useState } from 'react'
import { Form, InputGroup, ButtonGroup, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Currency from '../../helper/Currency';
import { BuyDetailContext } from '../../contexts/BuyDetailContext';

const Ordered = ({ ordered }) => {
    const { addOrdered, editOrdered, deleteOrdered, updateItem } = useContext(BuyDetailContext)
    const [quantity, setQuantity] = useState(ordered.quantity)
    const [price, setPrice] = useState(ordered.price)

    const handleUpload = () => {
        addOrdered(ordered.id, {
            "quantity": quantity,
            "price": parseFloat(price),
            "order": ordered.order,
            "item": ordered.item
        })
    };

    const handleUpdate = () => {
        editOrdered(ordered.id, {
            "quantity": quantity,
            "price": parseFloat(price),
            "order": ordered.order,
            "item": ordered.item
        })
    };

    
    const handlePrice = () => {
        updateItem(ordered.item, {
            "price": parseFloat(price),
        })
    };
    const handleDeleted = () => {
        updateItem(ordered.item, {
            "deleted": false,
        })
    };

    const handleDelete = () => {
        if (window.confirm("دڵنیای دەتەوێت بیسڕیتەوە")) {
            deleteOrdered(ordered.id)
        } else {
            console.log('Thing was saved to the database.');
        }
    };

    return (
        <>
            <td>{ordered.id}</td>
            <td>{ordered.item_code}</td>
            <td>{ordered.item_name}</td>
            <td>{Currency(parseFloat(ordered.item_price))}</td>
            <td>
                <InputGroup>
                    <Form.Control name={"price"} type={"number"} min={0.0}
                        value={price}
                        onChange={event => setPrice(event.target.value)} />
                </InputGroup>
            </td>
            <td>
                <InputGroup>
                    <Form.Control name={"quantity"} type={"number"} min={0}
                        value={quantity}
                        onChange={event => setQuantity(event.target.value)} />
                </InputGroup>
            </td>
            <td>{Currency(parseFloat(price*quantity))}</td>
            <td>
                <ButtonGroup>
                    {(ordered.temp) || <Button variant={"warning"} onClick={handleUpdate}>
                        <FontAwesomeIcon icon={faEdit} /> گۆڕین </Button>}
                    <Button variant={"outline-danger"} onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrashAlt} /> سڕیەنەوە </Button>
                    {(!ordered.temp) || <Button variant={"outline-success"} onClick={handleUpload}>
                        <FontAwesomeIcon icon={faCartPlus} /> خەزنکردن </Button>}
                    {(!(parseFloat(ordered.item_price) < parseFloat(price))) ? <Button variant={"danger"} onClick={handlePrice}>
                        <FontAwesomeIcon icon={faCartPlus} /> نوێکردنەوە </Button>:<Button variant={"success"} onClick={handlePrice}>
                        <FontAwesomeIcon icon={faCartPlus} /> نوێکردنەوە </Button>}
                    {(!ordered.item_deleted)  || <Button variant={"danger"} onClick={handleDeleted}>
                        <FontAwesomeIcon icon={faCartPlus} /> چالاککردنەوە </Button>}
                </ButtonGroup>
            </td>
        </>
    )
}

export default Ordered
