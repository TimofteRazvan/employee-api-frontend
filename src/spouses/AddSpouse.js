import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {wait} from "@testing-library/user-event/dist/utils";
import modal from "bootstrap/js/src/modal";

export default function AddSpouse() {
    let navigate = useNavigate()
    const [spouse, setSpouse] = useState({
        name: "",
        phone: "",
        age: 18,
        working: false
    })
    const [errorList,setErrorList] = useState([]);

    const { name, phone, age, working } = spouse

    const onInputChange = (event) => {
        setSpouse({ ...spouse, [event.target.name]: event.target.value })
    }

    const onAccept = async (event) => {
        event.preventDefault();
        const result = await axios.post("https://grifon.crabdance.com/spouses", spouse)
        //const result = await axios.post("http://localhost:8080/spouses", spouse)
        console.log(result.data.toString())
        if(!result.data.toString().includes("Object")){
            setErrorList(result.data.replace('[','').replace(']','').split(","));
            document.getElementById("dialogToggle").click();
        }else{
            navigate("/spouses");
        }
        //navigate("/spouses")
    }

    const resultBig = (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <button id="dialogToggle" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal " hidden={true}>Errors</button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Please fix the following problems</h5>
                                </div>
                                <div className="modal-body">
                                    {errorList?.map(error => (
                                        <li>{error}</li>
                                    ))}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h4 className='text-center m-4'>NEW SPOUSE</h4>
                    <form onSubmit={(event) => onAccept(event)}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Name
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter name'
                                name='name'
                                value={name}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Phone' className='form-label'>
                                Phone
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter phone number'
                                name='phone'
                                value={phone}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Age' className='form-label'>
                                Age
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter age'
                                name='age'
                                value={age}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Working' className='form-label'>
                                Working?
                            </label>
                            <select name='working' onChange={(event) => onInputChange(event)}>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>

                        </div>
                        <button type='submit' className='btn btn-primary'>Accept</button>
                        <Link to='/' className='btn btn-outline-primary m-2'>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
    return resultBig;
}
