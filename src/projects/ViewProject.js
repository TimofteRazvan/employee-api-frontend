import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewProject() {
    const [project, setProject] = useState({
        name: "",
        clientName: "",
        language: "",
        deadline: "",
        description: ""
    })

    const { id } = useParams();

    useEffect(() => {
        loadProject()
    }, [])

    const loadProject = async () => {
        const result = await axios.get(`api/projects/${id}`)
        //const result = await axios.get(`http://localhost:8080/projects/${id}`)
        setProject(result.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h4 className='text-center m-4'>PROJECT DETAILS</h4>
                    <div className='card'>
                        <div className='card-header'>
                            Details of PROJECT ID:{project.id}
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Name: </b>
                                    {project.name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Client Name: </b>
                                    {project.clientName}
                                </li>
                                <li className='list-group-item'>
                                    <b>Language: </b>
                                    {project.language}
                                </li>
                                <li className='list-group-item'>
                                    <b>Deadline: </b>
                                    {project.deadline}
                                </li>
                                <li className='list-group-item'>
                                    <b>Description: </b>
                                    {project.description}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to={"/projects"}>Back</Link>
                </div>
            </div>
        </div>
    )
}
