import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { TransportsContext } from '../../contexts/TransportsContext';

const AddTransForm = () => {
    const { sales, addTrans } = useContext(TransportsContext);
    const [sells, setSells] = useState([]);
    const sellsOpt = [...sales.map((opt) => ({ value: opt.id, label: `${opt.local_name} ${opt.group_name} ${opt.date}` }))]

    const handleSubmit = (e) => {
        e.preventDefault();
        addTrans('1', sells, new Date());
    }

    const handleChange = (e) => {
        let value = Array.from(e, option => option.value);
        setSells(value);
    }

    return <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Label >فرۆشگا</Form.Label>
            <Select isMulti placeholder="هەڵبژاردن..." name="sell" options={sellsOpt}
                onChange={handleChange} />

        </Form.Group>
        <hr />
        <Button variant="success" type="submit">
            زیادکردنی بار
        </Button>
    </Form>
};

export default AddTransForm;
