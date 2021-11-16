import {faCartArrowDown, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import moment from 'moment'
import {useContext, useEffect, useState} from 'react'
import {Button, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {SalesContext} from '../../contexts/SalesContext'
import Currency from '../../helper/Currency'
import EditForm from "./EditForm";
import SaleToPrint from "../SaleToPrint";
import ReSale from "./ReSale";

const Sale = ({sale}) => {
    const {deleteSale, updateSale} = useContext(SalesContext)
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const [status, setStatus] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleShow2 = () => setShow2(true);
    const handleClose2 = () => setShow2(false);
    const handleStatus = (stat) => {
        setStatus(!stat)
        updateSale(sale.id, {"status": !stat})
    }
    useEffect(() => {
        handleClose()
        handleClose2()
    }, [sale])

    const handleDelete = (saleID) => {
        if (window.confirm("دڵنیای دەتەوێت بیسڕیتەوە")) {
            deleteSale(saleID)
        } else {
            console.log('Thing was saved to the database.');
        }
    }

    return (
        <>
            <td className="d-print-none">{sale.group_name}</td>
            <td className="d-print-none">{sale.vendor_name}</td>
            <td><Link to={``}>{sale.id}</Link></td>
            <td className="fs-5 ">{sale.local_name}
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            وردەکاری
                        </Tooltip>
                    }>
                    <Link className="d-print-none" to={`/saleDetail/${sale.id}`}>
                        <FontAwesomeIcon
                            icon={faEdit}/></Link>
                </OverlayTrigger>

            </td>
            <td>{sale.totallBar}</td>
            <td>{sale.local_region} </td>
            <td>{Currency(parseFloat(sale.totall))} </td>
            <td>{Currency(parseFloat(sale.discount))} </td>
            <td>{Currency(parseFloat(sale.totallint))} </td>
            <td>{Currency(parseFloat(sale.totalback))} </td>
            <td>{moment(new Date(sale.date)).format("DD/MM/YYYY")}</td>
            <td className="d-print-none">
                <Form.Check className="mb-1 pl-0">
                    <Form.Check.Label>
                        <Form.Check.Input
                            defaultChecked={sale.status}
                            value={status}
                            type="checkbox"
                            onChange={() => handleStatus(sale.status)}
                        />
                        <span className="form-check-sign"/>
                    </Form.Check.Label>
                </Form.Check>
            </td>
            <td className="d-print-none">{moment(new Date(sale.datetime)).format("DD/MM/YYYY HH:MM:SS")}</td>
            <td className="d-print-none">
                <SaleToPrint sale={sale}/>
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
                            گەڕانەوە
                        </Tooltip>
                    }>
                    <Button variant={"outline-danger"} onClick={handleShow2} data-toggle="modal">
                        <FontAwesomeIcon icon={faCartArrowDown}/></Button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            سڕینەوە
                        </Tooltip>
                    }>
                    <Button variant={"outline-danger"} onClick={() => handleDelete(sale.id)} data-toggle="modal">
                        <FontAwesomeIcon icon={faTrash}/></Button>
                </OverlayTrigger>
            </td>

            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        گەڕانەوە فرۆش
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReSale theSale={sale}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        داخستن
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                         نوێکردنەوەی فرۆش
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm theSale={sale}/>
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

export default Sale
