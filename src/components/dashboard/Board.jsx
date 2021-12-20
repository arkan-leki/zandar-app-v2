import {Card, Container, Row} from "react-bootstrap";
import {useContext} from "react";
import {PaymentsContext} from "../../contexts/PaymentsContext";
import Currency from "../../helper/Currency";

const Board = () => {
    const {payments,banks} = useContext(PaymentsContext)

    return (
        <Container>
            <section className={"p-5"}>
                <Row>
                    <Card border="success" style={{ width: '18rem' }}>
                        <Card.Header>مانگانە</Card.Header>
                        <Card.Body>
                            <Card.Title>داهات</Card.Title>
                            <Card.Text>
                                {Currency(Object.values(payments).reduce((r, {bank_income}) => r + parseFloat(bank_income),0))}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card border="success" style={{ width: '18rem' }}>
                        <Card.Header>مانگانە</Card.Header>
                        <Card.Body>
                            <Card.Title>داهات</Card.Title>
                            <Card.Text>
                                {Currency(Object.values(banks).reduce((r, {income}) => r + parseFloat(income),0))}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card border="success" style={{ width: '18rem' }}>
                        <Card.Header>مانگانە</Card.Header>
                        <Card.Body>
                            <Card.Title>خەرجی</Card.Title>
                            <Card.Text>
                                {Currency(Object.values(banks).reduce((r, {loan}) => r + parseFloat(loan),0))}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                    

                </Row>
            </section>
        </Container>
    )
}

export default Board