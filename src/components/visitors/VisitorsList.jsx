import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Modal, Row, Table } from 'react-bootstrap'
import { VendorsContext } from '../../contexts/VendorsContext'
import AddVisitorForm from './AddVisitorForm'
import Visitor from './Visitor'

const VisitorsList = () => {
    const { vendors } = useContext(VendorsContext)

    const [showAlert, setShowAlert] = useState(false)
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000)
    }

    useEffect(() => {
        handleClose();

        return () => {
            handleShowAlert();
        }
    }, [vendors])

    return (
        <section className="p-5 px-2">
            <div className="table-title" >
                <Row>
                    <Col md={4}>
                        <h2>بەڕێوەبردنی <b>فرۆشیارەکان</b></h2>
                    </Col>
                    <Col className="d-print-none">
                        <Row>
                            <Col>
                                <Button onClick={handleShow} variant={"outline-success"} data-toggle="modal">
                                    <FontAwesomeIcon icon={faAddressBook} /> <span>زیادکردنی فرۆشیار</span></Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <Alert show={showAlert} variant="success">
                نوێکردنەوەی لیستی فرۆشیارەکان
            </Alert>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th scope="col">زنجیرە</th>
                        <th scope="col">ناو</th>
                        <th scope="col">ژمارەی موبایل</th>
                        
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {
                        vendors.map(vendor => (
                            <tr key={vendor.id}>
                                <Visitor visitor={vendor} />
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        زیادکردنی فرۆشیار
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddVisitorForm/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        داخستن
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    )
}

export default VisitorsList
