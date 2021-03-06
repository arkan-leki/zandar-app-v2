import { Alert, Button, Col, FormControl, InputGroup, Row, Table } from "react-bootstrap";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import Currency from "../helper/Currency";
import React, { useContext, useEffect, useState } from "react";
import { GroupsContext } from "../contexts/GroupsContext";
import { ItemsContext } from "../contexts/ItemsContext";
import RetailItem from "./RetailItem";
import { VendorsContext } from "../contexts/VendorsContext";
// import { SaleDetailContext } from "../contexts/SaleDetailContext";

const Retail = () => {
    const { groups } = useContext(GroupsContext)
    const { vendors } = useContext(VendorsContext)

    // const { saleDetail, updateSaleDate } = useContext(SaleDetailContext)
    const { items, setItemsGroup } = useContext(ItemsContext)
    const [showAlert, setShowAlert] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [group, setGroup] = useState(1)

    const [tday, setTday] = useState([]);

    const fetchData = (startDate, endDate, group, visitor) => {
        const _item_sell = []
        // updateSaleDate({ startDate, endDate }, group)
        console.log(visitor);
        items.filter((i) => i.group === group)
        items.map((_item) => {
            let item_sell = _item.item_sell.filter((sale) => (new Date(sale.date) - startDate) >= 0 && (new Date(sale.date) - endDate <= 0))
            if (visitor !== 0)
                item_sell = item_sell.filter((i) => i.sell_vendorID === visitor)

            let quantity = Object.values(item_sell).reduce((r, { quantity }) => r + quantity, 0)
            let date = Object.values(item_sell).reduce((r, { date }) => date, 0)
            let price = Object.values(item_sell).reduce((r, { price, quantity }) => r + (parseFloat(quantity) * parseFloat(price)), 0);
            return _item_sell.push({ "item": _item.name, "item_price": parseFloat(_item.price), "qazanc": price - (_item.price * quantity), "barcode": _item.barcode, "quantity": quantity, "mawe": _item.mawe, "maweprice": (_item.mawe * _item.price), "price": price, "date": date, "group": _item.group, 'itemp': (price / quantity) })
        })

        setTday(_item_sell.filter((_items) => _items.quantity !== 0))
    }

    useEffect(() => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000)
    }, [tday, items])

    const onChange = () => {
        fetchData(startDate, endDate, group, visitor)
    }
    const groupsOpt = [...groups.map((opt) => ({ value: opt.id, label: opt.name }))]
    const setGroupHandler = (value) => {
        setGroup(value)
        setItemsGroup(group)
        fetchData(startDate, endDate, value, visitor)
    }

    const [visitor, setVisitor] = useState(0);
    const visitorsOpt = [...vendors.map((opt) => ({ value: opt.id, label: opt.name }))]
    const setVisitorHandler = (value) => {
        setVisitor(value)
        fetchData(startDate, endDate, group, value)
    }
    return (
        <section className="p-5">
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>?????????????????????? <b>??????????????</b></h2>
                    </div>
                    <div className="d-print-none col-sm-6">
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
                                    <InputGroup.Text id="basic-addon1">????</InputGroup.Text>
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
                            <Col>
                                <Select placeholder="??????????????????..." name="group"
                                    options={groupsOpt} onChange={(e) => setGroupHandler(e.value)} />
                            </Col>
                            <Col>
                                <Select placeholder="??????????????????..." name="vendor"
                                    options={visitorsOpt} onChange={(e) => setVisitorHandler(e.value)} />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <Alert show={showAlert} variant="success">
                ?????????????????????? ?????????? ??????????????
            </Alert>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>????????</th>
                        <th> ??????</th>
                        <th> ??????</th>
                        <th> ????????</th>
                        <th> ??????</th>
                        <th> ??????????????</th>
                        <th> ????????</th>
                        <th> ??????????</th>
                        <th> ??????????????</th>
                        <th> ????????????</th>
                        <th> ????????????</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tday.map((item, index) => (
                            <tr key={index}>
                                <RetailItem item={item} />
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th />
                        <th />
                        <th>{tday.length}</th>
                        <th>{Currency(Object.values(tday).reduce((r, { item_price }) => r + parseFloat(item_price), 0))}</th>
                        <th>{Currency(Object.values(tday).reduce((r, { itemp }) => r + parseFloat(itemp), 0))}</th>
                        <th>{Object.values(tday).reduce((r, { quantity }) => r + parseFloat(quantity), 0)}</th>
                        <th>{Object.values(tday).reduce((r, { mawe }) => r + parseFloat(mawe), 0)}</th>
                        <th>{Currency(Object.values(tday).reduce((r, { price }) => r + parseFloat(price), 0))}</th>
                        <th>{Currency(Object.values(tday).reduce((r, { maweprice }) => r + parseFloat(maweprice), 0))}</th>
                        <th>{Currency(Object.values(tday).reduce((r, { qazanc }) => r + parseFloat(qazanc), 0))}</th>
                    </tr>
                </tfoot>
            </Table>

        </section>
    )
}
export default Retail