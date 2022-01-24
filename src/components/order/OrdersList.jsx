import React, { useContext } from 'react';
import { useEffect } from 'react';
import { Col, Row, Table, Button } from 'react-bootstrap'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { OrdersContext } from '../../contexts/OrdersContext';
import Order from './Order';

function OrdersList() {
    const { orders } = useContext(OrdersContext)

    useEffect(() => {

    }, [orders])

    const handlepage = () => {

    }

    return (
        <section className="pt-5 px-2">
            <div className='table-title'>
                <Row>
                    <Col md={4}>
                        <h2>بەڕێوەبردنی <b>پارەدان</b></h2>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <Button onClick={handlepage} variant={"outline-success"} data-toggle="modal">
                                    <FontAwesomeIcon icon={faCartPlus} /> <span>زیادکردن</span></Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th scope="col"> داواکاری</th>
                        <th >بۆ کۆمپانیای</th>
                        <th >بڕی مواد</th>
                        <th >کۆی پارە</th>
                        <th className="d-print-none">رێکەوت</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <Order theOrder={order} />
                        </tr>
                    ))}
                </tbody>
            </Table>

        </section>
    )
}

export default OrdersList;
