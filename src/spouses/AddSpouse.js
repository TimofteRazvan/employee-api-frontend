import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddSpouse() {
    let navigate = useNavigate()
    const [spouse, setSpouse] = useState({
        name: "",
        phone: "",
        age: 18,
        working: false
    })

    const { name, phone, age, working } = spouse

    const onInputChange = (event) => {
        setSpouse({ ...spouse, [event.target.name]: event.target.value })
    }

    const onAccept = async (event) => {
        event.preventDefault();
        await axios.post("https://grifon.crabdance.com/spouses", spouse)
        //await axios.post("http://localhost:8080/spouses", spouse)
        navigate("/spouses")
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
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
}
