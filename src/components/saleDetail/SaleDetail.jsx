import {Button, Col, Modal, Row} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useContext, useEffect, useState} from "react";
import {SaleDetailContext} from "../../contexts/SaleDetailContext";
import SaleToPrint from "../SaleToPrint";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Currency from "../../helper/Currency";
import SaleItem from "./SaleItem";
import ItemsCard from "./ItemsCard";


const SaleDetail = (props) => {
    const {sale, saleDetail, getSale} = useContext(SaleDetailContext)
    const total_price = Object.values(saleDetail).reduce((r, {total}) => r + total, 0)
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose()
    }, [])

    return (
        <>
            <section>
                <Row>
                    <Col lg={8}>
                        <div className="mb-3">
                            <div className="pt-4 wish-list">
                                <h5 className="mb-4">فۆرمی (<span>وەسل.</span> کاڵاکان )</h5>
                                {saleDetail && saleDetail.map((items, index) => (
                                        <div key={index}>
                                            <SaleItem key={index} kala={items}/>
                                            <hr className="mb-4"/>
                                        </div>
                                    )
                                )}
                                <p className="text-primary mb-0"><i className="fas fa-info-circle mr-1"/> Do not delay
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
                                <h5 className="mb-3">کۆی وەسڵ {sale.id}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        کۆی وەسڵی ئێستا
                                        <span>{Currency(parseFloat(sale.totall))}</span>
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
                                        <span><strong>{Currency(parseFloat(total_price))}</strong></span>
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
                                <SaleToPrint sale={sale}/>
                            </div>
                        </div>
                        {/* Card */}
                        {/* Card */}
                        <div className="mb-3">
                            <div className="pt-4">
                                <a className="dark-grey-text d-flex justify-content-between" data-toggle="collapse"
                                   href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                    Add a discount code (optional)
                                    <span><i className="fas fa-chevron-down pt-1"/></span>
                                </a>
                                <div className="collapse" id="collapseExample">
                                    <div className="mt-3">
                                        <div className="md-form md-outline mb-0">
                                            <input type="text" id="discount-code"
                                                   className="form-control font-weight-light"
                                                   placeholder="Enter discount code"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Card */}
                    </Col>
                </Row>

            </section>

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
                    <ItemsCard soldItems={SaleDetail} sale={sale}/>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default SaleDetail