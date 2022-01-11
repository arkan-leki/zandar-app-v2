import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'

const Region = ({ theRegion }) => {
    const [show, setShow] = useState(false);
    // const [show2, setShow2] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    // const handleShow2 = () => setShow2(true);
    // const handleClose2 = () => setShow2(false);
    useEffect(() => {
        handleClose()
        // handleClose2()
    }, [theRegion])

    return (
        <>
            <td>
                {theRegion.id}
            </td>
            <td>
                {theRegion.name}
            </td>
            <td>
                {theRegion.code}
            </td>
            <td>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            گۆڕین
                        </Tooltip>
                    }>
                    <Button variant={"outline-warning"} onClick={handleShow} data-toggle="modal">
                        <FontAwesomeIcon icon={faEdit} /></Button>
                </OverlayTrigger>
            </td>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        گۆڕینی ناوچە
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <VisitorsEditForm theLocal={local}/> */}
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

export default Region
