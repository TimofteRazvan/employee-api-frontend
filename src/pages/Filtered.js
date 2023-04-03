import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

export default function Filtered() {
    const [employees, setEmployees] = useState([]);

    const { age } = useParams();

    useEffect(() => {
        loadEmployees();
        //eslint-disable-next-line
    }, []);

    const loadEmployees = async () => {
        if (age != 0) {
            //const result = await axios.get(`api/employees/filter/age/${age}`)
            const result = await axios.get(`http://localhost:8080/employees/filter/age/${age}`)
            setEmployees(result.data);
        }
        else {
            //const result = await axios.get("api/employees/compare/age")
            const result = await axios.get("http://localhost:8080/employees/compare/age")
            setEmployees(result.data);
        }
    };

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
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
