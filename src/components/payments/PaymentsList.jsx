import { faCartPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { Col, FormControl, InputGroup, Row, Table, Button, Modal, Alert } from 'react-bootstrap'
import Select from "react-select";
import { GroupsContext } from '../../contexts/GroupsContext'
import { PaymentsContext } from '../../contexts/PaymentsContext'
import Currency from '../../helper/Currency'
import AddPaymentForm from './AddPaymentForm'
import Payment from './Payment'

const PaymentsList = () => {
    const { payments, updatePaymentDate, setPaymentGroup } = useContext(PaymentsContext)
    const summer = Object.values(payments).reduce((r, { bank_income }) => r + parseFloat(bank_income), 0);
    const sall = payments.length

    const { groups } = useContext(GroupsContext)
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
    }, [payments])

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const onChange = () => {
        updatePaymentDate({ startDate, endDate }, group)
    };

    const [group, setGroup] = useState('')

    const groupsOpt = [...groups.map((opt) => ({ value: opt.id, label: opt.name }))]
    const setGroupHandler = (value) => {
        setGroup(value)
        setPaymentGroup(group)
    }


    return (
        <section className="pt-5 px-2">
            <div className='table-title'>
                <Row>
                    <Col md={4}>
                        <h2>بەڕێوەبردنی <b>پارەدان</b></h2>
                    </Col>
                    <Col>
                        <Row>
                            <Col md={6}>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        type="date"
                                        aria-label="startDate"
                                        aria-describedby="basic-addon1"
                                        value={moment(new Date(startDate)).format("YYYY-MM-DD")}
                                        onChange={(event => setStartDate(event.target.valueAsDate))}
                                    />
                                    <InputGroup.Text id="basic-addon1">بۆ</InputGroup.Text>
                                    <FormControl
                                        type="date"
                                        aria-label="endDate"
                                        aria-describedby="basic-addon1"
                                        value={moment(new Date(endDate)).format("YYYY-MM-DD")}
                                        onChange={(event => setEndDate(event.target.valueAsDate))}
                                    />
                                    <Button onClick={onChange}><FontAwesomeIcon icon={faSearch} /></Button>
                                </InputGroup>
                            </Col>
                            <Col md={2}>
                                <Select placeholder="هەڵبژاردن..." name="group"
                                    options={groupsOpt} onChange={(e) => setGroupHandler(e.value)} />
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
                نوێکردنەوەی لیستی پارەدانەکان
            </Alert>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th scope="col"> وەسڵی پارەدان</th>
                        <th >بنکەی فرۆش</th>
                        <th scope="col"> کڕیار</th>
                        <th scope="col"> کۆدی کڕیار</th>
                        <th scope="col"> ژ.موبایلی کڕیار</th>
                        <th >پارەی دراو</th>
                        <th>کۆی داشکان</th>
                        <th >بەروار</th>
                        <th className="d-print-none">رێکەوت</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={index}>
                            <Payment payment={payment} />
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th>{sall}</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>  {Currency(summer)}  </th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        زیادکردنی پارەدان
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddPaymentForm />
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

export default PaymentsList
