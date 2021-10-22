import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Currency from "../../helper/Currency";
import {useContext, useState} from "react";
import {SaleDetailContext} from "../../contexts/SaleDetailContext";

const SaleItem = ({kala}) => {
    const {updateSale, deleteSale, addSale} = useContext(SaleDetailContext)
    const [quantity, setQuantity] = useState(kala.quantity)
    const [price] = useState(kala.price)

    const handleUpdate = () => {
        updateSale(kala.id, {"quantity": quantity})
    };

    const handleUpload = () => {
        addSale(kala.id, {
            "quantity": quantity,
            "price": kala.finalprice,
            "sell": kala.sell,
            "item": kala.item
        })
    };

    const handleDelete = () => {
        if(window.confirm("areu sure")){
            deleteSale(kala.id)
        }else{
            console.log('Thing was saved to the database.');
        }
    };

    const handleInput = (value) => {
        setQuantity(value)
    };


    return (
        <Row className="mb-4">
            <Col md={5} lg={3} xl={3}>
                <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                    <a href={`/items/${kala.item_id}`}>{kala.id}
                        <div className="mask">
                            <img className="img-fluid w-50"
                                 src={kala.image} alt={'...'}/>
                            <div className="mask rgba-black-slight"/>
                        </div>
                    </a>
                </div>
            </Col>
            <Col md={7} xl={9} lg={9}>
                <div>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h5>{kala.item_name}</h5>
                            <p className="mb-3 text-muted text-uppercase small"> کۆد
                                :{kala.item_code} </p>
                            <p className="mb-3 text-muted text-uppercase small"> نرخ
                                :{Currency(parseFloat(kala.finalprice))} </p>
                            <p className="mb-2 text-muted text-uppercase small"> گروپ
                                :{kala.item_group_name} </p>
                            <p className="mb-3 text-muted text-uppercase small"> ماوە
                                :{kala.mawe}</p>
                        </div>
                        <div>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>$</InputGroup.Text>
                                <InputGroup.Text>{Currency(parseFloat(price))}</InputGroup.Text>
                                <Form.Control name={"price"} type={"number"} min={0}
                                              value={quantity}
                                              onChange={event => handleInput(event.target.value)}
                                              aria-label="Dollar amount (with dot and two decimal places)"/>
                            </InputGroup>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <Button variant={"outline-danger"} onClick={handleDelete}><FontAwesomeIcon
                                icon={faTrashAlt}/> سڕیەنەوە </Button>
                            {kala.temp || <Button variant={"outline-warning"} onClick={handleUpdate}><FontAwesomeIcon
                                icon={faCartPlus}/> نوێکردنەوە </Button>}
                            {(!kala.temp) || <Button variant={"outline-success"} onClick={handleUpload}><FontAwesomeIcon
                                icon={faCartPlus}/> خەزنکردن </Button>}
                        </div>
                        <p className="mb-0"><span><strong
                            id="summary">{Currency(quantity * parseFloat(price))}</strong></span>
                        </p>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default SaleItem