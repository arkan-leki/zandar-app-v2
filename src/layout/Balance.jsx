import React, { useContext, useEffect } from 'react'
import { GroupsContext } from '../contexts/GroupsContext'
import Currency from '../helper/Currency'

const Balance = () => {
    const { grop  } = useContext(GroupsContext)
    useEffect(() => {
        
    }, [grop])
    return (
        <>
            {grop.map(group => (
                <div className="card">
                    <div className="card-header border-0">
                        <h3 className="card-title">Online Store Overview {group.name}</h3>
                        <div className="card-tools">
                            <a href="#" className="btn btn-sm btn-tool">
                                <i className="fas fa-download" />
                            </a>
                            <a href="#" className="btn btn-sm btn-tool">
                                <i className="fas fa-bars" />
                            </a>
                        </div>
                    </div>
                    <div className="card-body">
                        <>
                            <div className="d-flex justify-content-between align-items-center border-bottom mb-3">
                                <p className="text-success text-xl">
                                    <i className="ion ion-ios-refresh-empty" />
                                </p>
                                <p className="d-flex flex-column text-right">
                                    <span className="font-weight-bold">
                                        <i className="ion ion-android-arrow-up text-success" /> {Currency(parseFloat(group.totallSell) - parseFloat(group.payments) + parseFloat(group.oldAccs))} 
                                    </span>
                                    <span className="text-muted">پارە لە بازاڕ</span>
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center border-bottom mb-3">
                                <p className="text-warning text-xl">
                                    <i className="ion ion-ios-cart-outline" />
                                </p>
                                <p className="d-flex flex-column text-right">
                                    <span className="font-weight-bold">
                                        <i className="ion ion-android-arrow-up text-warning" /> {Currency(parseFloat(group.totallBuy) + (parseFloat(group.loans)))}
                                    </span>
                                    <span className="text-muted">قەرز شەریکە</span>
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-0">
                                <p className="text-danger text-xl">
                                    <i className="ion ion-ios-people-outline" />
                                </p>
                                <p className="d-flex flex-column text-right">
                                    <span className="font-weight-bold">
                                        <i className="ion ion-android-arrow-down text-danger" />  {Currency(parseFloat(group.items))}
                                    </span>
                                    <span className="text-muted">مەوادی ماوە</span>
                                </p>
                            </div>
                        </>
                    </div>
                </div>
            ))}
        </>

    )
}

export default Balance