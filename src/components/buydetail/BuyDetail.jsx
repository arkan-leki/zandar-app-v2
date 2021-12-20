import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, InputGroup, Modal, Row, Table } from 'react-bootstrap'
import { BuyDetailContext } from '../../contexts/BuyDetailContext'
import ItemsListView from './ItemsListView'
import Ordered from './Ordered'

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
                <Row>
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
                        <th scope="col">نرخی کۆن</th>
                        <th scope="col">نرخی نوێ</th>
                        <th scope="col">دانە</th>
                        <th scope="col">کۆ</th>
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
