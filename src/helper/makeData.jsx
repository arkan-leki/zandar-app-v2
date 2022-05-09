import React, { useEffect, useState } from 'react'
import { useTable } from 'react-table'

import axios from "axios";
import BTable from "react-bootstrap/Table";

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <BTable striped bordered hover size="sm" {...getTableProps()}>
            <thead>
                {headerGroups.map(group => (
                    <tr {...group.getHeaderGroupProps()}>
                        {group.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
            <tfoot>
                {footerGroups.map(group => (
                    <tr {...group.getFooterGroupProps()}>
                        {group.headers.map(column => (
                            <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                        ))}
                    </tr>
                ))}
            </tfoot>
        </BTable>
    )
}

function DataTabel() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                Footer: 'Name',
                columns: [
                    {
                        Header: 'ناو',
                        accessor: 'name',
                    },
                    {
                        Header: 'موبایل',
                        accessor: 'phone',
                    },
                ],
            },
            {
                Header: 'Info',
                Footer: 'Info',
                columns: [
                    {
                        Header: 'items',
                        accessor: 'items',
                    },
                    {
                        Header: 'totallSell',
                        accessor: 'totallSell',
                    }, {
                        Header: 'totallOrder',
                        accessor: 'totallOrder',
                    }, {
                        Header: 'totallSellMonthly',
                        accessor: 'totallSellMonthly',
                    },
                    {
                        Header: 'loans',
                        accessor: 'loans',
                    },
                    {
                        Header: 'status',
                        accessor: 'status',
                    },
                ],
            },
        ],
        []
    )

    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://127.0.8.1:8000/api/groups/').then((response) => {
            setData(response.data)
        });
        // eslint-disable-next-line
    }, [])

    return (
        <div className='m-5'>
            <Table columns={columns} data={data} />
        </div>
    )
}

export default DataTabel
