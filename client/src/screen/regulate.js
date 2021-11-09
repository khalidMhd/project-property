import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '../App.css';
import Navbar from "./Navbar";
import './style/dashboard.css'
import 'react-toastify/dist/ReactToastify.css'
import $ from 'jquery'
import { listRegulateItemsAction } from "../action/regulateItems";

const RegulateScreen = (props) => {
    const dispatch = useDispatch()
    let serNo = 0   
    const itemId = props.match.params.id

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const regulateItemListData = useSelector(state => state.regulateItemListData);
    const { regulateItemList, loading, error } = regulateItemListData;
    
    useEffect(() => {
        userInfo ? props.history.push('/regulate/'+itemId) : props.history.push('/signin');
        dispatch(listRegulateItemsAction(itemId))

    }, [userInfo])

    $(document).ready(function () {
        $("#myInput").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myTable tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });

    return (
        <>
            <Navbar />
            <main >

                < div className=" m-4">

                    {loading ?
                        <div className="text-center">
                            <div className="spinner-border text-primary" style={{ width: '50px', height: '50px', top: '-100px' }} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        :
                        <>
                            {error ?
                                <div className=' text-center'>
                                    <h4 className="text-muted">Somethings Wrong</h4>
                                    <button className='btn btn-primary btn-sm' onClick={() => window.location.reload()}>Refresh</button>
                                </div> :
                                <div className='cart shadow bg-white rounded p-3 '>
                                    <div>
                                        <h5 className="text-muted">Regulate Items</h5>
                                    </div>

                                    {/* table */}
                                    <div className='table-responsive '>
                                        <table className="table table-bordered table table-hover">
                                            <thead>
                                                <tr className='table-active'>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Min Price</th>
                                                    <th scope="col">Max Price</th>
                                                </tr>
                                            </thead>
                                            <tbody id="myTable">
                                                {regulateItemList ?.map(item =>
                                                    <tr>
                                                        <th scope="row">{serNo += 1}</th>
                                                        <td>{new Date(item ?.createdAt).getDate() + '-' + new Date(item ?.createdAt).getMonth() + '-' + new Date(item ?.createdAt).getFullYear()}</td>
                                                        <td>{item ?.minPrice}</td>
                                                        <td>{item ?.maxPrice}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                            }
                        </>
                    }
                </div>
            </main>
        </>
    )

}

export default RegulateScreen;