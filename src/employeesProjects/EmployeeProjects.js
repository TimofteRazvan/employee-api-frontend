import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function EmployeeProjects() {
    const [eps, setEps] = useState([]);
    const [pageNr,setPageNr] = useState(0);
    const [maxPage,setMaxPage] = useState(0);
    let perPage = 10;

    useEffect(() => {
        loadMaxPage();
        loadEmployeeProjects();
    }, []);

    const loadMaxPage = async () =>{
        const result = await axios.get("https://grifon.crabdance.com/employees-projects/maxPage");
        //const result = await axios.get("http://localhost:8080/employees-projects/maxPage");
        console.log(result.data);
        setMaxPage(Math.ceil((result.data / 10)) - 1);
    }

    const loadEmployeeProjects = async () => {
        const result = await axios.get(`https://grifon.crabdance.com/employees-projects/page/${pageNr}/${perPage}`)
        //const result = await axios.get(`http://localhost:8080/employees-projects/page/${pageNr}/${perPage}`)
        setEps(result.data);
    };

    const deleteEmployeeProject = async (id) => {
        await axios.delete(`https://grifon.crabdance.com/employees-projects/${id}`)
        //await axios.delete(`http://localhost:8080/employees-projects/${id}`)
        loadEmployeeProjects();
    };

    const nextPage = () =>{
        console.log("page was", pageNr);
        if(pageNr!==maxPage) {
            setPageNr(pageNr + 1);
        }
        console.log("page set", pageNr);
        loadEmployeeProjects();
    }

    const prevPage = () =>{
        if(pageNr!==1) {
            setPageNr(pageNr - 1);
        }
        loadEmployeeProjects();
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
        loadEmployeeProjects();
    }

    const firstPage = () =>{
        changePage(0);
        loadEmployeeProjects();
    }

    const lastPage = () =>{
        changePage(maxPage);
        loadEmployeeProjects();
    }

    return (
        <div className='container'>
            <div className='py-4'>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="btn btn-outline-dark" to="/add-employee-project">Add EmployeeProjects</Link>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">EMPLOYEE</th>
                            <th scope="col">PROJECT</th>
                            <th scope="col">ROLE</th>
                            <th scope="col">EFFICIENCY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            eps.map((ep, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{ep.id}</td>
                                    <td>{ep.employee}</td>
                                    <td>{ep.project}</td>
                                    <td>{ep.role}</td>
                                    <td>{ep.efficiency}</td>
                                    <td>
                                        <Link className='btn btn-primary mx-2'
                                            to={`/view-employee-project/${ep.id}`}>View</Link>
                                        <Link className='btn btn-outline-primary mx-2'
                                            to={`/update-employee-project/${ep.id}`}>Update</Link>
                                        <button className='btn btn-danger mx-2'
                                            onClick={() => deleteEmployeeProject(ep.id)}>Delete</button>
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