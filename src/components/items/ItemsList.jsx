import {Alert, Button, Col, Modal, Row, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faGlobe} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import React, {useContext, useEffect, useState} from "react";
import {GroupsContext} from "../../contexts/GroupsContext";
import {ItemsContext} from "../../contexts/ItemsContext";
import Item from "./Item";
import Currency from "../../helper/Currency";

const ItemsList = (props) => {
    const {groups} = useContext(GroupsContext)
    const {items, setItemsGroup} = useContext(ItemsContext)
    const [showAlert, setShowAlert] = useState(false)
    const [status, setStatus] = useState(true)

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
    }, [items])

    const [group, setGroup] = useState('')

    const groupsOpt = [{value: 0, label: 'هەموو'}, ...groups.map((opt) => ({value: opt.id, label: opt.name}))]
    const setGroupHandler = (value) => {
        setGroup(value)
        setItemsGroup(group)
    }

    return (
        <section className="pt-5 px-2">
            <div className="table-title">
                <Row>
                    <Col>
                        <h2>بەڕێوەبردنی <b>کاڵاکان</b></h2>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <Button variant={"outline-primary"}
                                        onClick={(e) => setStatus(!status)}>
                                    <FontAwesomeIcon icon={faGlobe}/><span>  نا مەوجودین</span>
                                </Button>
                            </Col>
                            <Col>
                                <Select placeholder="هەڵبژاردن..." name="group"
                                        options={groupsOpt} onChange={(e) => setGroupHandler(e.value)}/>
                            </Col>
                            <Col>
                                <Button onClick={handleShow} variant={"outline-success"} data-toggle="modal">
                                    <FontAwesomeIcon icon={faAddressBook}/> <span>زیادکردنی کاڵا</span></Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <Alert show={showAlert} variant="success">
                نوێکردنەوەی لیستی فرۆشتنەکان
            </Alert>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>کۆد</th>
                    <th>گروپ</th>
                    <th hidden={true}>ناوی کۆمپانیا</th>
                    <th hidden={true}>جۆر</th>
                    <th>ناوی مەواد</th>
                    <th>نرخی کڕین</th>
                    <th>نسبە</th>
                    <th>نرخ</th>
                    <th hidden={true}>جۆر بار</th>
                    <th hidden={true}>دانە</th>
                    <th hidden={true}>وەزن دانە</th>
                    <th hidden={true}>وەزن بار</th>
                    <th>نقل مخزن</th>
                    <th>هاتوو</th>
                    <th>فرۆشراو</th>
                    <th>ماوە</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {
                    (status === true) ?
                        items.map((item, index) => (
                            <tr key={index}>
                                <Item item={item}/>
                            </tr>
                        ))
                        :
                        items.filter((i) => i.deleted === true).map((item, index) => (
                            <tr key={index}>
                                <Item item={item}/>
                            </tr>
                        ))
                }
                </tbody>
                <tfoot>
                <tr>
                    <th/>
                    <th/>
                    <th/>
                    <th>{Object.values(items).reduce((r, {id}) => r + 1, 0)}</th>
                    <th>{Currency(Object.values(items).reduce((r, {
                        mawe,
                        price
                    }) => r + (parseFloat(mawe) * parseFloat(price)), 0))}
                    </th>
                    <th>{Currency(Object.values(items).reduce((r, {
                        mawe,
                        price,
                        finalprice
                    }) => r + (parseFloat(mawe) * (parseFloat(finalprice) - parseFloat(price))), 0))}
                    </th>
                    <th>{Currency(Object.values(items).reduce((r, {
                        mawe,
                        finalprice
                    }) => r + (parseFloat(mawe) * parseFloat(finalprice)), 0))}
                    </th>
                    <th/>
                    <th/>
                    <th>{Object.values(items).reduce((r, {popularity}) => r + parseFloat(popularity), 0)}</th>
                    <th>{Object.values(items).reduce((r, {mawe}) => r + parseFloat(mawe), 0)}</th>
                </tr>
                </tfoot>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        زیادکردنی کاڵا
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*<AddSaleForm/>*/}
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

export default ItemsList