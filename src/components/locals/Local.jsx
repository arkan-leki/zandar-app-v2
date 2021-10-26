import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useContext, useEffect, useState} from 'react'
import {Button, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Currency from '../../helper/Currency'
import {LocalsContext} from "../../contexts/LocalsContext";

const Local = ({local}) => {
    const {deleteLocal ,groupFilter} = useContext(LocalsContext)
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose()
    }, [local])

    const handleDelete = (saleID) => {
        if (window.confirm("areu sure")) {
            deleteLocal(saleID)
        } else {
            console.log('Thing was saved to the database.');
        }
    }

    return (
        <>

            <th><Link className="text-decoration-none" to={`/form/${local.id}`}>{local.id}</Link></th>
            <th scope="col" className="fs-5">{local.name}</th>
            <th>{local.code}</th>
            <th>{local.phone}</th>
            <th>{local.region_name}</th>
            <td className="d-print-none">{Currency(parseFloat((local.exchange)))}</td>
            <td className="d-print-none">{Currency(parseFloat((local.exchange)))}</td>
            <td className="d-print-none">{Currency(parseFloat((local.totallSell)))}</td>
            <td className="d-print-none">{Currency(parseFloat((local.totallPay)))}</td>
            <td>

               {groupFilter.value === 0 ? Currency(Object.values(local.mawe).reduce((r,item) => r+item,0)):Currency(parseFloat((local.mawe[groupFilter.value-1])))}
            </td>


            <td className="d-print-none">
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Edit
                        </Tooltip>
                    }>
                    <Button variant={"outline-warning"} onClick={handleShow} data-toggle="modal">
                        <FontAwesomeIcon icon={faEdit}/></Button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Delete
                        </Tooltip>
                    }>
                    <Button variant={"outline-danger"} onClick={() => handleDelete(local.id)} data-toggle="modal">
                        <FontAwesomeIcon icon={faTrash}/></Button>
                </OverlayTrigger>
            </td>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Sale
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*<EditForm theSale={local} />*/}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close Button
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Local
