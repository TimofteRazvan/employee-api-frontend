import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewAddress() {
    const [address, setAddress] = useState({
        id: 0,
        line1: "",
        line2: "",
        zipCode: "",
        city: "",
        state: "",
        country: "",
        employee: 0
    })

    const { id } = useParams();

    useEffect(()=>{
        loadAddress();

    },[])

    const loadAddress=async()=>{
        const result = await axios.get(`https://grifon.crabdance.com/addresses/${id}`);
        console.log(result);
        setAddress(result.data);
    }

    // const loadAddress = async () => {
    //     console.log("start get")
    //     const result = await axios.get(`api/addresses/${id}`)
    //     console.log(result.data)
    //     //const result = await axios.get(`http://localhost:8080/addresses/${id}`)
    //     setAddress(result.data)
    // }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h4 className='text-center m-4'>ADDRESS DETAILS</h4>
                    <div className='card'>
                        <div className='card-header'>
                            Details of ADDRESS ID:{address.id}
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Line1: </b>
                                    {address.line1}
                                </li>
                                <li className='list-group-item'>
                                    <b>Line2: </b>
                                    {address.line2}
                                </li>
                                <li className='list-group-item'>
                                    <b>ZipCode: </b>
                                    {address.zipCode}
                                </li>
                                <li className='list-group-item'>
                                    <b>City: </b>
                                    {address.city}
                                </li>
                                <li className='list-group-item'>
                                    <b>State: </b>
                                    {address.state}
                                </li>
                                <li className='list-group-item'>
                                    <b>Country: </b>
                                    {address.country}
                                </li>
                                <li className='list-group-item'>
                                    <b>Employee: </b>
                                    {address.employee}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to={"/addresses"}>Back</Link>
                </div>
            </div>
        </div>
    )
}
