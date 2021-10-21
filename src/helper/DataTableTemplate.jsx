import React, {useEffect, useState} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';

import BTable from 'react-bootstrap/Table';

import {useTable} from 'react-table'
import axios from "axios";


function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <BTable striped bordered hover size="sm" {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                                <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </BTable>
    )
}

function DataTableTemplate() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'local_name',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'local_code',
                    },
                ],
            },
            // {
            //     Header: 'Info',
            //     columns: [
            //         {
            //             Header: 'Age',
            //             accessor: 'age',
            //         },
            //         {
            //             Header: 'Visits',
            //             accessor: 'visits',
            //         },
            //         {
            //             Header: 'Status',
            //             accessor: 'status',
            //         },
            //         {
            //             Header: 'Profile Progress',
            //             accessor: 'progress',
            //         },
            //     ],
            // },
        ],
        []
    )

    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/sells/').then((response) => {
            setData(response.data)
        });
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Table columns={columns} data={data} />
        </div>
    )
}

export default DataTableTemplate