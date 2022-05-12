import React, { useContext, useEffect, useState } from 'react'
import { GroupsContext } from '../contexts/GroupsContext';
import { VendorsContext } from '../contexts/VendorsContext';
import ItemsContextProvider from '../contexts/ItemsContext';
import Balance from './Balance';
import TopList from './TopList';
import VisotData from './VisotData';
import PaymentData from './PaymentData';
import { PaymentsContext } from '../contexts/PaymentsContext';
import Currency from '../helper/Currency';
import { APIContext } from '../contexts/APIContext';
import moment from 'moment'

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
    const { xgrop } = useContext(GroupsContext)
    const { xvendors } = useContext(VendorsContext)
    const { banks } = useContext(PaymentsContext)
    const [sales, setSales] = useState([])
    const { salesURL, zenderAXIOS } = useContext(APIContext)
    useEffect(() => {
        zenderAXIOS.get(`${salesURL}?status=false`).then((response) => {
            setSales(response.data);
        });
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        zenderAXIOS.get(`${salesURL}?status=false`).then((response) => {
            setSales(response.data);
        });
        // eslint-disable-next-line
    }, [])

    return (
        <>

            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>{Object.values(sales).reduce((r) => r + 1, 0)}</h3>
                                    <p>داواکاری نوێ</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-shopping-cart" />
                                </div>
                                <a href="#" className="small-box-footer">
                                    زیاتر <i className="fas fa-arrow-circle-right" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>{Currency(Object.values(banks).reduce((r, { income, loan }) => r + (parseFloat(income) - parseFloat(loan)), 0))}</h3>
                                    <p>قاسە</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-stats-bars" />
                                </div>
                                <a href="#" className="small-box-footer">
                                    زیاتر <i className="fas fa-arrow-circle-right" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>
                                        {Currency(Object.values(banks.filter((fee) => moment(new Date(fee.date)).format("MM/YYYY") === moment(new Date()).format("MM/YYYY"))).reduce((r, { income, loan }) => r + (parseFloat(income) - parseFloat(0)), 0))}
                                    </h3>
                                    <p>گەڕاوە</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-money-bill" />
                                </div>
                                <a href="#" className="small-box-footer">
                                    زیاتر <i className="fas fa-arrow-circle-right" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-danger">
                                <div className="inner">
                                    <h3>{Currency(Object.values(xgrop).reduce((r, { totallSellMonthly }) => r + parseFloat(totallSellMonthly), 0))}</h3>
                                    <p>فرۆش</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-chart-pie" />
                                </div>
                                <a href="#" className="small-box-footer">
                                    زیاتر <i className="fas fa-arrow-circle-right" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <PaymentData data={xgrop} />
                            <Balance />
                            <div className="card">
                                <div className="card-header border-0">
                                    <h3 className="card-title">Products</h3>
                                    <div className="card-tools">
                                        <a href="/" className="btn btn-tool btn-sm">
                                            <i className="fas fa-download" />
                                        </a>
                                        <a href="/" className="btn btn-tool btn-sm">
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
                            {xvendors.filter((vendor)=> vendor.status === false ).map(vendor => (
                                <VisotData vendor={vendor} key={vendor.id} />
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