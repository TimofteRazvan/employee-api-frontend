import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Filtered() {
    const [employees, setEmployees] = useState([]);

    const { age } = useParams();
    const [pageNr,setPageNr] = useState(0);
    const [maxPage,setMaxPage] = useState(0);
    let perPage = 10;

    useEffect(() => {
        loadMaxPage();
        loadEmployees();
        //eslint-disable-next-line
    }, []);

    const loadMaxPage = async () =>{
        const result = await axios.get(`https://grifon.crabdance.com/employees/maxPage/age/${age}`);
        //const result = await axios.get(`http://localhost:8080/employees/maxPage/age/${age}`);
        console.log(result.data);
        setMaxPage(Math.ceil((result.data / 10)) - 1);
    }

    const loadEmployees = async () => {
        if (age !== 0) {
            const result = await axios.get(`https://grifon.crabdance.com/employees/filter/age/${age}/${pageNr}/${perPage}`)
            //const result = await axios.get(`http://localhost:8080/employees/filter/age/${age}/${pageNr}/${perPage}`)
            setEmployees(result.data);
        }
        else {
            const result = await axios.get(`https://grifon.crabdance.com/employees/page/${pageNr}/${perPage}`)
            //const result = await axios.get(`http://localhost:8080/employees/page/${pageNr}/${perPage}`)
            let arr = result.data;
            arr.sort((e1,e2) => (e1.age < e2.age) ? 1 : (e1.age > e2.age) ? -1 : 0);
            setEmployees(arr.data);
        }
    };

    const deleteEmployee = async (id) => {
        await axios.delete(`https://grifon.crabdance.com/employees/${id}`)
        //await axios.delete(`http://localhost:8080/employees/${id}`)
        loadEmployees();
    };

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
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">CITY</th>
                            <th scope="col">AGE</th>
                            <th scope="col">SPOUSE</th>
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
