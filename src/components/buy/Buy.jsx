import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Buy = ({ buy }) => {
    return (
        <>
            <td>{buy.id}</td>
            <td>{buy.group_name}
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            وردەکاری
                        </Tooltip>
                    }>
                    <Link className="d-print-none" to={`/buyDetail/${buy.id}`}>
                        <FontAwesomeIcon
                            icon={faEdit} /></Link>
                </OverlayTrigger>
            </td>
            <td>{buy.code}</td>
            <td>{buy.totall}</td>
            <td>{buy.date}</td>
        </>
    )
}

export default Buy
