import { Card, Container, Row } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { PaymentsContext } from "../../contexts/PaymentsContext";
import Currency from "../../helper/Currency";
import { GroupsContext } from "../../contexts/GroupsContext";
import { APIContext } from "../../contexts/APIContext";

import moment from 'moment'

const Board = () => {
    const { banks } = useContext(PaymentsContext)
    const { groups } = useContext(GroupsContext)
    const [vendors, setVendors] = useState([])
    const { zenderAXIOS } = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get('vendorz/').then((response) => {
            setVendors(response.data);
        });
        // eslint-disable-next-line
    }, [])

    return (
        <Container>
            <section className={"p-5"}>
                <Row>
                    {groups.map(group => (
                        <Card border="success" style={{ width: '18rem' }}>
                            <Card.Header>مانگانە</Card.Header>
                            <Card.Body>
                                <Card.Title>{group.name}</Card.Title>
                                <Card.Text>
                                    {Currency(parseFloat(group.totallSell))}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}

                    <br />

                    {/* {vendors.map(vendor => (
                        <Card border="success" style={{ width: '18rem' }}>
                            <Card.Header>مانگانە</Card.Header>
                            <Card.Body>
                                <Card.Title>{vendor.name}</Card.Title>
                                <Card.Text>
                                    {Currency(parseFloat(vendor.totallSell))}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                    <br /> */}

                    {vendors.map(vendor => (
                        (vendor.totallSell !== 0) && (<Card border="success" style={{ width: '18rem' }}>
                            <Card.Header>مانگانە</Card.Header>
                            <Card.Body>
                                <Card.Title>{vendor.name}</Card.Title>
                                <Card.Text>
                                    {Currency(parseFloat(vendor.totallSell))}
                                </Card.Text>
                                {groups.map(group => (
                                    vendor.totallSellGroup[group.id] &&
                                    <Card.Text>
                                        <p>{group.name}</p>
                                        <p>{Currency(parseFloat(vendor.totallSellGroup[group.id]))}</p>            
                                    </Card.Text>
                                ))}
                            </Card.Body>
                        </Card>)
                    ))}

                    <Card border="success" style={{ width: '18rem' }}>
                        <Card.Header>هەمیشەی</Card.Header>
                        <Card.Body>
                            <Card.Title>داهات</Card.Title>
                            <Card.Text>
                                {Currency(Object.values(banks).reduce((r, { income }) => r + parseFloat(income), 0))}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card border="success" style={{ width: '18rem' }}>
                        <Card.Header>هەمیشەی</Card.Header>
                        <Card.Body>
                            <Card.Title>خەرجی</Card.Title>
                            <Card.Text>
                                {Currency(Object.values(banks).reduce((r, { loan }) => r + parseFloat(loan), 0))}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                    <Card border="success" style={{ width: '18rem' }}>
                        <Card.Header>هەمیشەی</Card.Header>
                        <Card.Body>
                            <Card.Title>مەوجودی قاسە</Card.Title>
                            <Card.Text>
                                {Currency(Object.values(banks).reduce((r, { income, loan }) => r + (parseFloat(income) - parseFloat(loan)), 0))}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card border="success" style={{ width: '18rem' }}>
                        <Card.Header>ئەمرۆ</Card.Header>
                        <Card.Body>
                            <Card.Title>مەوجودی قاسە</Card.Title>
                            <Card.Text>
                                {Currency(Object.values(banks.filter((fee) => moment(new Date(fee.date)).format("DD/MM/YYYY") === moment(new Date()).format("DD/MM/YYYY"))).reduce((r, { income, loan }) => r + (parseFloat(income) - parseFloat(loan)), 0))}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </section>
        </Container>
    )
}

export default Board