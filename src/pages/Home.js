import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {
    const [employees, setEmployees] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        const result = await axios.get("api/employees-details")
        //const result = await axios.get("http://localhost:8080/employees-details")
        setEmployees(result.data);
    };

    const deleteEmployee = async (id) => {
        await axios.delete(`api/employees/${id}`)
        //await axios.delete(`http://localhost:8080/employees/${id}`)
        loadEmployees();
    };

    const handleSort=(e)=>{
        const sortedData = [...employees].sort((a,b)=>{
            return a.age > b.age ? 1 : -1
        })
        setEmployees(sortedData)
    }

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
            </div>
        </div>
    )
}
