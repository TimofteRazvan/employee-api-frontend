import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function UpdateProject() {
    let navigate = useNavigate()

    const { id } = useParams()

    const [project, setProject] = useState({
        name: "",
        clientName: "",
        language: "",
        deadline: "",
        description: ""
    })

    const { name, clientName, language, deadline, description } = project

    const onInputChange = (event) => {
        setProject({ ...project, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        const loadProject = async () => {
            //const result = await axios.get(`api/projects/${id}`)
            const result = await axios.get(`http://localhost:8080/projects/${id}`)
            setProject(result.data)
        }
    }, []);


    const onAccept = async (event) => {
        event.preventDefault();
        //await axios.put(`api/projects/${id}`, project)
        await axios.put(`http://localhost:8080/projects/${id}`, project)
        navigate("/projects")
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h4 className='text-center m-4'>UPDATE PROJECT</h4>
                    <form onSubmit={(event) => onAccept(event)}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Name
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter name'
                                name='name'
                                value={name}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='ClientName' className='form-label'>
                                Client Name
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter client name'
                                name='clientName'
                                value={clientName}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Language' className='form-label'>
                                Language
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter language'
                                name='language'
                                value={language}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Deadline' className='form-label'>
                                Deadline (YYYY-MM-DD)
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter deadline'
                                name='deadline'
                                value={deadline}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Description' className='form-label'>
                                Description
                            </label>
                            <input type={'text'}
                                className='form-control'
                                placeholder='Enter description'
                                name='description'
                                value={description}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <button type='submit' className='btn btn-primary'>Accept</button>
                        <Link to='/projects' className='btn btn-outline-primary m-2'>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
