import { Alert, Button, Col, Modal, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { RegionsContext } from "../../contexts/RegionsContext";
import Region from "./Region";
import AddRegionForm from "./AddRegionForm";

const RegionsList = () => {
    const {regions} = useContext(RegionsContext)

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
    }, [regions])

    return (
        <section className="p-5 px-2">
            <div className="table-title" >
                <Row>
                    <Col md={4}>
                        <h2>بەڕێوەبردنی <b>ناوچەکان</b></h2>
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
                نوێکردنەوەی لیستی ناوچەکان
            </Alert>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th scope="col">زنجیرە</th>
                        <th scope="col">ناو</th>
                        <th scope="col">کۆد</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {
                        regions.map(region => (
                            <tr key={region.id}>
                                <Region theRegion={region} />
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
                    <AddRegionForm/>
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

export default RegionsList
