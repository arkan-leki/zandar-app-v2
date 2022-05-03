import React, { useState } from 'react'
import randomColor from "randomcolor";
import BarChart from './BarChart';
import LineChart from './LineCart';
import moment from 'moment';

const VisotData = ({ vendor }) => {
    const banks = Object.keys(vendor.totallSell)
    const Labels = Object.keys(vendor.totallSell[banks[0]]).map((data) => data)
    const [dataChart, setDataChart] = useState(
        {
            labels: Labels,
            datasets: [...Object.keys(vendor.totallSell).map((key) =>
            ({
                label: key,
                data: Object.keys(vendor.totallSell[key]).map((data) => vendor.totallSell[key][data]),
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
            })
            )]
        },
    );

    const gro = ((
        (
            (
                vendor.totallSell[banks[0]][moment(new Date()).subtract(0, 'months').format("YYYY-MM")]
                - vendor.totallSell[banks[0]][moment(new Date()).subtract(1, 'months').format("YYYY-MM")]
            )
            / vendor.totallSell[banks[0]][moment(new Date()).subtract(1, 'months').format("YYYY-MM")]
        ) * 100
    ) || 0.0).toFixed(2)

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
                            <span className="text-bold text-lg">{ vendor.name}</span>
                            <span>Sales Over Time</span>
                        </p>
                        {gro > 0 ? <p className="ml-auto d-flex flex-column text-right">
                            <span className="text-success">
                                <i className="fas fa-arrow-up" /> %{gro}
                            </span>
                            <span className="text-muted">Since last month</span>
                        </p> : <p className="ml-auto d-flex flex-column text-right">
                            <span className="text-danger">
                                <i className="fas fa-arrow-down" /> %{gro}
                            </span>
                            <span className="text-muted">Since last month</span>
                        </p>}
                    </div>
                    <>
                        <BarChart chartData={dataChart} />
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

export default VisotData