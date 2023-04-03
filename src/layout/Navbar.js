import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Navbar() {

    const [age, setAge] = useState('');

    const onInputChange = (event) => {
        setAge(event.target.value);
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="/">SDI LAB</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="btn btn-outline-light" to="/add-employee">Add Employee</Link>
                <form>
                    <div className='input-group mx-5'>
                        <input type={'text'}
                            className='form-control'
                            placeholder='Enter age by which to filter'
                            name='age'
                            value={age}
                            onChange={(event) => onInputChange(event)} />
                        <div className='input-group-append'>
                            <Link className='btn btn-outline-light' to={`/filter-employee-age/${age}`}>Filter & Sort</Link>
                        </div>
                    </div>
                </form>
            </nav>
        </div>
    )
}
