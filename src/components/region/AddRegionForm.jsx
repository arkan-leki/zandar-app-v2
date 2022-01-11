import React, { useContext, useRef } from 'react'
import { Button, Form } from 'react-bootstrap';
import { RegionsContext } from '../../contexts/RegionsContext';

const AddRegionForm = () => {
    const {addRegion} = useContext(RegionsContext);

    const nameRef = useRef('')
    const codeRef = useRef('')


    const handleSubmit = (e) => {
        e.preventDefault();
        addRegion(
            {
                "name": nameRef.current,
                "code": codeRef.current,
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
                <Form.Label >کۆد</Form.Label>
                <Form.Control type='text'  ref={codeRef} onChange={(event)=>codeRef.current=event.target.value}/>
            </Form.Group>
            <hr />
            <Button variant="success" type="submit">
                زیادکردنی فرۆشیار
            </Button>
        </Form>
    )
}

export default AddRegionForm
