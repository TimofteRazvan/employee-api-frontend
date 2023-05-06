import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Filtered() {
    const [spouses, setSpouses] = useState([]);
    const {currentPage, setCurrentPage} = useState(1);
    let i = 0, nr = 10;

    useEffect(() => {
        loadSpouses();
    }, []);

    const loadSpouses = async () => {
        //const result = await axios.delete(`api/spouses/${i}/${nr}`)
        const result = await axios.get(`http://localhost:8080/spouses/page/${i}/${nr}`)
        setSpouses(result.data);
    };

    const deleteSpouse = async (id) => {
        //await axios.delete(`api/employees/${id}`)
        await axios.delete(`http://localhost:8080/spouses/${id}`)
        loadSpouses();
    };

    const incPage = (e) => {
        i = i + 1;
        loadSpouses();
    }

    const decPage = (e) => {
        if (i >= 1)
            i = i - 1;
        loadSpouses();
    }

    function changePage(newpage) {
        setCurrentPage(newpage);
    }

    const recordsPerPage = 10;
    const lastIndex = currentPage + recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = spouses.slice(firstIndex, lastIndex)
    const npage = Math.ceil(spouses.length / recordsPerPage)
    const pageNumbers = [...Array(npage + 1).keys()].slice(1);

    return (
        <div className='container'>
            <div className='py-4'>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="btn btn-outline-light" to="/add-spouse">Add Spouse</Link>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">PHONE</th>
                            <th scope="col">AGE</th>
                            <th scope="col">IS WORKING</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            spouses.map((spouse, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{spouse.id}</td>
                                    <td>{spouse.name}</td>
                                    <td>{spouse.phone}</td>
                                    <td>{spouse.age}</td>
                                    <td>{spouse.working.toString()}</td>
                                    <td>
                                        <Link className='btn btn-primary mx-2'
                                            to={`/view-spouse/${spouse.id}`}>View</Link>
                                        <Link className='btn btn-outline-primary mx-2'
                                            to={`/update-spouse/${spouse.id}`}>Update</Link>
                                        <button className='btn btn-danger mx-2'
                                            onClick={() => deleteSpouse(spouse.id)}>Delete</button>
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
