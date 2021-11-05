import {Card, Col, Container, Row} from "react-bootstrap";
import {useContext} from "react";
import {PaymentsContext} from "../../contexts/PaymentsContext";

const Board = (props) => {
    const payments = useContext(PaymentsContext)

    return (
        <Container>
            <section className={"p-5"}>
                <Row>
                    <Col md={2}>
                        <Card>
                            <Card.Body>
                                <p>{Object.values(payments).reduce((r, {bank_income}) => r + bank_income,0)}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </section>
        </Container>
    )
}

export default Board