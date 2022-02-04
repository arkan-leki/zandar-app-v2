import React, {useContext, useRef, useState} from 'react'
import {Button, Form} from 'react-bootstrap';
import Select from 'react-select';
import {Locals2Context} from '../../contexts/Locals2Context';
import {RegionsContext} from "../../contexts/RegionsContext";

const AddLocalForm2 = () => {
    const {addLocal} = useContext(Locals2Context);
    const {regions} = useContext(RegionsContext)

    const [region, setRegion] = useState('')

    const regionsOpt = [...regions.map((opt) => ({value: opt.id, label: opt.name}))]

    const nameRef = useRef('')
    const ownerRef = useRef('')
    const codeRef = useRef('')
    const phoneRef = useRef('')


    const handleSubmit = (e) => {
        e.preventDefault();
        addLocal(
            {
                "name": nameRef.current,
                "code": codeRef.current,
                "address": "",
                "phone": phoneRef.current,
                "owner_name": ownerRef.current,
                "exchange": 0,
                "region": region,
                "status": false,
                "zip_code": "",
                "state": "",
                "country": "",
                "image": null,
            }
        )
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label >فرۆشگا</Form.Label>
                <Form.Control type='text'  ref={nameRef} onChange={(event)=>nameRef.current=event.target.value}/>
            </Form.Group>
            <Form.Group>
                <Form.Label >خاوەنی کار</Form.Label>
                <Form.Control type='text'  ref={ownerRef} onChange={(event)=>ownerRef.current=event.target.value}/>
            </Form.Group>
            <Form.Group>
                <Form.Label >کۆد</Form.Label>
                <Form.Control type='text'  ref={codeRef} onChange={(event)=>codeRef.current=event.target.value}/>
            </Form.Group>
            <Form.Group>
                <Form.Label >ژ.موبایل</Form.Label>
                <Form.Control type='text'  ref={phoneRef} onChange={(event)=>phoneRef.current=event.target.value}/>
            </Form.Group>
            <Form.Group>
                <Form.Label >ناونیشان</Form.Label>
                <Select placeholder="هەڵبژاردن..." name="region"  options={regionsOpt} onChange={(e) => setRegion(e.value)}/>
            </Form.Group>
            <hr/>
            <Button variant="success" type="submit">
                زیادکردنی کڕیار
            </Button>
        </Form>
    )
}

export default AddLocalForm2
