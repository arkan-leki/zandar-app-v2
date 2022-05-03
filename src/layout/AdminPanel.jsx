import React from 'react'
import Header from './Header'
import SlideBar from './SlideBar'
import AsideNav from './AsideNav'
import Footer from './Footer'
import Home from './Home'

const AdminPanel = (props) => {
  return (
    <>
      <div className="wrapper">
        <Header  />
        <SlideBar />
        <Home>{props.children}</Home>
        <AsideNav />
        <Footer />
      </div>
    </>
  )
}

export default AdminPanel