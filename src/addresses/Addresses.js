import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Addresses() {
    const [addresses, setAddresses] = useState([]);
    const {currentPage, setCurrentPage} = useState(1);
    let i = 0, nr = 10;

    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {
        const result = await axios.get(`api/addresses/page/${i}/${nr}`)
        //const result = await axios.get(`http://localhost:8080/addresses/page/${i}/${nr}`)
        console.log(result.data);
        setAddresses(result.data);
    };

    const deleteAddress = async (id) => {
        await axios.delete(`api/addresses/${id}`)
        //await axios.delete(`http://localhost:8080/addresses/${id}`)
        loadAddresses();
    };

    const incPage = (e) => {
        i = i + 1;
        loadAddresses();
    }

    const decPage = (e) => {
        if (i >= 1)
            i = i - 1;
        loadAddresses();
    }

    function changePage(newpage) {
        setCurrentPage(newpage);
    }

    const recordsPerPage = 10;
    const lastIndex = currentPage + recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = addresses.slice(firstIndex, lastIndex)
    const npage = Math.ceil(addresses.length / recordsPerPage)
    const pageNumbers = [...Array(npage + 1).keys()].slice(1);

    return (
        <div className='container'>
            <div className='py-4'>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="btn btn-outline-dark" to="/add-address">Add Address</Link>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">LINE1</th>
                            <th scope="col">LINE2</th>
                            <th scope="col">ZIPCODE</th>
                            <th scope="col">CITY</th>
                            <th scope="col">STATE</th>
                            <th scope="col">COUNTRY</th>
                            <th scope="col">EMPLOYEE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            addresses.map((address, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{address.id}</td>
                                    <td>{address.line1}</td>
                                    <td>{address.line2}</td>
                                    <td>{address.zipCode}</td>
                                    <td>{address.city}</td>
                                    <td>{address.state}</td>
                                    <td>{address.country}</td>
                                    <td>{address.employee}</td>
                                    <td>
                                        <Link className='btn btn-primary mx-2'
                                            to={`/view-address/${address.id}`}>View</Link>
                                        <Link className='btn btn-outline-primary mx-2'
                                            to={`/update-address/${address.id}`}>Update</Link>
                                        <button className='btn btn-danger mx-2'
                                            onClick={() => deleteAddress(address.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <nav>
                    <ul className='pagination'>
                        <li className='page-item'>
                            <a href='#' className='page-link' onClick={decPage}>Prev</a>
                        </li>
                    {/* <button className='btn btn-primary mx-2' onClick={decPage}>
                    Prev Page
                    </button> */}
                    {   
                        pageNumbers.map((n, i) => (
                            <li className={`page-item $(currentPage === n ? 'active' : '')`} key={i}>
                                <a href='#' className='page-link' onClick={() => changePage(n)} > {n}</a>
                            </li>
                        ))
                    }
                        <li className='page-item'>
                            <a href='#' className='page-link' onClick={incPage}>Next</a>
                        </li>
                    {/* <button className='btn btn-primary mx-2' onClick={incPage}>
                    Next Page
                    </button> */}
                    </ul>
                </nav>
            </div>
        </div>
    )
}
