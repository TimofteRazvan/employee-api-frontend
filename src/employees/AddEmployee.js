import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddEmployee() {
    let navigate = useNavigate()
    const [employee, setEmployee] = useState({
        name: "",
        city: "",
        age: 18
    })

    const { name, city, age } = employee

    const onInputChange = (event) => {
        setEmployee({ ...employee, [event.target.name]: event.target.value })
    }

    const onAccept = async (event) => {
        event.preventDefault();
        //3.76.207.9:80
        await axios.post("api/employees", employee)
        //await axios.post("http://localhost:8080/employees", employee)
        navigate("/")
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h4 className='text-center m-4'>NEW EMPLOYEE</h4>
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
                        <button type='submit' className='btn btn-primary'>Accept</button>
                        <Link to='/' className='btn btn-outline-primary m-2'>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
