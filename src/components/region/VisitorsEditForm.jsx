import React, { useContext, useRef } from 'react'
import { Button, Form } from 'react-bootstrap';
import { VendorsContext } from '../../contexts/VendorsContext';

const VisitorsEditForm = ({ theVisitor }) => {
    const { updateVendor } = useContext(VendorsContext);

    const nameRef = useRef(theVisitor.name)
    const phoneRef = useRef(theVisitor.phone)


    const handleSubmit = (e) => {
        e.preventDefault();
        updateVendor(
            theVisitor.id,
            {
                "name": nameRef.current,
                "phone": phoneRef.current,
            }
        )
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label >ناونیشان</Form.Label>
                <Form.Control type='text' defaultValue={nameRef.current} ref={nameRef} onChange={(event) => nameRef.current = event.target.value} />
            </Form.Group>
            <Form.Group>
                <Form.Label >ژ.موبایل</Form.Label>
                <Form.Control type='text' defaultValue={phoneRef.current} ref={phoneRef} onChange={(event) => phoneRef.current = event.target.value} />
            </Form.Group>
            <hr />
            <Button variant="success" type="submit">
                زیادکردنی فرۆشیار
            </Button>
        </Form>
    )
}

export default VisitorsEditForm
