import { Button, Col, Collapse, Form, Modal, Row } from "react-bootstrap";
import { faAddressBook, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useRef, useState } from "react";
import { SaleDetailContext } from "../../contexts/SaleDetailContext";
import SaleToPrint from "../SaleToPrint";
import moment from "moment";
import Currency from "../../helper/Currency";
import SaleItem from "./SaleItem";
import ItemsCard from "./ItemsCard";
import { Link } from 'react-router-dom'


const SaleDetail = () => {
    const { sale, saleDetail, getSale, updateSell } = useContext(SaleDetailContext)
    const total_price = Object.values(saleDetail).reduce((r, { total }) => r + total, 0)
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const dashkan = useRef(0)

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        updateSell(
            sale.id,
            {
                "discount": dashkan.current,
            }
        )
    }

    return (
        <div className="content">
            <div className="container-fluid">
                <Row>
                    <Col lg={8}>
                        <div className="mb-3">
                            <div className="pt-4 wish-list">
                                <h5 className="mb-4">فۆرمی (<span>وەسل.</span> کاڵاکان )</h5>
                                {saleDetail && saleDetail
                                    // .sort((a, b) => a.id > b.id ? 1 : -1)
                                    .map((items, index) => (
                                        <div key={index}>
                                            <SaleItem key={index} kala={items} />
                                            <hr className="mb-4" />
                                        </div>
                                    )
                                    )}
                                <p className="text-primary mb-0"><i className="fas fa-info-circle mr-1" /> Do not delay
                                    the purchase, adding
                                    items to your cart does not mean booking them.</p>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="pt-4">
                                <h5 className="mb-4">Expected shipping delivery</h5>
                                <p className="mb-0">{moment(new Date(sale.date)).format('YYYY/MM/DD hh:mm')}</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4}>
                        {/* Card */}
                        <div className="mb-3">
                            <div className="pt-4">
                                <h5 className="mb-3">ژمارەی وەسڵ {sale.id}</h5>
                                ناو :
                                <h4>{sale.local_name}</h4>
                                کۆد :
                                <h4>{sale.local_code}
                                    <Link className="d-print-none" to={`/localDetail/${sale.local}`}>
                                        <FontAwesomeIcon
                                            icon={faAddressBook} /></Link>
                                </h4>
                                ناونیشان :
                                <h4>{sale.local_region}</h4>
                                بار :
                                <h3>{sale.totallBar} دانە</h3>
                                <hr />
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        کۆی وەسڵی ئێستا
                                        <span>{Currency(parseFloat(total_price))}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        داشکاندن
                                        <span>{Currency(parseFloat(sale.discount))}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        گروپی
                                        <span>{sale.group_name}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>کۆی وەسڵ</strong>
                                            <strong>
                                                <p className="mb-0">(دوای دەستکاری کردن)</p>
                                            </strong>
                                        </div>
                                        <span><strong>{Currency(parseFloat(sale.totallint))}</strong></span>
                                    </li>
                                </ul>
                                <Button variant={"outline-primary"}
                                    onClick={() => handleShow()}>
                                    <FontAwesomeIcon
                                        icon={faShoppingCart}
                                    /> گەڕان </Button>
                                <Button variant={"outline-success"}
                                    onClick={() => getSale(sale.id)}>
                                    <FontAwesomeIcon
                                        icon={faShoppingCart}
                                    /> نوێکردنەوە </Button>
                                {sale.id && <SaleToPrint sale={sale} />}
                            </div>
                        </div>
                        {/* Card */}
                        {/* Card */}
                        <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                        >
                            داشکاندن
                        </Button>
                        <Collapse in={open}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label >ژ.موبایل</Form.Label>
                                    <Form.Control type='text' defaultValue={dashkan.current} ref={dashkan} onChange={(event) => dashkan.current = event.target.value} />
                                </Form.Group>
                                <hr />
                                <Button variant="success" type="submit">
                                    زیادکردنی فرۆشیار
                                </Button>
                            </Form>

                        </Collapse>
                    </Col>
                </Row>

                {/* </section> */}

                <Modal
                    size="xl"
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
                        <ItemsCard soldItems={SaleDetail} sale={sale} />
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}
export default SaleDetail