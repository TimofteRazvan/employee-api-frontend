import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const {currentPage, setCurrentPage} = useState(1);
    let i = 0, nr = 10;

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        const result = await axios.get(`api/projects/page/${i}/${nr}`)
        //const result = await axios.get(`http://localhost:8080/projects/page/${i}/${nr}`)
        setProjects(result.data);
    };

    const deleteProject = async (id) => {
        await axios.delete(`api/projects/${id}`)
        //await axios.delete(`http://localhost:8080/projects/${id}`)
        loadProjects();
    };

    const incPage = (e) => {
        i = i + 1;
        loadProjects();
    }

    const decPage = (e) => {
        if (i >= 1)
            i = i - 1;
        loadProjects();
    }

    function changePage(newpage) {
        setCurrentPage(newpage);
    }

    const recordsPerPage = 10;
    const lastIndex = currentPage + recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = projects.slice(firstIndex, lastIndex)
    const npage = Math.ceil(projects.length / recordsPerPage)
    const pageNumbers = [...Array(npage + 1).keys()].slice(1);

    return (
        <div className='container'>
            <div className='py-4'>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="btn btn-outline-dark" to="/add-project">Add Project</Link>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">CLIENT NAME</th>
                            <th scope="col">LANGUAGE</th>
                            <th scope="col">DEADLINE</th>
                            <th scope="col">DESCRIPTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            projects.map((project, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{project.id}</td>
                                    <td>{project.name}</td>
                                    <td>{project.clientName}</td>
                                    <td>{project.language}</td>
                                    <td>{project.deadline}</td>
                                    <td>{project.description}</td>
                                    <td>
                                        <Link className='btn btn-primary mx-2'
                                            to={`/view-project/${project.id}`}>View</Link>
                                        <Link className='btn btn-outline-primary mx-2'
                                            to={`/update-project/${project.id}`}>Update</Link>
                                        <button className='btn btn-danger mx-2'
                                            onClick={() => deleteProject(project.id)}>Delete</button>
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