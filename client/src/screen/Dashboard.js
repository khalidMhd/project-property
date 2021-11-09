import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '../App.css';
import Navbar from "./Navbar";
import './style/dashboard.css'
import { listItemsAction } from "../action/items";
import { listCategoryAction } from "../action/category";
import { listUnitAction } from "../action/unit";
import { listAreaAction } from "../action/area";
import RegulareChart from "./chart/regulateChart";
import ItemBarChart from "./chart/itemBarChart";
const DashboardScreen = (props) => {
    const dispatch = useDispatch()

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const itemListData = useSelector(state => state.itemListData);
    const { itemList, loading: listItemLoading, error: listItemError } = itemListData;

    const areaListData = useSelector(state => state.areaListData);
    const { areaList, loading: listAreaLoading, error: listAreaError } = areaListData;

    const categoryListData = useSelector(state => state.categoryListData);
    const { categoryList, loading: listCategoryLoading, error: listCategoryError } = categoryListData;

    const unitListData = useSelector(state => state.unitListData);
    const { unitList, loading: listUnitLoading, error: listUnitError } = unitListData;
    useEffect(() => {
        userInfo ? props.history.push('/') : props.history.push('/signin')
        dispatch(listItemsAction())
        dispatch(listCategoryAction())
        dispatch(listUnitAction())
        dispatch(listAreaAction())

    }, [userInfo])

    return (
        <>
            <Navbar />
            <main >

                < div className=" m-4">

                    {listItemLoading ?
                        <div className="text-center">
                            <div className="spinner-border text-primary" style={{ width: '50px', height: '50px', top: '-100px' }} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div> :
                        <>
                            {listItemError ?
                                <div className=' text-center'>
                                    <h4 className="text-muted">Somethings Wrong</h4>
                                    <button className='btn btn-primary btn-sm' onClick={() => window.location.reload()}>Refresh</button>
                                </div> :
                                <>

                                    <div className="row d-flex ">

                                        <div className="col-sm mt-2">
                                            <div className="d-flex justify-content-between card shadow bg-white rounded single-chart" style={{ borderBottomColor: '#ff9f00', }}>
                                                <div>
                                                    <svg viewBox="0 0 36 36" className="circular-chart orange">
                                                        <path className="circle-bg"
                                                            d="M18 2.0845
                                                            a 15.9155 15.9155 0 0 1 0 31.831
                                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                        <path className="circle"
                                                            strokeDasharray="30, 100"
                                                            d="M18 2.0845
                                                            a 15.9155 15.9155 0 0 1 0 31.831
                                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                        <text x="18" y="20.35" className="percentage">{itemList?.length || 0}%</text>
                                                    </svg>
                                                </div>
                                                <div className="svg-text">
                                                    <h3 style={{ color: "#ff9f00" }}>{itemList?.length || 0}</h3>
                                                    <p className=' text-muted'>Total Items</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm mt-2">
                                            <div className="d-flex justify-content-between card shadow bg-white rounded single-chart" style={{ borderBottomColor: '#4CC790', }}>
                                                <div>
                                                    <svg viewBox="0 0 36 36" className="circular-chart green">
                                                        <path className="circle-bg"
                                                            d="M18 2.0845
                                                            a 15.9155 15.9155 0 0 1 0 31.831
                                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                        <path className="circle"
                                                            strokeDasharray="30, 100"
                                                            d="M18 2.0845
                                                            a 15.9155 15.9155 0 0 1 0 31.831
                                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                        <text x="18" y="20.35" className="percentage">{areaList?.length || 0}%</text>
                                                    </svg>
                                                </div>
                                                <div className="svg-text">
                                                    <h3 style={{ color: "#4CC790" }}>{areaList?.length || 0}</h3>
                                                    <p className=' text-muted'>Total Areas</p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-sm mt-2">
                                            <div className="d-flex justify-content-between card shadow bg-white rounded single-chart " style={{ borderBottomColor: '#3c9ee5' }}>
                                                <div>
                                                    <svg viewBox="0 0 36 36" className="circular-chart blue">
                                                        <path className="circle-bg"
                                                            d="M18 2.0845
                                                            a 15.9155 15.9155 0 0 1 0 31.831
                                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                        <path className="circle"
                                                            strokeDasharray="30, 100"
                                                            d="M18 2.0845
                                                            a 15.9155 15.9155 0 0 1 0 31.831
                                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                        <text x="18" y="20.35" className="percentage">{categoryList?.length || 0}%</text>
                                                    </svg>
                                                </div>
                                                <div className="svg-text">
                                                    <h3 style={{ color: '#3c9ee5' }}>{categoryList?.length || 0}</h3>
                                                    <p className=' text-muted'>Total Categories</p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-sm mt-2">
                                            <div className="d-flex justify-content-between card shadow bg-white rounded single-chart" style={{ borderBottomColor: '#F75A5F', }}>
                                                <div>
                                                    <svg viewBox="0 0 36 36" className="circular-chart red">
                                                        <path className="circle-bg"
                                                            d="M18 2.0845
                                                            a 15.9155 15.9155 0 0 1 0 31.831
                                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                        <path className="circle"
                                                            strokeDasharray="30, 100"
                                                            d="M18 2.0845
                                                            a 15.9155 15.9155 0 0 1 0 31.831
                                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                        <text x="18" y="20.35" className="percentage">{unitList?.length || 0}%</text>
                                                    </svg>
                                                </div>
                                                <div className="svg-text">
                                                    <h3 style={{ color: '#F75A5F' }}>{unitList?.length || 0}</h3>
                                                    <p className=' text-muted'>Total Units</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-sm">
                                            <div className="shadow bg-white rounded p-2">
                                                <ItemBarChart />
                                            </div>
                                        </div>
                                    </div>


                                </>
                            }

                        </>
                    }

                </div>
            </main>
        </>
    )

}

export default DashboardScreen;