import { Row, Col, Table, Container, Button, Modal } from "react-bootstrap";
import React, { useContext, useRef, useState } from "react";
import { LocalDetailContext } from "../../contexts/LocalDetailContext";
import Currency from "../../helper/Currency";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAddressBook,
    faHamburger,
    faPrint
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import image from "../../zend.png";
import Select from "react-select";
import { GroupsContext } from "../../contexts/GroupsContext";
import { useReactToPrint } from "react-to-print";
import LocalPayment from './LocalPayment'
import LocalSell from "./LocalSell";
import LocalOldAcc from "./LocalOldAcc";
import AddOldAccForm from "../oldAcc/AddOldAccForm";

const LocalDetail = () => {

    const { sales, local, payment, oldAcc, resell } = useContext(LocalDetailContext)
    const { groups } = useContext(GroupsContext)
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const [group, setGroup] = useState('')

    const groupsOpt = [...groups.map((opt) => ({ value: opt.id, label: opt.name }))]

    const setGroupHandler = (value) => {
        setGroup(value)
        list()
    }

    const handleShow = () => setShow(!show);
    const handleShow2 = () => setShow2(true);
    const handleClose2 = () => setShow2(false);

    const list = () => {
        let arr = []
        if (group) {
            oldAcc.filter((val) => val.group === group).map((val) => (
                arr.push({
                    "id": ` فرق حساب ${val.id}`,
                    "name": val.local_name,
                    "group": val.group_name,
                    "pay": val.loan,
                    "loan": val.income,
                    "date": val.date
                })
            ))
            sales.filter((val) => val.group === group).map((val) => (
                arr.push({
                    "id": <Link to={`/saleDetail/${val.id}`}> کڕین {val.id} </Link>,
                    "name": val.local_name,
                    "group": val.group_name,
                    "pay": val.totall - val.discount,
                    "loan": val.totalback,
                    "date": val.date
                })
            ))
            payment.filter((val) => val.group === group).map((val) => (
                arr.push({
                    "id": <Link to={`/paymentForm/${val.id}`}> پارەدان {val.id} </Link>,
                    "name": val.local_name,
                    "group": val.group_name,
                    "pay": val.bank_loan,
                    "loan": val.bank_income,
                    "date": val.date
                })
            ))
            resell.filter((val) => val.group === group).map((val) => (
                arr.push({
                    "id": "گەڕانەوە",
                    "name": val.local_name,
                    "group": val.group_name,
                    "pay": 0,
                    "loan": val.price * val.quantity,
                    "date": val.date
                })
            ))
        } else {
            resell.map((val) => (
                arr.push({
                    "id": "گەڕانەوە",
                    "name": val.local_name,
                    "group": val.group_name,
                    "pay": 0,
                    "loan": val.price * val.quantity,
                    "date": val.date
                })
            ))
            oldAcc.map((val) => (
                arr.push({
                    "id": ` فرق حساب ${val.id}`,
                    "name": val.local_name,
                    "group": val.group_name,
                    "pay": val.loan,
                    "loan": val.income,
                    "date": val.date
                })
            ))
            sales.map((val) => (
                arr.push({
                    "id": <Link to={`/saleDetail/${val.id}`}> کڕین {val.id} </Link>,
                    "name": val.local_name,
                    "group": val.group_name,
                    "pay": val.totall - val.discount,
                    "loan": val.totalback,
                    "date": val.date
                })
            ))
            payment.map((val) => (
                arr.push({
                    "id": <Link to={`/paymentForm/${val.id}`}> پارەدان {val.id} </Link>,
                    "name": val.local_name,
                    "group": val.group_name,
                    "pay": val.bank_loan,
                    "loan": val.bank_income,
                    "date": val.date
                })
            ))
        }
        let suumer = parseFloat(local.exchange)

        return (
            arr.sort((a, b) => new Date(a.date.split('/').reverse().join()) - new Date(b.date.split('/').reverse().join())).map((attempt, index) => (
                <tr key={index}>
                    <th scope="row"> {attempt.id}</th>
                    <th scope="row">{attempt.name}</th>
                    <th scope="row">{attempt.group}</th>
                    <th scope="row">{Currency(parseFloat(attempt.pay))}</th>
                    <th scope="row">{Currency(parseFloat(attempt.loan))}</th>
                    <th scope="row">{attempt.date}</th>
                    <th>{Currency(suumer += parseFloat(attempt.pay) - parseFloat(attempt.loan))}</th>
                </tr>
            ))
        )
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <section className="pt-5 px-2">
            <Container >
                <Row className={"d-print-none"}>
                    <Col>
                        <h2>کشفی <b>حساب</b></h2>
                    </Col>
                    <Col>
                        <Select placeholder="هەڵبژاردن..." name="group"
                            options={groupsOpt} onChange={(e) => setGroupHandler(e.value)} />
                    </Col>
                    <Col>
                        <Button onClick={handleShow} variant={"outline-success"} data-toggle="modal">
                            <FontAwesomeIcon icon={faHamburger} /> <span>وردەکاری </span></Button>
                    </Col>
                    <Col>
                        <Button hidden={show} onClick={handlePrint} variant={"outline-success"} data-toggle="modal">
                            <FontAwesomeIcon icon={faPrint} /> <span>چاپ </span></Button>
                    </Col>
                </Row>
                <hr />
                <Row hidden={show} ref={componentRef}>
                    <div className="mx-auto fs-6" style={{ width: 90 + '%' }} dir={"rtl"}>
                        <Row className={"mt-2 fs-4 border border-3 border-danger text-primary"}>
                            <Col className={"text-center mt-2"}>
                                <h4>کۆمپانیایی زەندەر</h4>
                                <p>بۆ بازگانی گشتی و بریکارینامەی بازرگانی / سنوردار</p>
                            </Col>
                            <Col className={"text-center mt-2"}>
                                <img src={image} className="img-thumbnail" alt="..." width={100 + 'px'} />
                            </Col>
                            <Col className={"text-center mt-2"}>
                                <h4>کشفی حساب
                                </h4>
                                <Row>
                                    <p className="fs-6">
                                        ژ.ئۆفیس - 07709292883
                                    </p>
                                    <p className="fs-6">ناونیشان کەلار - لیوکە</p>
                                </Row>
                            </Col>
                        </Row>
                        {/* <h4> بەرێز {local.owner_name}</h4>
                        <hr /> */}
                        {local.mawe && <div className="row m-2">
                            <Col>
                                <Row className={"border border-3 border-warning mt-2 text-success"}>
                                    <Col xs={6} className={"m-2"}>
                                        <p>ناو : {local.name}</p>
                                        <p>ناوچە : {local.region_name}</p>
                                        <p>ژمارەی موبایل : {local.phone}</p></Col>
                                    <Col><p>کۆد : {local.code}</p>
                                        <p>قەرز : {group === '' ? Currency(Object.values(local.mawe).reduce((r, item) => r + parseFloat(item)), 0) :
                                            Currency(local.mawe[group])}</p>
                                        <p>قەرز یەکەم جار : {local.exchange}</p>
                                    </Col>
                                    <Col className={" m-2 text-center border border-3 border-primary"}>
                                        <p>بەرواری کشف</p>
                                        <p>{moment(new Date(new Date())).format("YYYY/MM/DD")}</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Row className="text-center mt-2">

                                <Table responsive
                                    className=" table  table-success table-striped table-hover align-middle caption-top border border-3  border-primary ">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">کڕیار</th>
                                            <th>لەبنکەی</th>
                                            <th>بری قەرز</th>
                                            <th>بڕی پارە</th>
                                            <th>بەروار</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">{local.id}</th>
                                            <th scope="row">{local.name}</th>
                                            <th scope="row"> یەکەم جار</th>
                                            <th scope="row">{Currency(parseFloat(local.exchange))}$</th>
                                            <th scope="row">0$</th>
                                            <th scope="row">{local.date}</th>
                                            <th scope="row">{Currency(parseFloat(local.exchange))}$</th>
                                        </tr>
                                        {list()}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th>{group === '' ? Currency(Object.values(local.totallSell).reduce((r, item) => r + parseFloat(item)), 0) :
                                                Currency(parseFloat(local.totallSell[group]))} +{group === '' ? Currency(Object.values(local.totallOldloan).reduce((r, item) => r + parseFloat(item)), 0) :
                                                    Currency(parseFloat(local.totallOldloan[group]))}</th>
                                            <th>{group === '' ? Currency(Object.values(local.totallPay).reduce((r, item) => r + parseFloat(item)), 0) :
                                                Currency(parseFloat(local.totallPay[group]))} +{group === '' ? Currency(Object.values(local.totallOldincome).reduce((r, item) => r + parseFloat(item)), 0) :
                                                    Currency(parseFloat(local.totallOldincome[group]))}</th>
                                            <th></th>
                                            <th>{group === '' ? Currency(Object.values(local.mawe).reduce((r, item) => r + parseFloat(item)), 0) :
                                                Currency(parseFloat(local.mawe[group]))}</th>
                                        </tr>
                                    </tfoot>
                                </Table>
                            </Row>

                        </div>
                        }
                    </div>
                </Row>
                <Row className={"d-print-none"}>
                    <div className="table-title">
                        <h2>کڕینەکانی <b>{local.name}</b></h2>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th scope="col"> وەسڵ</th>
                                <th> فرۆشیار</th>
                                <th scope="col">ژمارەی وەسڵ</th>
                                <th>بار</th>
                                <th scope="col">کۆی وەسل</th>
                                <th scope="col">کۆی داشکان</th>
                                <th scope="col">کۆتا</th>
                                <th scope="col">کۆی گەڕاوە</th>
                                <th scope="col">بەروار</th>
                                <th>حاڵەت</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sales.map((sale, index) => (
                                    <tr key={index}>
                                        <LocalSell sale={sale} />
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Row>
                <Row className={"d-print-none"}>
                    <div className="table-title">
                        <h2>پارەدانەکانی <b>{local.name}</b></h2>
                    </div>
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
                            {payment.map((payed, index) => (
                                <tr key={index}>
                                    <LocalPayment payment={payed} />
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
                <Row className={"d-print-none"}>
                    <div className="table-title">
                        <h2>گەڕانەوەکان <b>{local.name}</b></h2>
                    </div>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th scope="col"> وەسڵی گەڕانەوە</th>
                                <th >بنکەی فرۆش</th>
                                <th scope="col"> کڕیار</th>
                                <th scope="col"> کاڵا</th>
                                <th scope="col"> کۆد</th>
                                <th >دانە</th>
                                <th>نرخ</th>
                                <th>کۆی داشکان</th>
                                <th >بەروار</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resell.map((val, index) => (
                                <tr key={index}>
                                    <td>{val.sell}</td>
                                    <td>{val.group_name}</td>
                                    <td>{val.local_name}</td>
                                    <td>{val.item_name}</td>
                                    <td>{val.item_code}</td>
                                    <td>{val.quantity}</td>
                                    <td>{Currency(parseFloat(val.price))}</td>
                                    <td>{Currency(parseFloat(val.price * val.quantity))}</td>
                                    <td>{val.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
                <Row className={"d-print-none"}>
                    <div className="table-title" >
                        <Row>
                            <Col md={4}>
                                <h2>فەرق حساب <b>{local.name}</b></h2>
                            </Col>
                            <Col className="d-print-none">
                                <Row>
                                    <Col>
                                        <Button onClick={handleShow2} variant={"outline-success"} data-toggle="modal">
                                            <FontAwesomeIcon icon={faAddressBook} /> <span>زیادکردنی حساب</span></Button>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    </div>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th scope="col"> زنجیرە </th>
                                <th >بنکەی فرۆش</th>
                                <th scope="col"> کڕیار</th>
                                <th>کۆی داشکان</th>
                                <th>کۆی فرۆش</th>
                                <th >بەروار</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {oldAcc.map((val, index) => (
                                <tr key={index}>
                                    <LocalOldAcc oldAcc={val} />
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Modal show={show2} onHide={handleClose2}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                زیادکردنی پارەدان {local.id}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddOldAccForm thelocal={local.id} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose2}>
                                داخستن
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Row>
            </Container>
        </section>
    )
}

export default LocalDetail