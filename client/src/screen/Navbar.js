import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import Cookie from 'js-cookie'
import ProfileImg from './assets/profile.png'
import 'bootstrap/js/dist/tab';
import logo from './assets/Logo.jpeg'
import './style/Navbar.css'
import './style/Sidebar.css'

const Navbar = () => {
    const history = useHistory()
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const [sidebarOpen, setsidebarOpen] = useState(false);
    const openSidebar = () => {
        setsidebarOpen(true);
    };
    const closeSidebar = () => {
        setsidebarOpen(false);
    };

    const logoutHandler = () => {
        Cookie.remove("userInfo");
        history.push('/signin')
        window.location.reload()
    };


    return (
        <>

            <nav className="navbar shadow">
                <div className="nav_icon" onClick={() => openSidebar()}>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </div>
                <div className="navbar__left">
                    {/* <a href="#">Subscribers</a>
                <a href="#">Video Management</a>
                <a className="active_link" href="#">
                Admin
                </a> */}
                </div>
                <div className="navbar__right">
                    {/* <a href="#">
                <i className="fa fa-search" aria-hidden="true"></i>
                </a>
                <a href="#">
                <i className="fa fa-clock-o" aria-hidden="true"></i>
                </a> */}
                    <div className='chip'>
                        <span className="dropdown">
                            <img src={ProfileImg} style={{ cursor: 'pointer' }} className="rounded-circle dropdown-toggle navImg" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                <div style={{ width: '200px', margin: 'auto' }}>
                                    <img src={ProfileImg} className="card-img-top rounded-circle" style={{ width: '100px', display: "block", margin: 'auto' }} alt="Card image cap" />
                                    <h5 className="card-title text-center">{userInfo?.data?.name}</h5>
                                    <div className="card-body text-center">
                                        {/* <Link to='/profile' className=" btn btn-info shadow rounded mr-2"> <i className="fas fa-user"></i></Link> */}
                                        <button onClick={() => { if (window.confirm('Are you sure you want to log out?')) { logoutHandler() }; }} className=" btn btn-danger shadow rounded"> <i className="fas fa-sign-out-alt"></i></button>
                                    </div>
                                </div>
                            </div>
                        </span>
                        <span className="text-dark mx-2 h6">{userInfo?.data?.name}</span>
                    </div>
                </div>
            </nav>

            <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
                <div className="sidebar__title">
                    <div className="sidebar__img">
                        {/* <Link to='/'>
                    <img src={logo} alt="logo" />

                    </Link> */}
                        <h4 className="title">ADMIN</h4>
                    </div>
                    <i
                        onClick={() => closeSidebar()}
                        className="fa fa-times"
                        id="sidebarIcon"
                        aria-hidden="true"
                    ></i>
                </div>

                <div className="sidebar__menu">
                    <div className="sidebar__link active_menu_link">
                        <NavLink exact={true} to='/' activeClassName='text-success'>
                            <i className="fa fa-home icon"> </i>
                            <p>Dashboard</p>
                        </NavLink>
                    </div>
                </div>

                {/* <div className="sidebar__menu">
                    <div className="sidebar__link active_menu_link">
                        <NavLink exact={true} to='/regulate' activeClassName='text-success'>
                            <i className="fa fa-save icon"> </i>
                            <p>Regulate Items</p>
                        </NavLink>
                    </div>
                </div> */}

                <div className="sidebar__menu">
                    <div className="sidebar__link active_menu_link">
                        <NavLink exact={true} to='/items' activeClassName='text-success'>
                            <i className="fa fa-columns icon"> </i>
                            <p>Items</p>
                        </NavLink>
                    </div>
                </div>

                <div className="sidebar__menu">
                    <div className="sidebar__link active_menu_link">
                        <NavLink exact={true} to='/category' activeClassName='text-success'>
                            <i className="fa fa-align-justify icon"> </i>
                            <p>Categories</p>
                        </NavLink>
                    </div>
                </div>

                <div className="sidebar__menu">
                    <div className="sidebar__link active_menu_link">
                        <NavLink exact={true} to='/units' activeClassName='text-success'>
                            <i className="fa fa-grip-lines icon"> </i>
                            <p>Units</p>
                        </NavLink>
                    </div>
                </div>

                <div className="sidebar__menu">
                    <div className="sidebar__link active_menu_link">
                        <NavLink exact={true} to='/area' activeClassName='text-success'>
                            <i className="fa fa-compass icon"> </i>
                            <p>Area</p>
                        </NavLink>
                    </div>
                </div>

                <div className="sidebar__menu">
                    <div className="sidebar__link active_menu_link">
                        <NavLink exact={true} to='/complaint' activeClassName='text-success'>
                            <i className="fa fa-comment icon"> </i>
                            <p>Complaints</p>
                        </NavLink>
                    </div>
                </div>

                <div className="sidebar__menu">
                    <div className="sidebar__link active_menu_link">
                        <NavLink exact={true} to='/settings' activeClassName='text-success'>
                            <i className="fa fa-cog icon"> </i>
                            <p>Settings</p>
                        </NavLink>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Navbar;