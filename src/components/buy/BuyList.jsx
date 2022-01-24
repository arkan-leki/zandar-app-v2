import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Col, InputGroup, Modal, Row, Button, Table } from 'react-bootstrap'
import { BuysContext } from '../../contexts/BuyContext'
import AddBuyForm from './AddBuyForm'
import Buy from './Buy'

const BuyList = () => {
    const {buys} = useContext(BuysContext)

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
    }, [buys])
    

    return (
        <section className="pt-5 px-2">
            <div className="table-title">
                <Row>
                    <Col md={4}>
                        <h2>بەڕێوەبردنی <b>بارەکان</b></h2>
                    </Col>
                    <Col>
                        <Row>
                            <Col md={6}>
                                <InputGroup className="mb-3">
                                </InputGroup>
                            </Col>
                            <Col>
                                <Button onClick={handleShow} variant={"outline-success"} data-toggle="modal">
                                    <FontAwesomeIcon icon={faCartPlus} /> <span>زیادکردن</span></Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <Alert show={showAlert} variant="success">
                نوێکردنەوەی لیستی بارەکان
            </Alert>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th scope="col"> #</th>
                        <th scope="col">کۆمپانیا</th>
                        <th scope="col">ژمارەی وەسڵ</th>
                        <th scope="col">کۆی وەسل</th>
                        <th scope="col">کۆی مواد</th>
                        <th scope="col">بەروار</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        buys.map(buy => (
                            <tr key={buy.id}>
                                <Buy buy={buy} />
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        زیادکردنی بار
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddBuyForm/>
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

export default BuyList
