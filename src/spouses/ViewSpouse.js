import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewSpouse() {
    const [spouse, setSpouse] = useState({
        id: 0,
        name: "",
        phone: "",
        age: "",
        working: false
    })

    const { id } = useParams();

    useEffect(() => {
        loadSpouse()
    }, [])

    const loadSpouse = async () => {
        const result = await axios.get(`api/spouses/${id}`)
        console.log(result);
        //const result = await axios.get(`http://localhost:8080/spouses/${id}`)
        setSpouse(result.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h4 className='text-center m-4'>SPOUSE DETAILS</h4>
                    <div className='card'>
                        <div className='card-header'>
                            Details of SPOUSE ID:{spouse.id}
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Name: </b>
                                    {spouse.name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Phone: </b>
                                    {spouse.phone}
                                </li>
                                <li className='list-group-item'>
                                    <b>Age: </b>
                                    {spouse.age}
                                </li>
                                <li className='list-group-item'>
                                    <b>Working? </b>
                                    {spouse.working.toString()}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to={"/spouses"}>Back</Link>
                </div>
            </div>
        </div>
    )
}
