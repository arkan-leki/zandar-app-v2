import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Button, Col, FormControl, InputGroup, Modal, Row, Table } from 'react-bootstrap'
import { SalesContext } from '../../contexts/SalesContext'
import AddSaleForm from './AddSaleForm'
import Sale from './Sale'
import { faCartPlus, faGlobe, faSearch } from "@fortawesome/free-solid-svg-icons";
import { GroupsContext } from "../../contexts/GroupsContext";
import Select from "react-select";
import moment from "moment";
import Currency from "../../helper/Currency";
import { VendorsContext } from '../../contexts/VendorsContext'
import { RegionsContext } from '../../contexts/RegionsContext'

const SalesList = () => {
    const { groups } = useContext(GroupsContext)
    const { regions } = useContext(RegionsContext)
    const { vendors } = useContext(VendorsContext)

    const { sales, updateSaleDate, setSaleGroup, allSales, setSaleVisitor, setSaleRegion } = useContext(SalesContext)
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
    }, [sales])

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const onChange = () => {
        updateSaleDate({ startDate, endDate }, group, visitor)
    };

    const [group, setGroup] = useState('')

    const groupsOpt = [...groups.map((opt) => ({ value: opt.id, label: opt.name }))]
    const setGroupHandler = (value) => {
        setGroup(value)
        setSaleGroup(group)
    }

    const [visitor, setVisitor] = useState([]);
    const visitorsOpt = [...vendors.map((opt) => ({ value: opt.id, label: opt.name }))]
    const setVisitorHandler = (value) => {
        setVisitor(value)
        setSaleVisitor(visitor)
    }
    const [region, setRegion] = useState();
    const regionssOpt = [...regions.map((opt) => ({ value: opt.id, label: opt.name }))]
    const setRegionHandler = (value) => {
        setRegion(value)
        setSaleRegion(region)
    }

    return (
        <div className="content">
            <div className="container-fluid">
                <Row>
                    <div className="table-title">
                        <Row>
                            <Col md={10}>
                                <h2>بەڕێوەبردنی <b>فرۆشتنەکان</b></h2>
                            </Col>
                            <Col>
                                <Button onClick={handleShow} variant={"outline-success"} data-toggle="modal">
                                    <FontAwesomeIcon icon={faCartPlus} /> <span>زیادکردن</span></Button>
                            </Col>
                            <Col>
                                <Button onClick={() => allSales()} variant={"outline-primary"}>
                                    <FontAwesomeIcon icon={faGlobe} /> <span>زیادتر</span></Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
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
                            <Col >
                                <Select placeholder="هەڵبژاردن..." name="group"
                                    options={groupsOpt} onChange={(e) => setGroupHandler(e.value)} />
                            </Col>
                            <Col>
                                <Select placeholder="هەڵبژاردن..." name="vendor"
                                    options={visitorsOpt} onChange={(e) => setVisitorHandler(e.value)} />
                            </Col>
                            <Col>
                                <Select placeholder="هەڵبژاردن..." name="region"
                                    options={regionssOpt} onChange={(e) => setRegionHandler(e.label)} />
                            </Col>


                        </Row>
                    </div>
                    <Alert show={showAlert} variant="success">
                        نوێکردنەوەی لیستی فرۆشتنەکان
                    </Alert>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th className="d-print-none" scope="col"> وەسڵ</th>
                                <th className="d-print-none" scope="col"> فرۆشیار</th>
                                <th scope="col">ژمارەی وەسڵ</th>
                                <th scope="col">کڕیار</th>
                                <th>بار</th>
                                <th>کێش</th>
                                <th scope="col">ناونیشان</th>
                                <th scope="col">کۆی وەسل</th>
                                <th scope="col">کۆی داشکان</th>
                                <th scope="col">کۆی گەڕاوە</th>
                                <th scope="col">کۆتا</th>
                                <th scope="col">بەروار</th>
                                <th className="d-print-none">حاڵەت</th>
                                <th className="d-print-none">رێکەوت</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sales.map(sale => (
                                    <tr key={sale.id}>
                                        <Sale sale={sale} />
                                    </tr>
                                ))
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>{Object.values(sales).reduce((r) => r + 1, 0)}</th>
                                <th />
                                <th />
                                <th />
                                <th>{Object.values(sales).reduce((r, { totallBar }) => r + parseFloat(totallBar), 0)}</th>
                                <th>{Object.values(sales).reduce((r, { sell_detail }) => r + parseInt(Object.values(sell_detail).reduce((r, { allwight }) => r + parseFloat(allwight), 0).toFixed(0)), 0)} کگم</th>
                                <th>{Currency(Object.values(sales).reduce((r, { totall }) => r + parseFloat(totall), 0))}</th>
                            </tr>
                        </tfoot>
                    </Table>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                زیادکردنی فرۆش
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddSaleForm />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                داخستن
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Row>
            </div>
        </div >
    )
}

export default SalesList
