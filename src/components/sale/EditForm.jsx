import {Button, Form} from "react-bootstrap";
import Select from "react-select";
import React, {useContext, useState} from "react";
import {SalesContext} from "../../contexts/SalesContext";
import {GroupsContext} from "../../contexts/GroupsContext";
import {VendorsContext} from "../../contexts/VendorsContext";
import {LocalsContext} from "../../contexts/LocalsContext";

const EditForm = ({theSale}) => {
    const {updateSale} = useContext(SalesContext);
    const {groups} = useContext(GroupsContext)
    const {vendors} = useContext(VendorsContext)
    const {locals} = useContext(LocalsContext)

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
                <Select value={
                    groupsOpt.filter(option =>
                        option.value === group)
                } name="group" className="form-control" options={groupsOpt} onChange={(e) => setGroup(e.value)}/>
            </Form.Group>
            <Form.Group>
                <Select value={
                    vendorsOpt.filter(option =>
                        option.value === vendor)
                } placeholder="هەڵبژاردن..." name="vendor" className="form-control" options={vendorsOpt}
                        onChange={(e) => setVendor(e.value)}/>
            </Form.Group>
            <Form.Group>
                <Select value={
                    localsOpt.filter(option =>
                        option.value === local)
                } placeholder="هەڵبژاردن..." name="local" className="form-control" options={localsOpt}
                        onChange={(e) => setLocal(e.value)}/>
            </Form.Group>
            <Button variant="success" type="submit">
                زیادکردنی داواکاری
            </Button>
        </Form>
    )
}
export default EditForm