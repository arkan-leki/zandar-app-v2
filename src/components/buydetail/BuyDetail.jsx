import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, InputGroup, Modal, Row, Table } from 'react-bootstrap'
import { BuyDetailContext } from '../../contexts/BuyDetailContext'
import ItemsListView from './ItemsListView'
import Ordered from './Ordered'
import moment from "moment";

const BuyDetail = () => {
    const { buy, ordereds } = useContext(BuyDetailContext);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose()
    }, [])


    return (
        <section className="pt-5 px-2">
            <div className="table-title">
                <Row className={"m-2 fs-4 border border-3 border-danger text-primary"}>
                    <Col className={"text-center mt-2"}>
                        <h2>کۆمپانیایی زەندەر</h2>
                        <p className="fs-6 d-inline">بۆ بازگانی گشتی و بریکارینامەی بازرگانی / سنوردار</p>
                    </Col>
                    <Col className={"text-center mt-2s"}>
                        {/* <img src={image} className="" alt="..." width={50 + '%'} /> */}
                    </Col>
                    <Col className={"text-center mt-2"}>
                        <h2>پسولەی فرۆش
                        </h2>
                        <Row>
                            {/* <p className="fs-6">
                                        ژ.ئۆفیس - 07501156373
                                    </p>
                                    <p className="fs-6">هەولێر - منارە ، بەرامبەر لەنگەی نوێ</p> */}
                            <p className="fs-6">
                                ژ.ئۆفیس - 07719930849
                            </p>
                            <p className="fs-6">کەلار - گەرەکی شۆرش - بەرامبەر ئیدارەی گەرمیان</p>
                        </Row>
                    </Col>
                </Row>
                <Row className={"border border-3 border-warning m-2 text-success"}>
                    <Col xs={6} className={"m-2"}>
                        <Row>
                            <Row xs={8} className={"text-center  fs-4"}>
                                <i>کۆمپانیایی : {buy.group_name}</i>
                                <i>عدد : {buy.totallQ}</i>
                            </Row>
                            <Row className={"text-center  fs-4"}>
                                <i> پارە : {buy.totall}</i>
                                <i>کۆد : {buy.code}</i>
                            </Row>
                        </Row>
                    </Col>
                    {buy.phone === "1" ? <Col className={" m-2 text-center bg-success border border-3 border-primary text-dark"}>
                        <h4> {buy.id} </h4>
                        <p> ژ.پسولە ({buy.id}) </p>
                        <p>{moment(new Date(buy.date)).format("DD/MM/YYYY")}</p>
                    </Col> : <Col className={" m-2 text-center bg-warning border border-3 border-primary text-dark"}>
                        <h4> {buy.group_name} </h4>
                        <p> ژ.پسولە ({buy.id}) </p>
                        <p>{moment(new Date(buy.date)).format("DD/MM/YYYY")}</p>
                    </Col>
                    }
                </Row>
                <Row className='d-print-none'>
                    <Col md={4}>
                        <h2>کاڵای هاتووی <b> {buy.group_name}</b></h2>
                    </Col>
                    <Col>
                        <Row>
                            <Col md={6}>
                                <InputGroup className="mb-3">
                                </InputGroup>
                            </Col>
                            <Col>
                                <Button variant={"outline-primary"}
                                    onClick={() => handleShow()}>
                                    <FontAwesomeIcon
                                        icon={faShoppingCart}
                                    /> گەڕان </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th scope="col"> #</th>
                        <th scope="col">کۆدی کاڵا</th>
                        <th scope="col">ناوی کالا</th>
                        <th scope="col" className='d-print-none'>نرخی کۆن</th>
                        <th scope="col">نرخی نوێ</th>
                        <th scope="col">دانە</th>
                        <th scope="col" className='d-print-none'>نرخی نوێ</th>
                        <th scope="col" className='d-print-none'>دانە</th>
                        <th scope="col">کۆ</th>
                        <th className='d-print-none'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ordereds.map(ordered => (
                            <tr key={ordered.id}>
                                <Ordered ordered={ordered} />
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Modal
                size="lg"
                show={show}
                fullscreen={false}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        کاڵاکان
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ItemsListView buy={buy} />
                </Modal.Body>
            </Modal>

        </section>
    )
}

export default BuyDetail
