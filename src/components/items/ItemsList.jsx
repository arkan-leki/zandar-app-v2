import { Alert, Button, Col, Modal, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faFilter, faGlobe, faPrint } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import React, { useContext, useEffect, useState } from "react";
import { GroupsContext } from "../../contexts/GroupsContext";
import { ItemsContext } from "../../contexts/ItemsContext";
import Item from "./Item";
import Currency from "../../helper/Currency";
import AddNewItemForm from "./AddNewItemForm";

const ItemsList = (props) => {
    const { groups } = useContext(GroupsContext)
    const { items, setItemsGroup } = useContext(ItemsContext)
    const [showAlert, setShowAlert] = useState(false)
    const [status, setStatus] = useState(false)
    const [itemFilter, setItemFilter] = useState(true)

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

    const groupsOpt = [{ value: 0, label: 'هەموو' }, ...groups.map((opt) => ({ value: opt.id, label: opt.name }))]
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
                    <Col className="d-print-none">
                        <Row>
                            <Col>
                                <Button variant={(!itemFilter) ? "outline-danger" : "outline-secondary"}
                                    onClick={(e) => setItemFilter(!itemFilter)}>
                                    <FontAwesomeIcon icon={faGlobe} /><span>  نە ماوە</span>
                                </Button>
                            </Col>
                            <Col>
                                <Button variant={(status) ? "outline-danger" : "outline-secondary"}
                                    onClick={(e) => setStatus(!status)}>
                                    <FontAwesomeIcon icon={faFilter} /><span>  نا چالاککراو</span>
                                </Button>
                            </Col>
                            <Col>
                                <Select placeholder="هەڵبژاردن..." name="group"
                                    options={groupsOpt} onChange={(e) => setGroupHandler(e.value)} />
                            </Col>
                            <Col>

                                <Button onClick={handleShow} variant={"outline-success"} data-toggle="modal">
                                    <FontAwesomeIcon icon={faAddressBook} /> <span>زیادکردنی کاڵا</span></Button>
                            </Col>
                            <Col>
                                <Button variant={"outline-secondary"} onClick={window.print}> 
                                    <FontAwesomeIcon icon={faPrint} /></Button>
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
                        <th className="d-print-none">#</th>
                        <th>کۆد</th>
                        <th>گروپ</th>
                        <th hidden={true}>ناوی کۆمپانیا</th>
                        <th hidden={true}>جۆر</th>
                        <th>ناوی مەواد</th>
                        <th className="d-print-none">نرخی کڕین</th>
                        <th className="d-print-none">نسبە</th>
                        <th>نرخ</th>
                        <th hidden={true}>جۆر بار</th>
                        <th hidden={true}>دانە</th>
                        <th hidden={true}>وەزن دانە</th>
                        <th hidden={true}>وەزن بار</th>
                        <th hidden={true}>نقل مخزن</th>
                        <th className="d-print-none">هاتوو</th>
                        <th className="d-print-none">فرۆشراو</th>
                        <th>ماوە</th>
                        <th className="d-print-none">دۆخ</th>
                        <th className="d-print-none" />
                    </tr>
                </thead>
                <tbody>
                    {
                        (itemFilter) ?
                            items.filter((i) => i.deleted === status && i.mawe > 0).map((item, index) => (
                                <tr key={index}>
                                    <Item item={item} />
                                </tr>
                            ))
                            :
                            items.filter((i) => i.deleted === status).map((item, index) => (
                                <tr key={index}>
                                    <Item item={item} />
                                </tr>
                            ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th className="d-print-none" />
                        <th />
                        <th />
                        <th>{Object.values(items).reduce((r, { id }) => r + 1, 0)}</th>
                        <th>{Currency(Object.values(items).reduce((r, {
                            mawe,
                            price
                        }) => r + (parseFloat(mawe) * parseFloat(price)), 0))}
                        </th>
                        <th className="d-print-none">{Currency(Object.values(items).reduce((r, {
                            mawe,
                            price,
                            finalprice
                        }) => r + (parseFloat(mawe) * (parseFloat(finalprice) - parseFloat(price))), 0))}
                        </th>
                        <th className="d-print-none">{Currency(Object.values(items).reduce((r, {
                            mawe,
                            finalprice
                        }) => r + (parseFloat(mawe) * parseFloat(finalprice)), 0))}
                        </th>
                        <th className="d-print-none" />
                        <th hidden={true} />
                        <th className="d-print-none">{Object.values(items).reduce((r, { popularity }) => r + parseFloat(popularity), 0)}</th>
                        <th>{Object.values(items).reduce((r, { mawe }) => r + parseFloat(mawe), 0)}</th>
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
                    <AddNewItemForm />
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