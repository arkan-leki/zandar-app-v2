import React, {useContext, useState} from 'react'
import {Button, Form} from 'react-bootstrap';
import Select from 'react-select';
import {SalesContext} from '../../contexts/SalesContext';
import {GroupsContext} from "../../contexts/GroupsContext";
import {VendorsContext} from "../../contexts/VendorsContext";
// import {LocalsContext} from "../../contexts/LocalsContext";
import { Locals2Context } from '../../contexts/Locals2Context';

const AddSaleForm = () => {
    const {addSale} = useContext(SalesContext);
    const {groups} = useContext(GroupsContext)
    const {vendors} = useContext(VendorsContext)
    const {locals} = useContext(Locals2Context)

    const [vendor, setVendor] = useState('')
    const [group, setGroup] = useState('')
    const [local, setLocal] = useState('')

    const groupsOpt = [...groups.map((opt) => ({value: opt.id, label: opt.name}))]
    const vendorsOpt = [...vendors.map((opt) => ({value: opt.id, label: opt.name}))]
    const localsOpt = [...locals.map((opt) => ({value: opt.id, label: `${opt.name} ${opt.region_name} ${opt.code}`}))]

    const handleSubmit = (e) => {
        e.preventDefault();
        addSale(vendor, group, local);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label >بنکە</Form.Label>
                <Select placeholder="هەڵبژاردن..." name="group" options={groupsOpt}
                        onChange={(e) => setGroup(e.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label >ڤیزیتۆر</Form.Label>
                <Select placeholder="هەڵبژاردن..." name="vendor" options={vendorsOpt}
                        onChange={(e) => setVendor(e.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label >فرۆشگا</Form.Label>
                <Select placeholder="هەڵبژاردن..." name="local" options={localsOpt}
                        onChange={(e) => setLocal(e.value)}/>
            </Form.Group>
            <hr/>
            <Button variant="success" type="submit">
                زیادکردنی داواکاری
            </Button>
        </Form>
    )
}

export default AddSaleForm
