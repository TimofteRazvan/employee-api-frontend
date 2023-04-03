import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewEmployee() {
    const [employee, setEmployee] = useState({
        name: "",
        city: "",
        age: ""
    })

    const { id } = useParams();

    useEffect(() => {
        loadEmployee()
    }, [])

    const loadEmployee = async () => {
        const result = await axios.get(`api/employees/${id}`)
        //const result = await axios.get(`http://localhost:8080/employees/${id}`)
        setEmployee(result.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h4 className='text-center m-4'>EMPLOYEE DETAILS</h4>
                    <div className='card'>
                        <div className='card-header'>
                            Details of Employee ID:{employee.id}
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Name: </b>
                                    {employee.name}
                                </li>
                                <li className='list-group-item'>
                                    <b>City: </b>
                                    {employee.city}
                                </li>
                                <li className='list-group-item'>
                                    <b>Age: </b>
                                    {employee.age}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to={"/"}>Back</Link>
                </div>
            </div>
        </div>
    )
}
