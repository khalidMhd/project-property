import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '../App.css';
import Navbar from "./Navbar";
import './style/dashboard.css'
import { addUnitAction, deleteUnitAction, editUnirAction, listUnitAction } from "../action/unit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import $ from 'jquery'

const UnitScreen = (props) => {
    const dispatch = useDispatch()
    const [isActiveFilter, setIsActiveFilter] = useState("all")
    const [isActive, setIsActive] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [id, setId] = useState("")
    let serNo = 0


    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const unitAddData = useSelector(state => state.unitAddData);
    const { loading: saveLoading, error: saveError, success: saveSuccess } = unitAddData;

    const unitDeleteData = useSelector(state => state.unitDeleteData);
    const { loading: DeleteLoading, error: deleteError, success: deleteSuccess } = unitDeleteData;

    const unitListData = useSelector(state => state.unitListData);
    const { unitList, loading, error } = unitListData;

    const unitEditData = useSelector(state => state.unitEditData);
    const { loading: editLoading, error: editError, success: editSuccess } = unitEditData;

    useEffect(() => {
        userInfo ? props.history.push('/units') : props.history.push('/signin');
        dispatch(listUnitAction())
    }, [userInfo])

    var selectUnit = unitList?.filter(function (data) {
        if (isActiveFilter === "active") {
            return data?.isActive === true;
        } if (isActiveFilter === "inActive") {
            return data?.isActive === false;
        } else {
            return data
        }
    });

    function handleCheck() {
        setIsActive(!isActive)
    }

    if (deleteSuccess) {
        toast.success("Unit Deleted Successfully!");
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    if (saveSuccess) {
        toast.success("Unit Added Successfully!");
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    if (editSuccess) {
        toast.success("Unit Updated Successfully!");
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addUnitAction(name, description, isActive))
    }

    const submitUpdHandler = (e) => {
        e.preventDefault()
        dispatch(editUnirAction(id, name, description, isActive))
    }

    const deleteHandler = (id) => {
        dispatch(deleteUnitAction(id))
    }

    const updateHandler = (unit) => {
        setId(unit?._id)
        setName(unit?.name)
        setDescription(unit?.description)
        setIsActive(unit.isActive)
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
                                <> <ToastContainer />
                                    <div className='cart shadow bg-white rounded p-3 '>
                                        <div>
                                            <h5 className="text-muted">Units</h5>
                                        </div>

                                        {/* filter */}
                                        <div className='row justify-content-between my-4'>
                                            <div className='col-sm-2'>
                                                <form>
                                                    <div className="form-group ">
                                                        <select onChange={(e) => setIsActiveFilter(e.target.value)} className="form-control bg-light rounded" id="exampleFormControlSelect1">
                                                            <option value="" disabled selected>Status</option>
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
                                        {unitList.length === 0 ? <h5 className="text-muted text-center">Item Not Found!</h5> :
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
                                                            {selectUnit?.map(unit =>
                                                                <>
                                                                    <tr>
                                                                        <th scope="row">{serNo += 1}</th>
                                                                        <td>{unit?.name}</td>
                                                                        <td>{unit?.description}</td>
                                                                        <td>
                                                                            <span class={unit?.isActive ? "badge badge-pill badge-info" : "badge badge-pill badge-danger"}> {unit?.isActive ? "active" : "inactive"} </span>
                                                                        </td>
                                                                        <td>
                                                                            <i className="fa fa-pencil-alt text-info " data-toggle="modal" onClick={() => updateHandler(unit)} data-target={"#edititems" + unit?._id} style={{ cursor: "pointer" }} title="Edit"></i>
                                                                            <i className="fa fa-trash-alt text-danger  ml-2" onClick={() => { if (window.confirm('Are you sure to delete this unit?')) deleteHandler(unit?._id) }} style={{ cursor: "pointer" }} title="Delete"></i>
                                                                            {/* <i className="fa fa-power-off text-muted ml-2" style={{ cursor: "pointer" }} ></i> */}
                                                                        </td>
                                                                    </tr>


                                                                    {/* edit model */}

                                                                    <div className="modal fade" id={"edititems" + unit?._id} tabindex="-1" role="dialog" aria-labelledby="edititemsTitle" aria-hidden="true">
                                                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                                                            <div className="modal-content">
                                                                                <div className="modal-header text-center">
                                                                                    <div className='modal-title w-100 '>
                                                                                        <p className="w-100 fa fa-pencil-alt fa-3x mt-1 mr-1 text-info" ></p> <br />
                                                                                        <h4 className="text-muted">Edit Unit</h4>
                                                                                    </div>

                                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                        <span aria-hidden="true">&times;</span>
                                                                                    </button>
                                                                                </div>

                                                                                {editLoading &&
                                                                                    <div className="text-center">
                                                                                        <div className="spinner-border text-primary" style={{ width: '50px', height: '50px', top: '-100px' }} role="status">
                                                                                            <span className="sr-only">Loading...</span>
                                                                                        </div>
                                                                                    </div>}
                                                                                {editError && <h4 className="text-muted text-center">Somethings Wrong</h4>}


                                                                                <div className="modal-body">
                                                                                    <form onSubmit={submitUpdHandler}>
                                                                                        <div className="form-group">
                                                                                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control rounded border-top-0 border-left-0 border-right-0" id="exampleFormControlInput1" placeholder="Unit Name" />
                                                                                        </div>

                                                                                        <div className="form-group">
                                                                                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control rounded border-top-0 border-left-0 border-right-0" id="exampleFormControlInput1" placeholder="Unit Description" />
                                                                                        </div>


                                                                                        <div className="form-group ">
                                                                                            <label className="checkbox checkbox-primary">
                                                                                                <input type="checkbox" onChange={() => setIsActive(!isActive)} defaultChecked={unit?.isActive} className='big-checkbox' name="status" id="status" value="active" />
                                                                                                <span className=" ml-1 h5 text-muted">Active</span></label>
                                                                                        </div>

                                                                                        <div>
                                                                                            <button type="submit" className="btn btn-primary w-100 rounded-pill">Save Unit</button>
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
                                                        <h4 className="text-muted">Add Unit</h4>
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
                                                {saveError && <h4 className="text-muted text-center">Unit Already Exist</h4>}

                                                <div className="modal-body">
                                                    <form onSubmit={submitHandler}>
                                                        <div className="form-group">
                                                            <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control rounded border-top-0 border-left-0 border-right-0" id="exampleFormControlInput1" placeholder="Unit Name" required />
                                                        </div>

                                                        <div className="form-group">
                                                            <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} className="form-control rounded border-top-0 border-left-0 border-right-0" id="exampleFormControlInput1" placeholder="Unit Description" required />
                                                        </div>

                                                        <div className="form-group ">
                                                            <label className="checkbox checkbox-primary">
                                                                <input type="checkbox" onChange={handleCheck} defaultChecked={isActive} className='big-checkbox' name="status" id="status" value="active" />
                                                                <span className=" ml-1 h5 text-muted">Active</span>
                                                            </label>
                                                        </div>

                                                        <div>
                                                            <button type="submit" className="btn btn-primary w-100 rounded-pill">Create Unit</button>
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
                </div>
            </main>
        </>
    )

}

export default UnitScreen;