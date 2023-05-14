import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Home() {
    const [employees, setEmployees] = useState([]);
    const [pageNr,setPageNr] = useState(0);
    const [maxPage,setMaxPage] = useState(0);
    let perPage = 10;

    useEffect(() => {
        loadMaxPage();
        loadEmployees();
    }, []);

    const loadMaxPage = async () =>{
        const result = await axios.get("https://grifon.crabdance.com/employees/maxPage");
        //const result = await axios.get("http://localhost:8080/employees/maxPage");
        console.log(result.data);
        setMaxPage(Math.ceil((result.data / 10)) - 1);
    }

    const loadEmployees = async () => {
        const result = await axios.get(`https://grifon.crabdance.com/employees/page/${pageNr}/${perPage}`)
        //const result = await axios.get(`http://localhost:8080/employees/page/${pageNr}/${perPage}`)
        setEmployees(result.data);
    };

    const deleteEmployee = async (id) => {
        await axios.delete(`https://grifon.crabdance.com/employees/${id}`)
        //await axios.delete(`http://localhost:8080/employees/${id}`)
        loadEmployees();
    };

    const handleSort=(e)=>{
        const sortedData = [...employees].sort((a,b)=>{
            return a.age > b.age ? 1 : -1
        })
        setEmployees(sortedData)
    }

    const nextPage = () =>{
        console.log("page was", pageNr);
        if(pageNr!==maxPage) {
            setPageNr(pageNr + 1);
        }
        console.log("page set", pageNr);
        loadEmployees();
    }

    const prevPage = () =>{
        if(pageNr!==1) {
            setPageNr(pageNr - 1);
        }
        loadEmployees();
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
        loadEmployees();
    }

    const firstPage = () =>{
        changePage(0);
        loadEmployees();
    }

    const lastPage = () =>{
        changePage(maxPage);
        loadEmployees();
    }

    return (
        <div className='container'>
            <div className='py-4'>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="btn btn-outline-dark" to="/add-employee">Add Employee</Link>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">CITY</th>
                            <th scope="col">AGE</th>
                            <th scope="col">SPOUSE</th>
                            <th scope="col">ADDRESSES</th>
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
                                    <td>{employee.addresses}</td>
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
