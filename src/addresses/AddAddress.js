import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddAddress() {
    let navigate = useNavigate()
    const [address, setAddress] = useState({
        line1: "",
        line2: "",
        zipCode: "",
        city: "",
        state: "",
        country: "",
        employee: 0
    })

    const { line1, line2, zipCode, city, state, country, employee } = address

    const onInputChange = (event) => {
        setAddress({ ...address, [event.target.name]: event.target.value })
    }

    const onAccept = async (event) => {
        event.preventDefault();
        await axios.post("https://grifon.crabdance.com/addresses", address)
        //await axios.post("http://localhost:8080/addresses", address)
        navigate("/addresses")
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h4 className='text-center m-4'>NEW ADDRESS</h4>
                    <form onSubmit={(event) => onAccept(event)}>
                        <div className='mb-3'>
                            <label htmlFor='Line1' className='form-label'>
                                Line1
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter line1'
                                name='line1'
                                value={line1}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Line2' className='form-label'>
                                Line2
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter line2'
                                name='line2'
                                value={line2}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='ZipCode' className='form-label'>
                                ZipCode
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter zipcode'
                                name='zipCode'
                                value={zipCode}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='City' className='form-label'>
                                City
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter city'
                                name='city'
                                value={city}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='State' className='form-label'>
                                State
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter state'
                                name='state'
                                value={state}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Country' className='form-label'>
                                Country
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter country'
                                name='country'
                                value={country}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Employee' className='form-label'>
                                Employee ID
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter employee ID'
                                name='employee'
                                value={employee}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <button type='submit' className='btn btn-primary'>Accept</button>
                        <Link to='/addresses' className='btn btn-outline-primary m-2'>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
