import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { BuyDetailContext } from '../../contexts/BuyDetailContext'
import { ItemsContext } from '../../contexts/ItemsContext'
import Currency from '../../helper/Currency'

const ItemsListView = ({ buy }) => {
    const { items } = useContext(ItemsContext)
    const { addToList } = useContext(BuyDetailContext)

    const [quantity, setQuantity] = useState(0)
    return (
        <section className='text-center my-5'>
            <h2 className='h1-responsive font-weight-bold text-center my-5'>کاڵاکان</h2>
            <Form>
                {/* <InputGroup>
                <Select placeholder="هەڵبژاردن..." name="group" className="form-control rounded"
                        options={codeOpt} onChange={(event) => handeInput(event.value)}/>
                <Button variant="outline-primary" onClick={() => handleChange(text)}><FontAwesomeIcon
                    icon={faSearch}/></Button>
            </InputGroup> */}
            </Form>
            <Table dark striped bordered hover responsive >
                <thead>
                    <th>#</th>
                    <th>name</th>
                    <th>price</th>
                    <th>mawe</th>
                    <th>hatu</th>
                    <th></th>
                </thead>
                <tbody>
                    {items.filter((i) => i.group === buy.group).map((item, index) =>
                    (
                        <tr key={index} >
                            <td>{item.barcode}</td>
                            <td>{item.name}</td>
                            <td>{Currency(parseFloat(item.price))} </td>
                            <td>{item.mawe}</td>
                            <td><input type={'number'} value={quantity} onChange={event => setQuantity(event.target.valueAsNumber)} /></td>
                            <td>
                                <Button variant={item.deleted ? "secondary" : "primary"} onClick={() => addToList(
                                    {
                                        "temp": true,
                                        "item_name": item.name,
                                        "item_code": item.barcode,
                                        "item_bag": item.bag,
                                        "quantity": quantity,
                                        "price": parseFloat(item.price).toFixed(2),
                                        "total": item.price * quantity,
                                        "item_wight": item.wight,
                                        "item_quantity": item.quantity,
                                        "item_id": item.id,
                                        "order": buy.id
                                    },
                                )} disabled={item.deleted}><FontAwesomeIcon
                                        icon={faCartPlus} /><span>هەڵگرتن</span></Button>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </Table>
        </section >
    )
}

export default ItemsListView
