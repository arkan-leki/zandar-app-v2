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
            <Card.Img alt="..." variant="top" src=".."/>
            <Card.Body className='text-center'>
                <a href='#!' className='grey-text'>
                    <h5>{item.barcode}</h5>
                </a>
                <Card.Title><strong>{item.name}</strong></Card.Title>
                {/*<Card.Text><h4>{Currency(parseFloat(item.finalprice))}</h4></Card.Text>*/}
                <ListGroup className="list-group-flush">
                    <ListGroupItem>نرخ
                        : {Currency(parseFloat(item.finalprice))}</ListGroupItem>
                    <ListGroupItem>ماوە : {item.mawe}</ListGroupItem>
                    <input type={'number'} value={quantity} onChange={event => setQuantity(event.target.valueAsNumber)}/>
                </ListGroup>
                <Card.Footer className="px-1">
                    <Button variant="primary" onClick={() => addToCart(
                        {
                            "temp": true,
                            "item": item.id,
                            "item_name": item.name,
                            "item_code": item.barcode,
                            "mawe": item.mawe,
                            "finalprice": item.finalprice,
                            "total": (parseFloat(item.mawe) * parseFloat(item.finalprice)),
                            "item_group": item.group_name,
                            "item_price": item.price,
                            "quantity": item.mawe,
                            "price": item.finalprice,
                            "sell": sale.id,
                        },
                    )}><FontAwesomeIcon
                        icon={faCartPlus}/><span>هەڵگرتن</span></Button>
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default CartItem