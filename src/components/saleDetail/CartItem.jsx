import {Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";
import Currency from "../../helper/Currency";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";

const CartItem = ({item, addToCart, sale}) => {
    const [quantity, setQuantity] = useState(item.mawe)
    return (
        <Card className={'bg-light mb-5'}>
            <Card.Header>{item.group_name}</Card.Header>
            <Card.Img variant="top" src={item.image} alt={'...'}/>
            <Card.Body className='text-center'>
                <a href={`/itemDetail/${item.id}`} className="text-decoration-none">
                    <h5>{item.barcode}</h5>
                </a>
                <Card.Title><strong>{item.name}</strong></Card.Title>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>نرخ
                        : {Currency(parseFloat(item.finalprice))}</ListGroupItem>
                    <ListGroupItem>ماوە : {item.mawe}</ListGroupItem>
                    <input type={'number'} value={quantity} onChange={event => setQuantity(event.target.valueAsNumber)}/>
                </ListGroup>
                <Card.Footer className="px-1">
                    <Button variant={item.deleted?"secondary":"primary"} onClick={() => addToCart(
                        {
                            "temp": true,
                            "item": item.id,
                            "item_name": item.name,
                            "item_code": item.barcode,
                            "mawe": item.mawe,
                            "finalprice": item.finalprice,
                            "total": (parseFloat(item.quantity) * parseFloat(item.finalprice)),
                            "item_group": item.group_name,
                            "item_price": item.price,
                            "quantity": quantity,
                            "price": item.finalprice,
                            "sell": sale.id,
                        },
                    )} disabled={item.deleted}><FontAwesomeIcon
                        icon={faCartPlus}/><span>هەڵگرتن</span></Button>
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default CartItem