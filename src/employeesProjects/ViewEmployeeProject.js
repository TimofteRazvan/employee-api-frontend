import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewEmployeeProject() {
    const [employeeProject, setEmployeeProject] = useState({
        employee: 0,
        project: 0,
        role: "",
        efficiency: ""
    })

    const { id } = useParams();

    useEffect(() => {
        loadEmployeeProject()
    }, [])

    const loadEmployeeProject = async () => {
        const result = await axios.get(`https://grifon.crabdance.com/employees-projects/${id}`)
        //const result = await axios.get(`http://localhost:8080/employees-projects/${id}`)
        setEmployeeProject(result.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h4 className='text-center m-4'>EMPLOYEE_PROJECT DETAILS</h4>
                    <div className='card'>
                        <div className='card-header'>
                            Details of EMPLOYEE_PROJECT ID:{employeeProject.id}
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Employee: </b>
                                    {employeeProject.employee}
                                </li>
                                <li className='list-group-item'>
                                    <b>Project: </b>
                                    {employeeProject.project}
                                </li>
                                <li className='list-group-item'>
                                    <b>Role: </b>
                                    {employeeProject.role}
                                </li>
                                <li className='list-group-item'>
                                    <b>Efficiency: </b>
                                    {employeeProject.efficiency}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to={"/employees-projects"}>Back</Link>
                </div>
            </div>
        </div>
    )
}
