import {Button, Form} from "react-bootstrap";
import Select from "react-select";
import React, {useContext, useState} from "react";
import {LocalsContext} from "../../contexts/LocalsContext";
import {RegionsContext} from "../../contexts/RegionlsContext";

const LocalEditForm = ({theLocal}) => {
    const {updateLocal} = useContext(LocalsContext);
    const {regions} = useContext(RegionsContext)


    const regionsOpt = [...regions.map((opt) => ({value: opt.id, label: opt.name}))]

    const [name, setName] = useState(theLocal.name)
    const [phone, setPhone] = useState(theLocal.phone)
    const [code, setCode] = useState(theLocal.code)
    // const [address, setAddress] = useState(theLocal.address)
    const [owner, setOwner] = useState(theLocal.owner_name)
    const [region, setRegion] = useState(theLocal.region)

    const handleSubmit = (e) => {
        e.preventDefault();
        updateLocal(theLocal.id,
        {
            "name": name,
            "code": code,
            "phone": phone,
            "owner_name": owner,
            "region": region,
        }
        );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label >فرۆشگا</Form.Label>
                <Form.Control type='text' defaultValue={name}  onChange={(event)=> setName(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label >خاوەنی کار</Form.Label>
                <Form.Control type='text' defaultValue={owner}  onChange={(event)=> setOwner(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label >کۆد</Form.Label>
                <Form.Control type='text' defaultValue={code}  onChange={(event)=> setCode(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label >ژ.موبایل</Form.Label>
                <Form.Control type='text' defaultValue={phone}  onChange={(event)=> setPhone(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label >ناونیشان</Form.Label>
                <Select defaultValue={regionsOpt[theLocal.region-1]}  placeholder="هەڵبژاردن..." name="group"  options={regionsOpt} onChange={(e) => setRegion(e.value)}/>
            </Form.Group>
            <hr/>
            <Button variant="success" type="submit">
                زیادکردنی کڕیار
            </Button>
        </Form>
    )
}
export default LocalEditForm