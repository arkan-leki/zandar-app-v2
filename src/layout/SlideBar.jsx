import { faBusinessTime, faChartBar, faCartArrowDown, faCartPlus, faMale, faMoneyBill, faSearchDollar, faStore, faTruckLoading, faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import image from "../og.jpg";
import userimage from "./img/user2-160x160.jpg";

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GroupsContext } from '../contexts/GroupsContext'

const SlideBar = () => {
    const { groups, setGrop, setGropId } = useContext(GroupsContext)
    const changeGrop = (groid) => {
        setGrop(groups.filter((gro) => gro.id === groid))
        setGropId(groid)
    }
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4 d-print-none ">
            {/* Brand Logo */}
            <a href="index3.html" className="brand-link">
                <img src={image} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">ZanderApp 3</span>
            </a>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={userimage} className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">Alexander Pierce</a>
                    </div>
                </div>
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library */}
                        <li className="nav-item has-treeview menu-open">
                            <a href="#" className="nav-link ">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p className='m-2'>
                                    داشبۆرد
                                    <i className="right fas fa-angle-left" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="/" className="nav-link">
                                    <i className="nav-icon far fa-circle text-warning" />
                                        <p className='m-2'>هوموو</p>
                                    </a>
                                </li>
                                {groups.map((gro) => (
                                    <li className="nav-item">
                                        <a href="#" className="nav-link" onClick={(e) => changeGrop(gro.id)}>
                                            <i className="far fa-circle nav-icon" />
                                            <p className='m-2'>{gro.name}</p>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to={`/sales`}><FontAwesomeIcon icon={faCartArrowDown} />
                                <p className='m-2'>
                                    فرۆشتنەکان
                                    <span className="right badge badge-danger">نوێ</span>
                                </p></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to={`/items`}><FontAwesomeIcon icon={faWarehouse} />
                                <p className='m-2'>
                                    کۆگا
                                    <span className="right badge badge-danger">نوێ</span>
                                </p></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to={`/sales`}><FontAwesomeIcon icon={faTruckLoading} />
                                <p className='m-2'>
                                    باری هاتوو
                                    <span className="right badge badge-danger">نوێ</span>
                                </p></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to={`/locals2`}><FontAwesomeIcon icon={faMale} />
                                <p className='m-2'>
                                    کڕیاران
                                    <span className="right badge badge-danger">نوێ</span>
                                </p></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to={`/locals`}><FontAwesomeIcon icon={faMoneyBill} />
                                <p className='m-2'>
                                    قەرزاران
                                    <span className="right badge badge-danger">نوێ</span>
                                </p></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to={`/company`}><FontAwesomeIcon icon={faBusinessTime} />
                                <p className='m-2'>
                                    کۆمپانیاکان
                                    <span className="right badge badge-danger">نوێ</span>
                                </p></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to={`/retail`}><FontAwesomeIcon icon={faChartBar} />
                                <p className='m-2'>
                                    ئامارەکان
                                    <span className="right badge badge-danger">نوێ</span>
                                </p></Link>
                        </li>
                        {/* <li className="nav-header">LABELS</li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-circle text-danger" />
                                <p className="text">Important</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-circle text-warning" />
                                <p>Warning</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-circle text-info" />
                                <p>Informational</p>
                            </a>
                        </li> */}
                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>



    )
}

export default SlideBar