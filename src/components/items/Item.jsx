import Currency from "../../helper/Currency";
import { Button, Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../../contexts/ItemsContext";
import ItemEditForm from "./ItemEditForm";

const Item = ({ item , showHidden }) => {
    const { deleteItem, updateItem } = useContext(ItemsContext)
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
            <td ><img src={item.image} width={100 + 'px'}
                className=" rounded-start m-2" alt="....." height={100 + 'px'} />{item.id}
            </td>
            <td>{item.barcode}</td>
            <td>{item.group_name}</td>
            <td hidden={showHidden}>{item.trader}</td>
            <td hidden={showHidden}>{item.category_name}</td>
            <td> {item.name}</td>
            <td hidden={showHidden} className="d-print-none">{Currency(parseFloat(item.price))} </td>
            <td hidden={showHidden} className="d-print-none">{parseFloat(item.addprice * 100).toFixed(2)}%</td>
            <td>{Currency(parseFloat(item.finalprice))} </td>
            <td hidden={showHidden}>{item.bag}</td>
            <td hidden={showHidden}> {item.quantity}</td>
            <td hidden={showHidden}>{item.wight} کگم</td>
            <td hidden={showHidden}>{item.wightAll} کگم</td>
            <td hidden={showHidden}>{item.stock}</td>
            <td hidden={showHidden} className="d-print-none">{item.ordered}</td>
            <td hidden={showHidden} className="d-print-none">{item.popularity}</td>
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
                            icon={faAddressCard} /></Link>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            گۆڕین
                        </Tooltip>
                    }>
                    <Button variant={"outline-warning"} onClick={handleShow} data-toggle="modal">
                        <FontAwesomeIcon icon={faEdit} /></Button>
                </OverlayTrigger>
                {/* <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            سڕینەوە
                        </Tooltip>
                    }>
                    <Button variant={"outline-danger"} onClick={() => handleDelete(item.id)} data-toggle="modal">
                        <FontAwesomeIcon icon={faTrash}/></Button>
                </OverlayTrigger> */}
            </td>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        نوێکردنەوەی کاڵا
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ItemEditForm theItem={item} />
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