import Currency from "../../helper/Currency";
import {Button, Form, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressCard, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useContext, useEffect, useState} from "react";
import {ItemsContext} from "../../contexts/ItemsContext";
import ItemEditForm from "./ItemEditForm";

const Item = ({item}) => {
    const {deleteItem, updateItem} = useContext(ItemsContext)
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(item.deleted);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose()
    }, [item])

    const handleStatus = (stat) => {
        setStatus(stat)
        updateItem(item.id, { "deleted": stat })
    }

    const handleDelete = (saleID) => {
        if (window.confirm("دڵنیای دەتەوێت بیسڕیتەوە")) {
            deleteItem(saleID)
        } else {
            console.log('Thing was saved to the database.');
        }
    }

    return (
        <>
            <td className="d-print-none"><img src={item.image} width={100 + 'px'}
                     className=" rounded-start m-2 d-print-none" alt="....." height={100 + 'px'}/>{item.id}
            </td>
            <td>{item.barcode}</td>
            <td>{item.group_name}</td>
            <td hidden={true}>{item.trader}</td>
            <td hidden={true}>{item.category_name}</td>
            <td> {item.name}</td>
            <td className="d-print-none">{Currency(parseFloat(item.price))} </td>
            <td className="d-print-none">{parseFloat(item.addprice * 100).toFixed(2)}%</td>
            <td>{Currency(parseFloat(item.finalprice))} </td>
            <td hidden={true}>{item.bag}</td>
            <td hidden={true}> {item.quantity}</td>
            <td hidden={true}>{item.wight} کگم</td>
            <td hidden={true}>{item.wightAll} کگم</td>
            <td hidden={true}>{item.stock}</td>
            <td >{item.ordered}</td>
            <td>{item.popularity}</td>
            <td>{item.mawe}</td>
            <td className="d-print-none">
                {<Form.Check className="mb-1 pl-0">
                    <Form.Check.Label>
                        <Form.Check.Input
                            checked={item.deleted}
                            type="checkbox"
                            onChange={() => handleStatus(!status)}
                        />
                        <span className="form-check-sign" />
                    </Form.Check.Label>
                </Form.Check>}
            </td>
            <td className="d-print-none">
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            زانیاری
                        </Tooltip>
                    }>
                    <Link className="btn btn-outline-primary" to={`/itemDetail/${item.id}`}>
                        <FontAwesomeIcon
                            icon={faAddressCard}/></Link>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            گۆڕین
                        </Tooltip>
                    }>
                    <Button variant={"outline-warning"} onClick={handleShow} data-toggle="modal">
                        <FontAwesomeIcon icon={faEdit}/></Button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            سڕینەوە
                        </Tooltip>
                    }>
                    <Button variant={"outline-danger"} onClick={() => handleDelete(item.id)} data-toggle="modal">
                        <FontAwesomeIcon icon={faTrash}/></Button>
                </OverlayTrigger>
            </td>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        نوێکردنەوەی کاڵا
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ItemEditForm theItem={item}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        داخستن
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Item