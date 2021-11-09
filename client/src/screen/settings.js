import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '../App.css';
import Navbar from "./Navbar";
import './style/dashboard.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { editPasswordAction } from "../action/auth";

const SettingScreen = (props) => {
    const dispatch = useDispatch()
    const [currentPassword, setCurrentPassword] = useState("")
    const [matchPassword, setMatchPassword] = useState("")
    const [updatePassword, setUpdatePassword] = useState("")

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const passwordEditData = useSelector(state => state.passwordEditData);
    const { loading, error, success } = passwordEditData;

    useEffect(() => {
        userInfo ? props.history.push('/settings') : props.history.push('/signin');
    }, [userInfo])

    if (success) {
        toast.success("Password Updated Successfully!");
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(editPasswordAction(currentPassword, updatePassword))
    }

    return (
        <>
            <Navbar />
            <main >

                < div className=" m-4">
                    <ToastContainer />
                    <div className='cart shadow bg-white rounded '>
                        <div className='border border-top-0 border-left-0 border-right-0 '>
                            <h5 className="text-muted pt-4 pb-4 pl-4">Change Password</h5>
                        </div>

                        <form onSubmit={submitHandler} className=' p-3 mt-3'>
                            {loading &&
                                <div className="text-center">
                                    <div className="spinner-border text-primary" style={{ width: '50px', height: '50px', top: '-100px' }} role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }

                            {error &&
                                <div className=' text-center'>
                                    <p className="text-danger">The current password is not match with old password.</p>
                                </div>
                            }

                            <div className="form-group">
                                <input type="password" onChange={(e) => setCurrentPassword(e.target.value)} value={currentPassword} className="form-control" id="exampleInputPassword1" placeholder="Current Password" required />
                            </div>
                            <div className="form-group py-3">
                                <input type="password" onChange={(e) => setUpdatePassword(e.target.value)} value={updatePassword} className="form-control" id="exampleInputPassword1" placeholder="New Password" required />
                            </div>
                            <div className="form-group">
                                <input type="password" onChange={(e) => setMatchPassword(e.target.value)} value={matchPassword} className={matchPassword !== updatePassword ? "form-control is-invalid" : "form-control"} id="validationServer03" placeholder="City" required />
                                {matchPassword !== updatePassword &&
                                    <div className="invalid-feedback">
                                        Please enter the same value again.
                                    </div>
                                }
                            </div>
                            <div className='pt-4'>
                                <button type="submit" className="btn btn-primary mr-3" style={{ width: '100px' }} disabled={matchPassword !== updatePassword}>Save</button>
                                <button className="btn btn-secondary" onClick={() => props.history.push('/')} style={{ width: '100px' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )

}

export default SettingScreen;