import {Row, Col, Table, Tooltip, OverlayTrigger, Container} from "react-bootstrap";
import React, {useContext, useState} from "react";
import {LocalDetailContext} from "../../contexts/LocalDetailContext";
import Currency from "../../helper/Currency";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTruckLoading,
    faTruckMoving
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import image from "../../zend.png";
import Select from "react-select";
import {GroupsContext} from "../../contexts/GroupsContext";

const LocalDetail = () => {

    const {sales, local, payment, oldAcc} = useContext(LocalDetailContext)
    const {groups} = useContext(GroupsContext)

    const [group, setGroup] = useState('')

    const groupsOpt = [...groups.map((opt) => ({value: opt.id, label: opt.name}))]
    const setGroupHandler = (value) => {
        setGroup(value)
        list()
    }

    const list = () => {
        let arr = []
        oldAcc.filter((val) => val.group === group).map((val) => (
            arr.push({
                "id": val.id,
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
                "pay": val.totall,
                "loan": val.discount,
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

    return (
        <section className="pt-5 px-2">
            <Container>
                <Row>
                    <Col>
                        <h2>بەڕێوەبردنی <b>فرۆشتنەکان</b></h2>
                    </Col>
                    <Col>
                        <Select placeholder="هەڵبژاردن..." name="group"
                                options={groupsOpt} onChange={(e) => setGroupHandler(e.value)}/>
                    </Col>
                </Row>
                <Row className={"border border-3"}>
                    <Row>
                        <Col>
                            <h4>کۆمپانیایی زەندەر</h4>
                            <p>بۆ بازگانی گشتی و بریکارینامەی بازرگانی / سنوردار</p>
                        </Col>
                        <Col>
                            <img src={image} className="img-thumbnail" alt="..." width={50 + '%'}/>
                        </Col>
                        <Col>
                            <h4>پسولەی فرۆش
                            </h4>
                            <p>
                                ژ.ئۆفیس - 07709292883
                                <p>ناونیشان کەلار - لیوکە</p>
                            </p>
                        </Col>
                    </Row>
                    <h4> بەرێز {local.owner_name}</h4>
                    <hr/>
                    {local.mawe && <div className="row m-2">
                       <Col>
                           <Row className="border border-3 text-right m-2">
                               <Col><p>ناو : {local.name}</p>
                                   <p>ناوچە : {local.region}</p>
                                   <p>ژمارەی موبایل : {local.phone}</p></Col>
                               <Col><p>کۆد : {local.code}</p>
                                   <p>قەرز : {group === ''?Currency(Object.values(local.mawe).reduce((r, item) => r + parseFloat(item)), 0):
                                       Currency(local.mawe[group])}</p>
                                   <p>قەرز یەکەم جار : {local.exchange}</p>
                               </Col>
                           </Row>
                       </Col>
                        <Col md={2} className=" border border-3 m-2 text-center">
                            <p>بەرواری فرۆش</p>
                            <p>{moment(new Date(local.date)).format("YYYY/MM/DD")}</p>
                            <p>زنجیرە {local.id}</p>
                        </Col>
                        <Table>
                            <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">کڕیار</th>
                                <th>لەبنکەی</th>
                                <th>بری قەرز</th>
                                <th>بڕی پارە</th>
                                <th>بەروار</th>
                                <th className="d-print-none">#</th>
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
                        </Table>
                    </div>
                    }
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
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            sales.map((sale, index) => (
                                <tr key={index}>
                                    <td>{sale.group_name}</td>
                                    <td>{sale.vendor_name}</td>
                                    <td>
                                        <Link to={`/saleDetail/${sale.id}`}>{sale.id}</Link>
                                    </td>
                                    <td>
                                        {sale.totallBar}
                                    </td>
                                    <td>{Currency(parseFloat(sale.totall))} </td>
                                    <td>{Currency(parseFloat(sale.discount))} </td>
                                    <td>{Currency(parseFloat(sale.totallint))} </td>
                                    <td>{Currency(parseFloat(sale.totalback))} </td>
                                    <td>{moment(new Date(sale.date)).format("DD/MM/YYYY")}</td>
                                    <td><span className={""}>{sale.status ? <FontAwesomeIcon icon={faTruckMoving}/> :
                                        <FontAwesomeIcon icon={faTruckLoading}/>}</span></td>
                                    <td>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip id={`tooltip-top`}>
                                                    دەستکاری
                                                </Tooltip>
                                            }>
                                            <Link className="btn btn-outline-warning" to={`/saleDetail/${sale.id}`}>
                                                <FontAwesomeIcon
                                                    icon={faEdit}/></Link>
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </section>
    )
}

export default LocalDetail