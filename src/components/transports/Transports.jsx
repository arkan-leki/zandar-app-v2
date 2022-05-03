import { Alert, Button, Col, Modal, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { TransportsContext } from "../../contexts/TransportsContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import AddTransForm from "./AddTransForm";

const Transports = () => {

    const { transports } = useContext(TransportsContext);
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
    }, [transports])

    return <section className="p-5 px-2">
        <div className="table-title" >
            <Row>
                <Col md={4}>
                    <h2>بەڕێوەبردنی <b>بارەکان</b></h2>
                </Col>
                <Col className="d-print-none">
                    <Row>
                        <Col>
                            <Button onClick={handleShow} variant={"outline-success"} data-toggle="modal">
                                <FontAwesomeIcon icon={faAddressBook} /> <span>زیادکردنی ناوچە</span></Button>
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
                    <th scope="col">زنجیرە</th>
                    <th scope="col">سایەق</th>
                    <th scope="col">کات</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {
                    transports.map(transport => (
                        <tr key={transport.id}>
                            <td>
                                {transport.id}
                            </td>
                            <td>
                                {transport.dliver_name}
                            </td>
                            <td>{transport.start_date}</td>
                            <td>
                                <OverlayTrigger
                                    overlay={
                                        <Tooltip id={`tooltip-top`}>
                                            زانیاری
                                        </Tooltip>
                                    }>
                                    <Link className="btn btn-outline-primary" to={`/transDetail/${transport.id}`}>
                                        <FontAwesomeIcon
                                            icon={faAddressCard} /></Link>
                                </OverlayTrigger>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    زیادکردنی ناوچە
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddTransForm />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    داخستن
                </Button>
            </Modal.Footer>
        </Modal>
    </section>
};

export default Transports;
