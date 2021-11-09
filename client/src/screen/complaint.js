import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '../App.css';
import Navbar from "./Navbar";
import './style/dashboard.css'
import { ToastContainer, toast } from 'react-toastify';
import $ from 'jquery'
import { listComplaintAction } from "../action/complaint";
import NotFound from './assets/notfound.png'

const ComplaintScreen = (props) => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    let serNo = 0
    function showImage() {
        return setLoaded(true)
    }


    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const complaintListData = useSelector(state => state.complaintListData);
    const { complaintList, loading, error } = complaintListData;

    useEffect(() => {
        userInfo ? props.history.push('/complaint') : props.history.push('/signin');
        dispatch(listComplaintAction())
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
                                <>
                                    <div className='cart shadow bg-white rounded p-3 '>
                                        <div>
                                            <h5 className="text-muted">Area</h5>
                                        </div>

                                        {/* filter */}
                                        <div className='row justify-content-between my-4'>

                                            <div className='col-sm-3'>
                                                <div className='d-flex justify-content-between'>
                                                    <form>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control  rounded-pill bg-light" id="myInput" placeholder="Search" />
                                                        </div>

                                                    </form>
                                                </div>
                                            </div>
                                        </div>

                                        {/* table */}
                                        {complaintList.length === 0 ? <h5 className="text-muted text-center">Complaint Not Found!</h5> :
                                            <div className='table-responsive '>
                                                <table className="table table-bordered table table-hover">
                                                    <thead>
                                                        <tr className='table-active'>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Contact</th>
                                                            <th scope="col">Details</th>
                                                            <th scope="col">image</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="myTable">
                                                        <>
                                                            {complaintList?.map(complaint =>
                                                                <>
                                                                    <tr>
                                                                        <th scope="row">{serNo += 1}</th>
                                                                        <td>{complaint?.name}</td>
                                                                        <td>{complaint?.contactNo}</td>
                                                                        <td>{complaint?.detail}</td>
                                                                        <td>
                                                                            <img src={NotFound} width="100" height="50" style={loaded ? { display: "none" } : {}} />

                                                                            <img src={'http://localhost:5000/' + complaint.image} width="100" height="50" onLoad={showImage} style={loaded ? {} : { display: "none" }} />

                                                                        </td>

                                                                    </tr>

                                                                </>
                                                            )}
                                                        </>
                                                    </tbody>

                                                </table>
                                            </div>
                                        }
                                    </div>

                                </>
                            }
                        </>

                    }
                    <ToastContainer />
                </div>
            </main>
        </>
    )

}

export default ComplaintScreen;