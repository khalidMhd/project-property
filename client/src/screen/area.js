import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '../App.css';
import Navbar from "./Navbar";
import './style/dashboard.css'
import { ToastContainer, toast } from 'react-toastify';
import $ from 'jquery'
import { addAreaAction, deleteAreaAction, editAreaAction, listAreaAction } from "../action/area";

const AreaScreen = (props) => {
    const dispatch = useDispatch()
    const [isActiveFilter, setIsActiveFilter] = useState("all")
    const [isActive, setIsActive] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [id, setId] = useState("")
    let serNo = 0


    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const areaAddData = useSelector(state => state.areaAddData);
    const { loading: saveLoading, error: saveError, success: saveSuccess } = areaAddData;

    const areaDeleteData = useSelector(state => state.areaDeleteData);
    const { loading: DeleteLoading, error: deleteError, success: deleteSuccess } = areaDeleteData;

    const areaListData = useSelector(state => state.areaListData);
    const { areaList, loading, error } = areaListData;

    const areaEditData = useSelector(state => state.areaEditData);
    const { loading: editLoading, error: editError, success: editSuccess } = areaEditData;

    useEffect(() => {
        userInfo ? props.history.push('/area') : props.history.push('/signin');
        dispatch(listAreaAction())
    }, [userInfo])

    var selectarea = areaList ?.filter(function (data) {
        if (isActiveFilter === "active") {
            return data ?.isActive === true;
        } if (isActiveFilter === "inActive") {
            return data ?.isActive === false;
        } else {
            return data
        }
    });

    function handleCheck() {
        setIsActive(!isActive)
    }

    if (deleteSuccess) {
        toast.success("Area Deleted Successfully!");
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    if (saveSuccess) {
        toast.success("Area Added Successfully!");
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    if (editSuccess) {
        toast.success("Area Updated Successfully!");
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addAreaAction(name, description, isActive))
    }

    const submitUpdHandler = (e) => {
        e.preventDefault()
        dispatch(editAreaAction(id, name, description, isActive))
    }

    const deleteHandler = (id) => {
        dispatch(deleteAreaAction(id))
    }

    const updateHandler = (area) => {
        setId(area ?._id)
        setName(area ?.name)
        setDescription(area ?.description)
        setIsActive(area ?.isActive)
    }

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
                                            <div className='col-sm-2'>
                                                <form>
                                                    <div className="form-group ">
                                                        <select onChange={(e) => setIsActiveFilter(e.target.value)} className="form-control bg-light rounded" id="exampleFormControlSelect1">
                                                            <option value="" disabled selected>Search</option>
                                                            <option value="all">All</option>
                                                            <option value="active">Active</option>
                                                            <option value="inActive">Inactive</option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>

                                            <div className='col-sm-3'>
                                                <div className='d-flex justify-content-between'>
                                                    <form>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control  rounded-pill bg-light" id="myInput" placeholder="Search" />
                                                        </div>

                                                    </form>
                                                    <div>
                                                        <i className="fas fa-plus-circle fa-2x mt-1 mr-1 text-info" data-toggle="modal" data-target="#additems" style={{ cursor: "pointer" }} ></i>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/* table */}
                                        {areaList.length === 0 ? <h5 className="text-muted text-center">Item Not Found!</h5> :
                                            <div className='table-responsive '>
                                                <table className="table table-bordered table table-hover">
                                                    <thead>
                                                        <tr className='table-active'>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Description</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="myTable">
                                                        <>
                                                            {selectarea ?.map(area =>
                                                                <>
                                                                    <tr>
                                                                        <th scope="row">{serNo += 1}</th>
                                                                        <td>{area ?.name}</td>
                                                                        <td>{area ?.description}</td>
                                                                        <td>
                                                                            <span class={area ?.isActive ? "badge badge-pill badge-info" : "badge badge-pill badge-danger"}> {area ?.isActive ? "active" : "inactive"} </span>
                                                                        </td>
                                                                        <td>
                                                                            <i className="fa fa-pencil-alt text-info " data-toggle="modal" onClick={() => updateHandler(area)} data-target={"#edititems" + area ?._id} style={{ cursor: "pointer" }} title="Edit"></i>
                                                                            <i className="fa fa-trash-alt text-danger  ml-2" onClick={() => { if (window.confirm('Are you sure to delete this area?')) deleteHandler(area ?._id) }} style={{ cursor: "pointer" }} title="Delete"></i>
                                                                            {/* <i className="fa fa-power-off text-muted ml-2" style={{ cursor: "pointer" }} ></i> */}
                                                                        </td>
                                                                    </tr>


                                                                    {/* edit model */}

                                                                    <div className="modal fade" id={"edititems" + area ?._id} tabindex="-1" role="dialog" aria-labelledby="edititemsTitle" aria-hidden="true">
                                                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                                                            <div className="modal-content">
                                                                                <div className="modal-header text-center">
                                                                                    <div className='modal-title w-100 '>
                                                                                        <p className="w-100 fa fa-pencil-alt fa-3x mt-1 mr-1 text-info" ></p> <br />
                                                                                        <h4 className="text-muted">Edit Area</h4>
                                                                                    </div>

                                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                        <span aria-hidden="true">&times;</span>
                                                                                    </button>
                                                                                </div>

                                                                                <div className="modal-body">
                                                                                    <form onSubmit={submitUpdHandler}>
                                                                                        <div className="form-group">
                                                                                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control rounded border-top-0 border-left-0 border-right-0" id="exampleFormControlInput1" placeholder="Area Name" />
                                                                                        </div>

                                                                                        <div className="form-group">
                                                                                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control rounded border-top-0 border-left-0 border-right-0" id="exampleFormControlInput1" placeholder="Area Description" />
                                                                                        </div>


                                                                                        <div className="form-group ">
                                                                                            <label className="checkbox checkbox-primary">
                                                                                                <input type="checkbox" onChange={() => setIsActive(!isActive)} defaultChecked={area ?.isActive} className='big-checkbox' name="status" id="status" value="active" />
                                                                                                <span className=" ml-1 h5 text-muted">Active</span></label>
                                                                                        </div>

                                                                                        <div>
                                                                                            <button type="submit" className="btn btn-primary w-100 rounded-pill">Save Area</button>
                                                                                        </div>

                                                                                    </form>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </>
                                                    </tbody>

                                                </table>
                                            </div>
                                        }
                                    </div>

                                    {/* insert model */}

                                    <div className="modal fade" id="additems" tabindex="-1" role="dialog" aria-labelledby="additemsTitle" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header text-center">
                                                    <div className='modal-title w-100 '>
                                                        <p className="w-100 fas fa-plus-circle fa-3x mt-1 mr-1 text-info " ></p> <br />
                                                        <h4 className="text-muted">Add area</h4>
                                                    </div>

                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>

                                                {saveLoading &&
                                                    <div className="text-center">
                                                        <div className="spinner-border text-primary" style={{ width: '50px', height: '50px', top: '-100px' }} role="status">
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                    </div>}
                                                {saveError && <h4 className="text-muted text-center">area Already Exist</h4>}

                                                <div className="modal-body">
                                                    <form onSubmit={submitHandler}>
                                                        <div className="form-group">
                                                            <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control rounded border-top-0 border-left-0 border-right-0" id="exampleFormControlInput1" placeholder="Area Name" required />
                                                        </div>

                                                        <div className="form-group">
                                                            <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} className="form-control rounded border-top-0 border-left-0 border-right-0" id="exampleFormControlInput1" placeholder="Area Description" required />
                                                        </div>

                                                        <div className="form-group ">
                                                            <label className="checkbox checkbox-primary">
                                                                <input type="checkbox" onChange={handleCheck} defaultChecked={isActive} className='big-checkbox' name="status" id="status" value="active" />
                                                                <span className=" ml-1 h5 text-muted">Active</span>
                                                            </label>
                                                        </div>

                                                        <div>
                                                            <button type="submit" className="btn btn-primary w-100 rounded-pill">Create Area</button>
                                                        </div>

                                                    </form>
                                                </div>

                                            </div>
                                        </div>
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

export default AreaScreen;