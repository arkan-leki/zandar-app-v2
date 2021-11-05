import {Alert, Button, Col, Modal, Row, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faGlobe} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import React, {useContext, useEffect, useState} from "react";
import {LocalsContext} from "../../contexts/LocalsContext";
import {RegionsContext} from "../../contexts/RegionlsContext";
import Local from "./Local";
import Currency from "../../helper/Currency";
import {GroupsContext} from "../../contexts/GroupsContext";
import AddLocalForm from "./AddLocalForm";

const LocalList = () => {
    const {regions} = useContext(RegionsContext)
    const {groups} = useContext(GroupsContext)
    const {locals, setLocalRegion, setGroupFilter, groupFilter,onlyNeed} = useContext(LocalsContext)

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
    }, [locals])

    const [region, setRegion] = useState('')

    const regionsOpt = [{value: 0, label: 'هەموو'}, ...regions.map((opt) => ({value: opt.id, label: opt.name}))]
    const setRegionHandler = (value) => {
        setRegion(value)
        setLocalRegion(region)
    }
    const groupsOpt = [{value: 0, label: 'هەموو'}, ...groups.map((opt) => ({value: opt.id, label: opt.name}))]
    const setGroupHandler = (value) => {
        setGroupFilter(value)
    }


    return (
        <section className="p-5">
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>بەڕێوەبردنی <b>کڕیارەکان</b></h2>
                    </div>
                    <div className="d-print-none col-sm-6">
                        <Row>
                            <Col md={2}>
                                <Select placeholder="هەڵبژاردن..." name="group"
                                        options={groupsOpt} onChange={(e) => setGroupHandler(e)}/>
                            </Col>
                            <Col md={2}>
                                <Select placeholder="هەڵبژاردن..." name="group"
                                        options={regionsOpt} onChange={(e) => setRegionHandler(e.value)}/>
                            </Col>
                            <Col>
                                <Button onClick={onlyNeed} variant={"outline-primary"} data-toggle="modal">
                                    <FontAwesomeIcon icon={faGlobe}/> <span>قەرزارەکان</span></Button>
                            </Col>
                            <Col>
                                <Button onClick={handleShow} variant={"outline-success"}  data-toggle="modal">
                                    <FontAwesomeIcon icon={faAddressBook}/> <span>زیادکردنی کڕیار</span></Button>
                            </Col>
                        </Row>

                    </div>
                </div>
            </div>
            <Alert show={showAlert} variant="success">
                نوێکردنەوەی لیستی کڕیارەکان
            </Alert>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th scope="col"> زنجیرە</th>
                    <th scope="col"> فرۆشگا</th>
                    <th scope="col">کۆد</th>
                    <th scope="col">ژمارەی موبایل</th>
                    <th scope="col">ناونیشان</th>
                    <th className="d-print-none" scope="col">یەکەم جار</th>
                    <th className="d-print-none">{groupFilter.label} کۆن</th>
                    <th className="d-print-none" scope="col">کۆی کڕین</th>
                    <th scope="col">پارەی داواکراو</th>
                    <th scope="col">پارەی دراو</th>
                    <th>
                        {groupFilter.label} ماوە
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    locals.map(local => (
                        <tr key={local.id}>
                            <Local local={local}/>
                        </tr>
                    ))
                }
                </tbody>
                <tfoot>
                <tr>
                    <td/>
                    <td/>
                    <td/>
                    <td/>
                    <td>
                        {groupFilter.value === 0 ? Currency(Object.values(locals).reduce((r, {mawe}) => r + Object.values(mawe).reduce((r, item) => r + item, 0), 0)) :
                            Currency(Object.values(locals).reduce((r, {mawe}) => r + parseFloat(mawe[groupFilter.value]), 0))}
                    </td>
                </tr>
                </tfoot>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        زیادکردنی کڕیار
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddLocalForm/>
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

export default LocalList