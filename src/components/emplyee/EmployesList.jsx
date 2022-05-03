import { Alert, Button, Col, Modal, Row, Table } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import Epmloyee from './Epmloyee';
import { EmployesContext } from "../../contexts/EmployesContext";
import addEmploForm from "./addEmploForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";

const EmployesList = () => {
    const { employees } = useContext(EmployesContext)

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
    }, [employees])


    return (
        <section className="p-5 px-2">
            <div className="table-title" >
                <Row>
                    <Col md={4}>
                        <h2>بەڕێوەبردنی <b>کارمەندان</b></h2>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <Button variant={"outline-secondary"} onClick={handleShow}>
                                    <FontAwesomeIcon icon={faAddressBook} /></Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <Alert show={showAlert} variant="success">
                نوێکردنەوەی لیستی کارمەندان
            </Alert>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th scope="col"> زنجیرە</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees && employees.map(emplo => (
                            <tr key={emplo.id}>
                                <Epmloyee theEmplo={emplo} />
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        زیادکردنی کرێکار
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <addEmploForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        داخستن
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default EmployesList