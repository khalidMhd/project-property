import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '../App.css';
import Navbar from "./Navbar";
import './style/dashboard.css'
import { addItemsAction, deleteItemsAction, editItemsAction, listItemsAction } from "../action/items";
import { listCategoryAction } from "../action/category";
import { listUnitAction } from "../action/unit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import $ from 'jquery'
import { Link } from "../../node_modules/react-router-dom/cjs/react-router-dom";
const ItemsScreen = (props) => {
    const dispatch = useDispatch()
    const [isActive, setIsActive] = useState(false)
    const [name, setName] = useState("")
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [unitId, setUnitId] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [id, setId] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [unitFilter, setUnitFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    let serNo = 0


    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const itemListData = useSelector(state => state.itemListData);
    const { itemList, loading, error } = itemListData;

    const itemAddData = useSelector(state => state.itemAddData);
    const { loading: saveLoading, error: saveError, success: saveSuccess } = itemAddData;

    const itemDeleteData = useSelector(state => state.itemDeleteData);
    const { loading: DeleteLoading, error: deleteError, success: deleteSuccess } = itemDeleteData;

    const itemEditData = useSelector(state => state.itemEditData);
    const { loading: editLoading, error: editError, success: editSuccess } = itemEditData;

    const categoryListData = useSelector(state => state.categoryListData);
    const { categoryList } = categoryListData;

    const unitListData = useSelector(state => state.unitListData);
    const { unitList } = unitListData;

    useEffect(() => {
        userInfo ? props.history.push('/items') : props.history.push('/signin');
        dispatch(listItemsAction())
        dispatch(listCategoryAction())
        dispatch(listUnitAction())

    }, [userInfo])

    var selectItems = itemList?.filter(function (data) {
        if (categoryFilter !== 'all' && unitFilter !== 'all' && statusFilter === "all") {
            return data?.category === categoryFilter && data?.unit === unitFilter;
        }

        if (categoryFilter === 'all' && unitFilter !== 'all' && statusFilter === "active") {
            return data?.isActive === true && data?.unit === unitFilter;
        }

        if (categoryFilter === 'all' && unitFilter !== 'all' && statusFilter === "inActive") {
            return data?.isActive === false && data?.unit === unitFilter;
        }

        if (categoryFilter !== 'all' && unitFilter === 'all' && statusFilter === "active") {
            return data?.isActive === true && data?.category === categoryFilter;
        }

        if (categoryFilter !== 'all' && unitFilter === 'all' && statusFilter === "inActive") {
            return data?.isActive === false && data?.category === categoryFilter;
        }

        if (categoryFilter !== 'all' && statusFilter === "active" && unitFilter !== 'all') {
            return data.isActive === true && data?.category === categoryFilter && data.unit === unitFilter;
        }
        if (categoryFilter !== 'all' && statusFilter === "inActive" && unitFilter !== 'all') {
            return data.isActive === false && data?.category === categoryFilter && data.unit === unitFilter;
        }
        if (unitFilter !== 'all') {
            return data?.unit === unitFilter;
        }
        if (categoryFilter !== 'all') {
            return data?.category === categoryFilter
        }
        if (statusFilter === "active") {
            return data?.isActive === true;
        }
        if (statusFilter === "inActive") {
            return data?.isActive === false;
        }
        if (statusFilter === "all") {
            return data
        }
        else {
            return data
        }
    });

    function handleCheck() {
        setIsActive(!isActive)
    }

    if (deleteSuccess) {
        toast.success("Item Deleted Successfully!");
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    if (saveSuccess) {
        toast.success("Item Added Successfully!");
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    if (editSuccess) {
        toast.success("Item Updated Successfully!");
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addItemsAction(name, unitId, categoryId, isActive, minPrice, maxPrice))
    }

    const submitUpdHandler = (e) => {
        e.preventDefault()
        dispatch(editItemsAction(id, name, unitId, categoryId, isActive, minPrice, maxPrice))
    }

    const deleteHandler = (id) => {
        dispatch(deleteItemsAction(id))
    }

    const updateHandler = (item) => {
        setId(item?._id)
        setName(item?.name)
        setMinPrice(item?.minPrice)
        setMaxPrice(item?.maxPrice)
        setUnitId(item?.unitId)
        setCategoryId(item?.categoryId)
        setIsActive(item.isActive)
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
                                            <h5 className="text-muted">Items</h5>
                                        </div>

                                        {/* filter */}
                                        <div className='row justify-content-between my-4'>
                                            <div className='col-sm-2'>
                                                <form>
                                                    <div className="form-group ">
                                                        <select className="form-control bg-light rounded" onChange={(e) => setStatusFilter(e.target.value)} id="exampleFormControlSelect1">
                                                            <option value="" disabled selected>Status</option>
                                                            <option value="all">All</option>
                                                            <option value="active">Active</option>
                                                            <option value="inActive">Inactive</option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className='col-sm-2'>
                                                <form>
                                                    <div className="form-group">
                                                        <select onChange={(e) => setCategoryFilter(e.target.value)} className="form-control  bg-light rounded" id="exampleFormControlSelect1">
                                                            <option value="" disabled selected>Category</option>
                                                            <option value="all">All</option>
                                                            {categoryList?.map(category =>
                                                                <option value={category?.name}>{category?.name}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className='col-sm-2'>
                                                <form>
                                                    <div className="form-group">
                                                        <select onChange={(e) => setUnitFilter(e.target.value)} className="form-control  bg-light rounded" id="exampleFormControlSelect1">
                                                            <option value="" disabled selected>Unit</option>
                                                            <option value="all">All</option>
                                                            {unitList?.map(unit =>
                                                                <option value={unit?.name}>{unit?.name}</option>
                                                            )}
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
                                        {itemList.length === 0 ? <h5 className="text-muted text-center">Item Not Found!</h5> :
                                            <div className='table-responsive '>
                                                <table className="table table-bordered table table-hover">
                                                    <thead>
                                                        <tr className='table-active'>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Min Price</th>
                                                            <th scope="col">Max Price</th>
                                                            <th scope="col">Unit</th>
                                                            <th scope="col">Category</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="myTable">
                                                        {selectItems?.map(item =>
                                                            <>
                                                                <tr>
                                                                    <th scope="row">{serNo += 1}</th>
                                                                    <td>{item?.name}</td>
                                                                    <td>{item?.minPrice}</td>
                                                                    <td>{item?.maxPrice}</td>
                                                                    <td>{item?.unit}</td>
                                                                    <td>{item?.category}</td>
                                                                    <td>
                                                                        <span class={item?.isActive ? "badge badge-pill badge-info" : "badge badge-pill badge-danger"}> {item?.isActive ? "active" : "inactive"} </span>
                                                                    </td>
                                                                    <td>
                                                                        <i className="fa fa-pencil-alt text-info " data-toggle="modal" onClick={() => updateHandler(item)} data-target={"#edititems" + item?._id} style={{ cursor: "pointer" }} title="Edit"></i>
                                                                        <i className="fa fa-trash-alt text-danger  ml-2" onClick={() => { if (window.confirm('Are you sure to delete this item?')) deleteHandler(item?._id) }} style={{ cursor: "pointer" }} title="Delete"></i>
                                                                        <Link to={'/regulate/' + item?._id} title="Regulate">
                                                                            <i className="fa fa-eye text-success  ml-2" style={{ cursor: "pointer" }} ></i>
                                                                        </Link>
                                                                        {/* <i className="fa fa-power-off text-muted ml-2" style={{ cursor: "pointer" }} title="active"></i> */}
                                                                    </td>
                                                                </tr>


                                                                {/* edit model */}

                                                                <div className="modal fade" id={"edititems" + item?._id} tabindex="-1" role="dialog" aria-labelledby="edititemsTitle" aria-hidden="true">
                                                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header text-center">
                                                                                <div className='modal-title w-100 '>
                                                                                    <p className="w-100 fa fa-pencil-alt fa-3x mt-1 mr-1 text-info" ></p> <br />
                                                                                    <h4 className="text-muted">Edit Item</h4>
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
                                                                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control rounded border-top-0 border-left-0 border-right-0" id="exampleFormControlInput1" placeholder="Item Name" />
                                                                                    </div>
                                                                                    <div className="form-group">
                                                                                        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="form-control rounded border-top-0 border-left-0 border-right-0" id="exampleFormControlInput1" placeholder="Item Min Price" />
                                                                                    </div>
                                                                                    <div className="form-group">
                                                                                        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="form-control rounded border-top-0 border-left-0 border-right-0" id="exampleFormControlInput1" placeholder="Item Max Price" />
                                                                                    </div>

                                                                                    <div className="form-group">
                                                                                        <select value={unitId} onChange={(e) => setUnitId(e.target.value)} className="form-control border-top-0 border-left-0 border-right-0 rounded" id="exampleFormControlSelect1">
                                                                                            <option value="" disabled selected>Unit</option>
                                                                                            {unitList?.map(unit =>
                                                                                                <> {unit.isActive === true && <option value={unit?._id}>{unit?.name}</option>}</>
                                                                                            )}

                                                                                        </select>
                                                                                    </div>

                                                                                    <div className="form-group">
                                                                                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="form-control border-top-0 border-left-0 border-right-0 rounded" id="exampleFormControlSelect1">
                                                                                            <option value="" disabled selected>Category</option>
                                                                                            {categoryList?.map(category =>
                                                                                                <> {category.isActive === true && <option value={category?._id}>{category?.name}</option>}</>
                                                                                            )}
                                                                                        </select>
                                                                                    </div>

                                                                                    <div className="form-group ">
                                                                                        <label className="checkbox checkbox-primary">
                                                                                            <input type="checkbox" onChange={() => setIsActive(!isActive)} defaultChecked={item?.isActive} className='big-checkbox' name="status" id="status" />
                                                                                            <span className=" ml-1 h5 text-muted">Active</span></label>
                                                                                    </div>

                                                                                    <div>
                                                                                        <button type="submit" className="btn btn-primary w-100 rounded-pill">Save Item</button>
                                                                                    </div>

                                                                                </form>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
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
                                                        <h4 className="text-muted">Add Item</h4>
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
                                                {saveError && <h4 className="text-muted text-center">Item Already Exist</h4>}

                                                <div className="modal-body">
                                                    <form onSubmit={submitHandler}>
                                                        <div className="form-group">
                                                            <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control rounded border-top-0 border-left-0 border-right-0" id="exampleFormControlInput1" placeholder="Item Name" required />
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="number" onChange={(e) => setMinPrice(e.target.value)} value={minPrice} className="form-control rounded border-top-0 border-left-0 border-right-0" id="exampleFormControlInput1" placeholder="Item Min Price" required />
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="number" onChange={(e) => setMaxPrice(e.target.value)} value={maxPrice} className="form-control rounded border-top-0 border-left-0 border-right-0" id="exampleFormControlInput1" placeholder="Item Max Price" required />
                                                        </div>

                                                        <div className="form-group">
                                                            <select onChange={(e) => setUnitId(e.target.value)} className="form-control border-top-0 border-left-0 border-right-0 rounded" id="exampleFormControlSelect1" required>
                                                                <option value="" disabled selected>Unit</option>
                                                                {unitList?.map(unit =>
                                                                    <> {unit.isActive === true && <option value={unit?._id}>{unit?.name}</option>}</>
                                                                )}
                                                            </select>
                                                        </div>

                                                        <div className="form-group">
                                                            <select onChange={(e) => setCategoryId(e.target.value)} className="form-control border-top-0 border-left-0 border-right-0 rounded" id="exampleFormControlSelect1" required>
                                                                <option value="" disabled selected>Category</option>
                                                                {categoryList.map(category =>
                                                                    <> {category.isActive === true && <option value={category?._id}>{category?.name}</option>}</>
                                                                )}
                                                            </select>
                                                        </div>

                                                        <div className="form-group ">
                                                            <label className="checkbox checkbox-primary">
                                                                <input type="checkbox" onChange={handleCheck} defaultChecked={isActive} className='big-checkbox' name="status" id="status" />
                                                                <span className=" ml-1 h5 text-muted">Active</span></label>
                                                        </div>

                                                        <div>
                                                            <button type="submit" className="btn btn-primary w-100 rounded-pill">Create Item</button>
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

export default ItemsScreen;