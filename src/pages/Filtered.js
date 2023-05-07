import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Filtered() {
    const [employees, setEmployees] = useState([]);

    const { age } = useParams();
    let offset=0, pageSize=10;
    const {currentPage, setCurrentPage} = useState(1);

    useEffect(() => {
        loadEmployees();
        //eslint-disable-next-line
    }, []);

    const loadEmployees = async () => {
        if (age != 0) {
            //const result = await axios.get(`api/employees/filter/age/${age}/${offset}/${pageSize}`)
            const result = await axios.get(`http://localhost:8080/employees/filter/age/${age}/${offset}/${pageSize}`)
            setEmployees(result.data);
        }
        else {
            //const result = await axios.get(`api/employees/page/${offset}/${pageSize}`)
            const result = await axios.get(`http://localhost:8080/employees/page/${offset}/${pageSize}`)
            /*
            let newArr = []
            result.forEach((e,i) => {
            let index = newArr.findIndex(el => el.name === e.name);
            if(index !== -1 ) newArr[index].value += parseFloat(e.value); //add to the value if an element is not unique
            if(index === -1 ) newArr.push({...e, value: parseFloat(e.value)}); //push to the array if the element is unique and convert value to float
            });*/
            let arr = result.data;
            arr.sort((e1,e2) => (e1.age < e2.age) ? 1 : (e1.age > e2.age) ? -1 : 0);
            setEmployees(arr.data);
        }
    };

    const deleteEmployee = async (id) => {
        //await axios.delete(`api/employees/${id}`)
        await axios.delete(`http://localhost:8080/employees/${id}`)
        loadEmployees();
    };

    const incPage = (e) => {
        offset = offset + 1;
        loadEmployees();
    }

    const decPage = (e) => {
        if (offset >= 1)
            offset = offset - 1;
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
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">CITY</th>
                            <th scope="col">AGE</th>
                            <th scope="col">SPOUSE</th>
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
