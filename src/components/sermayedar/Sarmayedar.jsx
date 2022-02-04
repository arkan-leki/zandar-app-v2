import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Table, Modal, Button, Alert } from 'react-bootstrap';
import { TradersContext } from '../../contexts/TradersContext';
import Trader from './Trader';

const Sarmayedar = () => {
    return <section className="p-5 px-2">
        <div className="table-title" >
            <Row>
                <Col md={4}>
                    <h2>بەڕێوەبردنی <b>کۆمپانیاکان</b></h2>
                </Col>
                <Col className="d-print-none">
                    <Row>
                        <Col>
                            <Button onClick={handleShow} variant={"outline-success"} data-toggle="modal">
                                <FontAwesomeIcon icon={faAddressBook} /> <span>زیادکردنی کۆمپانیا</span></Button>
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
                    <th scope="col">بنکو</th>
                    {/* <th scope="col">کۆد</th> */}
                    <th scope="col">ناو</th>
                    <th scope="col">ژمارەی موبایل</th>
                    <th scope="col">ناونیشان</th>
                    <th scope="col">مانەوەی یەکەجار</th>
                    <th scope="col">کڕین</th>
                    <th scope="col">پارەی دراو</th>
                    <th scope="col">قەرز</th>
                    {/* <th /> */}
                </tr>
            </thead>
            <tbody>
                {
                    traders.map(company => (
                        <tr key={company.id}>
                            <Trader trader={company} />
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
                {/* <AddVisitorForm /> */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    داخستن
                </Button>
            </Modal.Footer>
        </Modal>
    </section>
};

export default Sarmayedar;
