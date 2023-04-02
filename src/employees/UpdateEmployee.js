import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function UpdateEmployee() {
    let navigate = useNavigate()

    const { id } = useParams()

    const [employee, setEmployee] = useState({
        name: "",
        city: "",
        age: 18
    })

    const { name, city, age } = employee

    const onInputChange = (event) => {
        setEmployee({ ...employee, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        //eslint-disable-next-line
        const loadEmployee = async () => {
            const result = await axios.get(`http://localhost:8080/employees/${id}`)
            setEmployee(result.data)
        }
        // eslint-disable-next-line
    }, []);


    const onAccept = async (event) => {
        event.preventDefault();
        await axios.put(`http://localhost:8080/employees/${id}`, employee)
        navigate("/")
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h4 className='text-center m-4'>UPDATE EMPLOYEE</h4>
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
