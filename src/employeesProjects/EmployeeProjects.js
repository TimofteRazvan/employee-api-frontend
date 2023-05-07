import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function EmployeeProjects() {
    const [eps, setEps] = useState([]);
    const {currentPage, setCurrentPage} = useState(1);
    let i = 0, nr = 10;

    useEffect(() => {
        loadEmployeeProjects();
    }, []);

    const loadEmployeeProjects = async () => {
        const result = await axios.get(`api/employees-projects/page/${i}/${nr}`)
        //const result = await axios.get(`http://localhost:8080/employees-projects/page/${i}/${nr}`)
        setEps(result.data);
    };

    const deleteEmployeeProject = async (id) => {
        await axios.delete(`api/employees-projects/${id}`)
        //await axios.delete(`http://localhost:8080/employees-projects/${id}`)
        loadEmployeeProjects();
    };

    const incPage = (e) => {
        i = i + 1;
        loadEmployeeProjects();
    }

    const decPage = (e) => {
        if (i >= 1)
            i = i - 1;
        loadEmployeeProjects();
    }

    function changePage(newpage) {
        setCurrentPage(newpage);
    }

    const recordsPerPage = 10;
    const lastIndex = currentPage + recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = eps.slice(firstIndex, lastIndex)
    const npage = Math.ceil(eps.length / recordsPerPage)
    const pageNumbers = [...Array(npage + 1).keys()].slice(1);

    return (
        <div className='container'>
            <div className='py-4'>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="btn btn-outline-dark" to="/add-employee-project">Add EmployeeProjects</Link>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">EMPLOYEE</th>
                            <th scope="col">PROJECT</th>
                            <th scope="col">ROLE</th>
                            <th scope="col">EFFICIENCY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            eps.map((ep, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{ep.id}</td>
                                    <td>{ep.employee}</td>
                                    <td>{ep.project}</td>
                                    <td>{ep.role}</td>
                                    <td>{ep.efficiency}</td>
                                    <td>
                                        <Link className='btn btn-primary mx-2'
                                            to={`/view-employee-project/${ep.id}`}>View</Link>
                                        <Link className='btn btn-outline-primary mx-2'
                                            to={`/update-employee-project/${ep.id}`}>Update</Link>
                                        <button className='btn btn-danger mx-2'
                                            onClick={() => deleteEmployeeProject(ep.id)}>Delete</button>
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