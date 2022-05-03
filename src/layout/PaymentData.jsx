import React, { useContext, useEffect, useState } from 'react'
import randomColor from "randomcolor";

import LineChart from './LineCart';
import moment from 'moment';
import BarChart from './BarChart';
import { GroupsContext } from '../contexts/GroupsContext';

const PaymentData = ({ data }) => {
    const [grow, setGrow] = useState(0)
    const [dataChart, setDataChart] = useState(
        {
            datasets:
                [...data.map((opt) => (
                    {
                        label: opt.name,
                        data: opt.paymentByMonth,
                        backgroundColor: randomColor({
                            luminosity: 'dark',
                            format: 'rgba',
                            alpha: 0.5 // e.g. 'rgba(9, 1, 107, 0.5)',
                        }),
                        fill: true,
                        borderColor: randomColor({
                            luminosity: 'dark',
                            format: 'rgba' // e.g. 'rgba(9, 1, 107, 0.6482447960879654)'
                        }),
                    }
                ))
                ],
        }
    );

    useEffect(() => {
        let balebz = {}
        data.map((grop) => (Object.keys(grop.paymentByMonth).map((item) => (
            balebz[item] = grop.paymentByMonth[item]
        ))))
        setDataChart({
            labels: [...Object.keys(balebz).map((opt) => opt)],
            datasets:
                [...data.map((opt) => (
                    {
                        label: opt.name,
                        data: [...Object.values(opt.paymentByMonth).map((opt) => opt)],
                        backgroundColor: randomColor({
                            luminosity: 'dark',
                            format: 'rgba',
                            alpha: 0.5 // e.g. 'rgba(9, 1, 107, 0.5)',
                        }),
                        fill: true,
                        borderColor: randomColor({
                            luminosity: 'dark',
                            format: 'rgba' // e.g. 'rgba(9, 1, 107, 0.6482447960879654)'
                        }),
                    }
                ))
                ],
        })
        let today = 0
        let last = 0
        data.map((grop) =>
        {
            last += (grop.paymentByMonth[moment(new Date()).subtract(1, 'months').format("YYYY-MM")] || 0.0)
            today += (parseFloat(grop.paymentByMonth[moment(new Date()).subtract(0, 'months').format("YYYY-MM")]) || 0.0)
        }
        )
        setGrow(((
            (
                (
                    today
                    - last
                )
                / last
            ) * 100
        ) || 0.0).toFixed(2))

    }, [data])


    return (
        <>
            <div className="card">
                <div className="card-header border-0">
                    <div className="d-flex justify-content-between">
                        <h3 className="card-title">Sales</h3>
                        <a href="javascript:void(0);">View Report</a>
                    </div>
                </div>
                <div className="card-body">
                    <div className="d-flex">
                        <p className="d-flex flex-column">
                            <span className="text-bold text-lg">{ }</span>
                            <span>Sales Over Time</span>
                        </p>
                        {grow > 0 ? <p className="ml-auto d-flex flex-column text-right">
                            <span className="text-success">
                                <i className="fas fa-arrow-up" /> %{grow}
                            </span>
                            <span className="text-muted">Since last month</span>
                        </p> : <p className="ml-auto d-flex flex-column text-right">
                            <span className="text-danger">
                                <i className="fas fa-arrow-down" /> %{grow}
                            </span>
                            <span className="text-muted">Since last month</span>
                        </p>}
                    </div>
                    <>
                        {<BarChart chartData={dataChart} />}
                    </>
                    <div className="d-flex flex-row justify-content-end">
                        <span className="mr-2">
                            <i className="fas fa-square text-primary" /> This year
                        </span>
                        <span>
                            <i className="fas fa-square text-gray" /> Last year
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentData