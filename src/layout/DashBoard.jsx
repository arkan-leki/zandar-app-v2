import React, { useContext, useEffect, useState } from 'react'
import { GroupsContext } from '../contexts/GroupsContext';
import { VendorsContext } from '../contexts/VendorsContext';

import ItemsContextProvider from '../contexts/ItemsContext';
import Balance from './Balance';
import BarChart from './BarChart'
import TopList from './TopList';
import VisotData from './VisotData';
import PaymentData from './PaymentData';

export const UserData = [
    {
        id: 1,
        year: 2016,
        userGain: 80000,
        userLost: 823,
    },
    {
        id: 2,
        year: 2017,
        userGain: 45677,
        userLost: 345,
    },
    {
        id: 3,
        year: 2018,
        userGain: 78888,
        userLost: 555,
    },
    {
        id: 4,
        year: 2019,
        userGain: 90000,
        userLost: 45550,
    },
    {
        id: 5,
        year: 2020,
        userGain: 4300,
        userLost: 2340,
    },
];

const DashBoard = () => {
    const { grop, groups } = useContext(GroupsContext)
    const { vendors } = useContext(VendorsContext)
    const [dataChart, setDataChart] = useState(
        {
            labels: [...groups.map((opt) => ({ value: opt.id, label: opt.name }))],
            datasets: [
                {
                    label: "الوزير",
                    data: {
                        "2022-04": 6589.08,
                        "2022-03": 16168.87,
                        "2022-02": 12227.89,
                        "2022-01": 15914.8,
                        "2021-12": 14898.5,
                        "2021-11": 15229.69,
                        "2021-10": 6801.33
                    },
                    backgroundColor: "rgba(75,192,192,0.2)",
                    fill: true,
                    borderColor: "rgba(75,192,192,1)"
                },
                {
                    label: "Lost",
                    data: {
                        "2022-04": 6589.08,
                        "2022-03": 16168.87,
                        "2022-02": 12227.89,
                        "2022-01": 15914.8,
                        "2021-12": 14898.5,
                        "2021-11": 15229.69,
                        "2021-10": 6801.33
                    },
                    fill: false,
                    backgroundColor: "#742774",
                    borderColor: "#742774"
                },

            ],
        },
    );

    return (
        <>

            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <PaymentData data={groups} />
                            <Balance />
                            <div className="card">
                                <div className="card-header border-0">
                                    <h3 className="card-title">Products</h3>
                                    <div className="card-tools">
                                        <a href="#" className="btn btn-tool btn-sm">
                                            <i className="fas fa-download" />
                                        </a>
                                        <a href="#" className="btn btn-tool btn-sm">
                                            <i className="fas fa-bars" />
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body table-responsive p-0">
                                    <ItemsContextProvider>
                                        <TopList list={UserData} />
                                    </ItemsContextProvider>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            {vendors.map(vendor => (
                                <VisotData vendor={vendor} />
                            )
                            )}
                            <Balance />
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default DashBoard