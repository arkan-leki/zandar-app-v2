import { Button, Col, Form, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import moment from "moment";
import Currency from "../helper/Currency";
import image from "../zend.png";
import { useLayoutEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const SaleToPrint = ({ sale }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    useLayoutEffect(() => {
        return () => {
        }
    }, [sale])

    return (
        <>
            <OverlayTrigger
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        چاپکردن
                    </Tooltip>
                }>
                <Button variant={"outline-secondary"} onClick={handlePrint}>
                    <FontAwesomeIcon icon={faPrint} /></Button>
            </OverlayTrigger>

            <div style={{ display: "none" }}>
                <div ref={componentRef}>
                    <div className="mx-auto  " style={{ width: 90 + '%' }} dir={"rtl"}>
                        <Row className={"mt-2 fs-4 border border-3 border-danger text-primary"}>
                            <Col className={"text-center mt-2"}>
                                <h2>کۆمپانیایی زەندەر</h2>
                                <p className="fs-6 d-inline">بۆ بازگانی گشتی و بریکارینامەی بازرگانی / سنوردار</p>
                            </Col>
                            <Col className={"text-center mt-2s"}>
                                <img src={image} className="" alt="..." width={50 + '%'} />
                            </Col>
                            <Col className={"text-center mt-2"}>
                                <h2>پسولەی فرۆش
                                </h2>
                                <Row>
                                    <p className="fs-6">
                                        ژ.ئۆفیس - 07709292883
                                    </p>
                                    <p className="fs-6">ناونیشان کەلار - لیوکە</p>
                                </Row>
                            </Col>
                        </Row>
                        <Row className={"border border-3 border-warning mt-2 text-success"}>
                            <Col xs={6} className={"m-2"}>
                                <Row>
                                    <Row xs={8} className={"text-center  fs-4"}>
                                        <i>ناو : {sale.local_name}</i>
                                        <i>ناونیشان : {sale.local_region}</i>
                                    </Row>
                                    <Row className={"text-center  fs-6"}>
                                        <i> تەلەفۆن : {sale.local_phone}</i>
                                        <i>کۆد : {sale.local_code}</i>
                                    </Row>
                                </Row>
                            </Col>
                            <Col className={" m-2 text-center bg-warning border border-3 border-primary text-dark"}>
                                <h4> {sale.group_name} </h4>
                                <p> {sale.id}</p>
                                <p>{moment(new Date(sale.date)).format("DD/MM/YYYY")}</p>
                            </Col>
                            <Col className={" m-2 text-center border border-3 border-primary"}>
                                <h4>فرۆشیار </h4>
                                <p>{sale.vendor_name}</p>
                                <p>{sale.vendor_phone}</p>
                            </Col>
                            
                        </Row>
                        <Row className="text-center mt-2">
                            <Table responsive
                                className=" table  table-success table-striped table-hover align-middle caption-top border border-3  border-primary ">
                                <thead className="text-primary  fs-5">
                                    <tr className="text-center">
                                        <th scope="col">#</th>
                                        <th scope="col">کۆد</th>
                                        <th scope="col">کاڵا</th>
                                        <th>عدد</th>
                                        <th>نرخ</th>
                                        <th>کۆ</th>
                                    </tr>
                                </thead>
                                <tbody className="fs-6">
                                    {sale.sell_detail && sale.sell_detail.map((kala, index) => (
                                        <tr key={index}>
                                            <th scope="row">{kala.id}</th>
                                            <th scope="row">{kala.item_code}</th>
                                            <th scope="row">{kala.item_name}</th>
                                            <th>{kala.quantity}</th>
                                            <th>{Currency(parseFloat(kala.price))}</th>
                                            <th>{Currency(parseFloat(kala.total))}</th>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="text-primary fs-5">
                                    <tr>
                                        <th />
                                        <th />
                                        <th>{sale.sell_detail && Object.values(sale.sell_detail).reduce((r, { allwight }) => r + allwight, 0).toFixed(0)} کگم</th>
                                        <th>{sale.totallBar} کارتۆن</th>
                                        <th />
                                        <th>{Currency(parseFloat(sale.totall))}</th>
                                    </tr>
                                </tfoot>
                            </Table>
                        </Row>
                        <Row className={"mt-2 text-success"}>
                            <Col xs={{ order: 'first' }} className={"text-center fs-5 border  border-3 border-warning"}>
                                <span> حسابی پێشوو : </span>
                                <p> {Currency(parseFloat(sale.local_mawe[sale.group]))}</p>
                                <span> حسابی ئێستا : </span>
                                <p> {Currency(parseFloat(sale.local_mawe[sale.group]) + parseFloat(sale.totallint))}</p>
                            </Col>
                            <Col className="mx-auto text-center  border-bottom border-5 border-warning justify-center">
                                <Form>
                                    <Form.Group>
                                        <Form.Floating>واصل</Form.Floating>
                                        <Form.Control type={'text'} className="border border-3 border-warning" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.FloatingLabel>غیر واصل</Form.FloatingLabel>
                                        <Form.Check />
                                    </Form.Group>
                                </Form>
                            </Col>
                            {/*<Col/>*/}
                            <Col xs={{ order: 'last' }} className={"text-center fs-5  border-bottom border-5 border-warning"}>
                                {sale.discount > 0 ? <p> {Currency(parseFloat(sale.discount))} داشکاندن </p> : ''}
                                <p>کۆی وەسڵ: </p>
                                <p>{Currency(parseFloat(sale.totallint))}</p>
                            </Col>
                        </Row>
                        <Row className="mx-auto text-center justify-center" style={{ height: 100 + 'px' }}>
                            <Col />
                            <h1 className="col-4 border-bottom border-5 text-primary border-primary"> مۆری وردبینی </h1>
                            <Col />
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SaleToPrint