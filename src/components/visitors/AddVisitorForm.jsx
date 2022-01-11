import React, { useContext, useRef } from 'react'
import { Button, Form } from 'react-bootstrap';
import { VendorsContext } from '../../contexts/VendorsContext';

const AddVisitorForm = () => {
    const {addVendor} = useContext(VendorsContext);

    const nameRef = useRef('')
    const phoneRef = useRef('')


    const handleSubmit = (e) => {
        e.preventDefault();
        addVendor(
            {
                "name": nameRef.current,
                "phone": phoneRef.current,
                "regions": [1],
            }
        )
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label >ناونیشان</Form.Label>
                <Form.Control type='text'  ref={nameRef} onChange={(event)=>nameRef.current=event.target.value}/>
            </Form.Group>
            <Form.Group>
                <Form.Label >ژمارەی موبایل</Form.Label>
                <Form.Control type='text'  ref={phoneRef} onChange={(event)=>phoneRef.current=event.target.value}/>
            </Form.Group>
            <hr />
            <Button variant="success" type="submit">
                زیادکردنی فرۆشیار
            </Button>
        </Form>
    )
}

export default AddVisitorForm
