import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Home() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [length, setLength] = useState(1);

    let i = 0, nr = 10;

    const { id } = useParams();

    const {currentPage, setCurrentPage} = useState(1);

    useEffect(() => {
        setLoading(true);
        loadEmployees();
        // const pageNumbers = [];
        // for(let i = 1; i <= Math.ceil(length / recordsPerPage); i++) {
        //     pageNumbers.push(i);
        // }
    }, []);

    const loadEmployees = async () => {
        const result = await axios.get(`api/employees/page/${i}/${nr}`)
        //const result = await axios.get(`http://localhost:8080/employees/page/${i}/${nr}`)
        setEmployees(result.data);
    };

    const deleteEmployee = async (id) => {
        //await axios.delete(`api/employees/${id}`)
        await axios.delete(`http://localhost:8080/employees/${id}`)
        loadEmployees();
    };

    const handleSort=(e)=>{
        const sortedData = [...employees].sort((a,b)=>{
            return a.age > b.age ? 1 : -1
        })
        setEmployees(sortedData)
    }

    const incPage = (e) => {
        i = i + 1;
        loadEmployees();
    }

    const decPage = (e) => {
        if (i >= 1)
            i = i - 1;
        loadEmployees();
    }

    function changePage(newpage) {
        setCurrentPage(newpage);
    }

    const recordsPerPage = 10;
    const lastIndex = currentPage + recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = employees.slice(firstIndex, lastIndex)
    const npage = Math.ceil(employees.length / recordsPerPage)
    const pageNumbers = [...Array(npage + 1).keys()].slice(1);

    return (
        <div className='container'>
            <div className='py-4'>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="btn btn-outline-dark" to="/add-employee">Add Employee</Link>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">CITY</th>
                            <th scope="col">AGE</th>
                            <th scope="col">SPOUSE</th>
                            <th scope="col">ADDRESSES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((employee, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.city}</td>
                                    <td>{employee.age}</td>
                                    <td>{employee.spouse}</td>
                                    <td>{employee.addresses}</td>
                                    <td>
                                        <Link className='btn btn-primary mx-2'
                                            to={`/view-employee/${employee.id}`}>View</Link>
                                        <Link className='btn btn-outline-primary mx-2'
                                            to={`/update-employee/${employee.id}`}>Update</Link>
                                        <button className='btn btn-danger mx-2'
                                            onClick={() => deleteEmployee(employee.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <button className='btn btn-danger mx-2' onClick={() => handleSort()}>Sort</button>
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
