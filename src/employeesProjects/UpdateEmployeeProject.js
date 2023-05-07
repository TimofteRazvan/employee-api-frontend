import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function AddEmployeeProject() {
    let navigate = useNavigate()
    const [employeeProject, setEmployeeProject] = useState({
        employee: 0,
        project: 0,
        role: "",
        efficiency: ""
    })

    const { id } = useParams()

    const { employee, project, role, efficiency } = employeeProject

    const onInputChange = (event) => {
        setEmployeeProject({ ...employeeProject, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        const loadEmployeeProject = async () => {
            const result = await axios.get(`api/employees-projects/${id}`)
            //const result = await axios.get(`http://localhost:8080/employees-projects/${id}`)
            setEmployeeProject(result.data)
        }
    }, []);

    const onAccept = async (event) => {
        event.preventDefault();
        await axios.put(`api/employees-projects/${id}`, employeeProject)
        //await axios.put(`http://localhost:8080/employees-projects/${id}`, employeeProject)
        navigate("/employees-projects")
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h4 className='text-center m-4'>UPDATE EMPLOYEE_PROJECT</h4>
                    <form onSubmit={(event) => onAccept(event)}>
                        <div className='mb-3'>
                            <label htmlFor='Employee' className='form-label'>
                                Employee ID
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter employee ID'
                                name='employee'
                                value={employee}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Project' className='form-label'>
                                Project ID
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter project ID'
                                name='project'
                                value={project}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Role' className='form-label'>
                                Role
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter role'
                                name='role'
                                value={role}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Efficiency' className='form-label'>
                                Efficiency
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter efficiency'
                                name='efficiency'
                                value={efficiency}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <button type='submit' className='btn btn-primary'>Accept</button>
                        <Link to='/employees-projects' className='btn btn-outline-primary m-2'>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
