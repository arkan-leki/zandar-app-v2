import React from 'react'

const Home = (props) => {
    return (
        <div className="content-wrapper">
            <div className="content-header d-print-none ">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Starter Page</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item active">Starter Page</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* <DashBoard /> */}
            {props.children}
        </div>
    )
}

export default Home