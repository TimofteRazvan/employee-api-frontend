import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function UpdateSpouse() {
    let navigate = useNavigate()

    const { id } = useParams()

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

    useEffect(() => {
        //eslint-disable-next-line
        const loadSpouse = async () => {
            const result = await axios.get(`https://grifon.crabdance.com/spouses/${id}`)
            //const result = await axios.get(`http://localhost:8080/spouses/${id}`)
            setSpouse(result.data)
        }
        // eslint-disable-next-line
    }, []);


    const onAccept = async (event) => {
        event.preventDefault();
        await axios.put(`https://grifon.crabdance.com/spouses/${id}`, spouse)
        //await axios.put(`http://localhost:8080/spouses/${id}`, spouse)
        navigate("/spouses")
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h4 className='text-center m-4'>UPDATE SPOUSE</h4>
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
                        <Link to='/spouses' className='btn btn-outline-primary m-2'>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
