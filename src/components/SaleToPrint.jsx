import {Button, Col, OverlayTrigger, Row, Table, Tooltip} from "react-bootstrap";
import moment from "moment";
import Currency from "../helper/Currency";
import image from "../zend.png";
import {useRef} from "react";
import {useReactToPrint} from "react-to-print";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPrint} from "@fortawesome/free-solid-svg-icons";

const SaleToPrint = ({sale}) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });



    return (
        <>
            <OverlayTrigger
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        Print
                    </Tooltip>
                }>
                <Button variant={"outline-secondary"} onClick={handlePrint}>
                    <FontAwesomeIcon icon={faPrint}/></Button>
            </OverlayTrigger>

            <div style={{display: "none"}}>
                <div ref={componentRef}>
                    <div className="mx-auto" style={{width: 90 + '%'}} dir={"rtl"}>
                        <Row className={"mt-2 fs-4 border border-2"}>
                            <Col className={"text-center mt-2"}>
                                <h2>کۆمپانیایی زەندەر</h2>
                                <p className="fs-6 d-inline">بۆ بازگانی گشتی و بریکارینامەی بازرگانی / سنوردار</p>
                            </Col>
                            <Col className={"text-center mt-2s"}>
                                <img src={image} className="" alt="..." width={50 + '%'}/>
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
                        <Row className={"border border-2 mt-2 "}>
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
                            <Col className={" m-2 text-center"}>
                                <h4>فرۆشیار </h4>
                                <p>{sale.vendor_name}</p>
                                <p>{sale.vendor_phone}</p>
                            </Col>
                            <Col className={" m-2 text-center"}>
                                <h4> {sale.group_name} </h4>
                                <p> {sale.id}</p>
                                <p>{moment(new Date(sale.date)).format("DD/MM/YYYY")}</p>
                            </Col>
                        </Row>
                        <Row className="text-center mt-2">
                            <Table responsive
                                   className=" table table-striped table-hover align-middle caption-top border border-2  ">
                                <thead className="table-dark fs-6">
                                <tr className="text-center  ">
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
                                        <th scope="row">{kala.item}</th>
                                        <th>{kala.quantity}</th>
                                        <th>{Currency(parseFloat(kala.price))}</th>
                                        <th>{Currency(parseFloat(kala.total))}</th>
                                    </tr>
                                ))}
                                </tbody>
                                <tfoot className=" border">
                                <tr>
                                    <th/>
                                    <th/>
                                    <th/>
                                    <th>{sale.totallBar} کارتۆن</th>
                                    <th/>
                                    <th>{Currency(parseFloat(sale.totall))}</th>
                                </tr>
                                </tfoot>
                            </Table>
                        </Row>
                        <Row className={"mt-2"}>
                            <Col xs={{order: 'first'}} className={"text-center fs-5  border  border-2"}>
                                <span> حسابی پێشوو : </span>
                                <p> {Currency(parseFloat(sale.local_mawe) - parseFloat(sale.totallint))}</p>
                                <span> حسابی ئێستا : </span>
                                <p> {Currency(parseFloat(sale.local_mawe))}</p>
                            </Col>
                            <Col xs/>
                            <Col xs={{order: 'last'}} className={"text-center fs-5 border  border-2"}>
                                {sale.discount > 0 ? <p> {Currency(parseFloat(sale.discount))} داشکاندن </p> : ''}
                                <p>کۆی وەسڵ: </p>
                                <p>{Currency(parseFloat(sale.totallint))}</p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SaleToPrint