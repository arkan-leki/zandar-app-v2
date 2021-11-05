import {faAddressCard, faEdit, faMoneyBill, faTrash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useContext, useEffect, useState} from 'react'
import {Button, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Currency from '../../helper/Currency'
import {LocalsContext} from "../../contexts/LocalsContext";
import LocalEditForm from "./LocalEditForm";
import LocalPayment from "./LocalPayment";

const Local = ({local}) => {
    const {deleteLocal, groupFilter} = useContext(LocalsContext)
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleShow2 = () => setShow2(true);
    const handleClose2 = () => setShow2(false);
    useEffect(() => {
        handleClose()
        handleClose2()
    }, [local])

    const handleDelete = (saleID) => {
        if (window.confirm("دڵنیای دەتەوێت بیسڕیتەوە")) {
            deleteLocal(saleID)
        } else {
            console.log('Thing was saved to the database.');
        }
    }

    const counterList = (list) => {
        return groupFilter.value === 0 ? Object.values(list).reduce((r, item) => r + parseFloat(item), 0) : parseFloat(list[groupFilter.value])
    }

    const totallOld = counterList(local.totallOld)
    const totallPay = counterList(local.totallPay)
    const totallSell = counterList(local.totallSell)
    const mawe = counterList(local.mawe)

    return (
        <>

            <th><Link className="text-decoration-none" to={`/form/${local.id}`}>{local.id}</Link></th>
            <th scope="col" className="fs-5">{local.name}</th>
            <th>{local.code}</th>
            <th>{local.phone}</th>
            <th>{local.region_name}</th>
            <td className="d-print-none">{Currency(parseFloat((local.exchange)))}</td>
            <td className="d-print-none">
                {Currency(totallOld)}
            </td>
            <td className="d-print-none">
                {Currency(totallSell)}
            </td>
            <td className="d-print-none">
                {Currency(totallSell + totallOld)}
            </td>
            <td className="d-print-none">
                {Currency(totallPay)}
            </td>
            <td>
                {Currency(mawe)}
            </td>


            <td className="d-print-none">
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            زانیاری
                        </Tooltip>
                    }>
                    <Link className="btn btn-outline-primary" to={`/localDetail/${local.id}`}>
                        <FontAwesomeIcon
                            icon={faAddressCard}/></Link>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            پارەدان
                        </Tooltip>
                    }>
                    <Button variant={"outline-success"} onClick={handleShow2} data-toggle="modal">
                        <FontAwesomeIcon icon={faMoneyBill}/></Button>
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
                    <Button variant={"outline-danger"} onClick={() => handleDelete(local.id)} data-toggle="modal">
                        <FontAwesomeIcon icon={faTrash}/></Button>
                </OverlayTrigger>
            </td>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Local
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LocalEditForm theLocal={local}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close Button
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        پارەدان
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LocalPayment theLocal={local} groupid={groupFilter.value}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        داخستن
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Local
