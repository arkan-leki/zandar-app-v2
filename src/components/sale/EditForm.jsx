import {Button, Form} from "react-bootstrap";
import Select from "react-select";
import React, {useContext, useState} from "react";
import {SalesContext} from "../../contexts/SalesContext";
import {GroupsContext} from "../../contexts/GroupsContext";
import {VendorsContext} from "../../contexts/VendorsContext";
import { Locals2Context } from "../../contexts/Locals2Context";
// import {LocalsContext} from "../../contexts/LocalsContext";

const EditForm = ({theSale}) => {
    const {updateSale} = useContext(SalesContext);
    const {groups} = useContext(GroupsContext)
    const {vendors} = useContext(VendorsContext)
    const {locals} = useContext(Locals2Context)

    const [vendor, setVendor] = useState(theSale.vendor)
    const [group, setGroup] = useState(theSale.group)
    const [local, setLocal] = useState(theSale.local)

    const groupsOpt = [...groups.map((opt) => ({value: opt.id, label: opt.name}))]
    const vendorsOpt = [...vendors.map((opt) => ({value: opt.id, label: opt.name}))]
    const localsOpt = [...locals.map((opt) => ({value: opt.id, label: opt.name}))]

    const handleSubmit = (e) => {
        e.preventDefault();
        updateSale(theSale.id, {"vendor": vendor, "group": group, "local": local});
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label >بنکە</Form.Label>
                <Select value={
                    groupsOpt.filter(option =>
                        option.value === group)
                } name="group" options={groupsOpt} onChange={(e) => setGroup(e.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label >ڤیزیتۆر</Form.Label>
                <Select value={
                    vendorsOpt.filter(option =>
                        option.value === vendor)
                } placeholder="هەڵبژاردن..." name="vendor" options={vendorsOpt}
                        onChange={(e) => setVendor(e.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label >فرۆشگا</Form.Label>
                <Select value={
                    localsOpt.filter(option =>
                        option.value === local)
                } placeholder="هەڵبژاردن..." name="local" options={localsOpt}
                        onChange={(e) => setLocal(e.value)}/>
            </Form.Group>
            <hr/>
            <Button variant="success" type="submit">
                زیادکردنی داواکاری
            </Button>
        </Form>
    )
}
export default EditForm