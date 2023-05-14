import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [pageNr,setPageNr] = useState(0);
    const [maxPage,setMaxPage] = useState(0);
    let perPage = 10;

    useEffect(() => {
        loadMaxPage();
        loadProjects();
    }, []);

    const loadMaxPage = async () =>{
        const result = await axios.get("https://grifon.crabdance.com/projects/maxPage");
        //const result = await axios.get("http://localhost:8080/projects/maxPage");
        console.log(result.data);
        setMaxPage(Math.ceil((result.data / 10)) - 1);
    }

    const loadProjects = async () => {
        const result = await axios.get(`https://grifon.crabdance.com/projects/page/${pageNr}/${perPage}`)
        //const result = await axios.get(`http://localhost:8080/projects/page/${pageNr}/${perPage}`)
        setProjects(result.data);
    };

    const deleteProject = async (id) => {
        await axios.delete(`https://grifon.crabdance.com/projects/${id}`)
        //await axios.delete(`http://localhost:8080/projects/${id}`)
        loadProjects();
    };

    const nextPage = () =>{
        console.log("page was", pageNr);
        if(pageNr!==maxPage) {
            setPageNr(pageNr + 1);
        }
        console.log("page set", pageNr);
        loadProjects();
    }

    const prevPage = () =>{
        if(pageNr!==1) {
            setPageNr(pageNr - 1);
        }
        loadProjects();
    }

    const changePage = (nr) =>{
        document.getElementById("bt1").hidden=false;
        document.getElementById("bt2").hidden=false;
        document.getElementById("bt3").hidden=false;
        document.getElementById("bt4").hidden=false;
        if(nr<3){
            document.getElementById("bt1").hidden=true;
            document.getElementById("bt2").hidden=true;
        }
        if(nr>maxPage-3){
            document.getElementById("bt3").hidden=true;
            document.getElementById("bt4").hidden=true;
        }
        console.log(nr);
        setPageNr(nr);
        loadProjects();
    }

    const firstPage = () =>{
        changePage(0);
        loadProjects();
    }

    const lastPage = () =>{
        changePage(maxPage);
        loadProjects();
    }

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
                <div>
                    {/* <button className="btn btn-outline-primary mx-2" onClick={()=>firstPage()}>First Page</button> */}
                    <button className="btn btn-outline-primary mx-2" onClick={()=>prevPage()}>Prev Page</button>
                    <button className="btn btn-outline-primary mx-2" onClick={()=>firstPage()}>0</button>
                    ...
                    <button id={"bt1"} className="btn btn-outline-primary mx-2" onClick={()=>changePage(pageNr-2)}>{pageNr-2}</button>
                    <button id={"bt2"} className="btn btn-outline-primary mx-2" onClick={()=>changePage(pageNr-1)}>{pageNr-1}</button>
                    <button className="btn btn-outline-primary mx-2" onClick={()=>changePage(pageNr)}>{pageNr}</button>
                    <button id={"bt3"} className="btn btn-outline-primary mx-2" onClick={()=>changePage(pageNr+1)}>{pageNr+1}</button>
                    <button id={"bt4"} className="btn btn-outline-primary mx-2" onClick={()=>changePage(pageNr+2)}>{pageNr+2}</button>
                    ...
                    <button className="btn btn-outline-primary mx-2" onClick={()=>lastPage()}>{maxPage}</button>
                    <button className="btn btn-outline-primary mx-2" onClick={()=>nextPage()}>Next Page</button>
                    {/* <button className="btn btn-outline-primary mx-2" onClick={()=>lastPage()}>Last Page</button> */}
                </div>
            </div>
        </div>
    )
}