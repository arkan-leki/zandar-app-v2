import { Alert, Button, Col, Modal, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faPrint } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import React, { useContext, useEffect, useState } from "react";
import { Locals2Context } from "../../contexts/Locals2Context";
import { RegionsContext } from "../../contexts/RegionsContext";
import Local2 from "./Local2";
import AddLocalForm2 from "./AddLocalForm2";

const LocalList2 = () => {
    const { regions } = useContext(RegionsContext)
    const { locals, setLocalRegion} = useContext(Locals2Context)

    const [showAlert, setShowAlert] = useState(false)
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000)
    }

    useEffect(() => {
        handleClose();

        return () => {
            handleShowAlert();
        }
    }, [locals])

    const [region, setRegion] = useState('')

    const regionsOpt = [{ value: 0, label: 'هەموو' }, ...regions.map((opt) => ({ value: opt.id, label: opt.name }))]
    const setRegionHandler = (value) => {
        setRegion(value)
        setLocalRegion(region)
    }


    return (
        <section className="p-5 px-2">
            <div className="table-title" >
                <Row>
                    <Col md={4}>
                        <h2>بەڕێوەبردنی <b>کڕیارەکان</b></h2>
                    </Col>
                    <Col className="d-print-none">
                        <Row>
                            <Col md={3}>
                                <Select placeholder="هەڵبژاردن..." name="group"
                                    options={regionsOpt} onChange={(e) => setRegionHandler(e.value)} />
                            </Col>

                            <Col>
                                <Button onClick={handleShow} variant={"outline-success"} data-toggle="modal">
                                    <FontAwesomeIcon icon={faAddressBook} /> <span>زیادکردنی کڕیار</span></Button>
                            </Col>
                            <Col>
                                <Button variant={"outline-secondary"} onClick={window.print}> 
                                    <FontAwesomeIcon icon={faPrint} /></Button>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </div>
            <Alert show={showAlert} variant="success">
                نوێکردنەوەی لیستی کڕیارەکان
            </Alert>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th scope="col"> زنجیرە</th>
                        <th scope="col"> فرۆشگا</th>
                        <th scope="col"> ناو</th>
                        <th scope="col">کۆد</th>
                        <th scope="col">ژمارەی موبایل</th>
                        <th scope="col">ناونیشان</th>
                        <th className="d-print-none" scope="col">یەکەم جار</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        locals.map(local => (
                            <tr key={local.id}>
                                <Local2 local={local} />
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td />
                        <td>
                            {Object.values(locals).reduce((r) => r + 1, 0)}
                        </td>
                        <td />
                        <td />
                    </tr>
                </tfoot>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        زیادکردنی کڕیار
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddLocalForm2 />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        داخستن
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default LocalList2