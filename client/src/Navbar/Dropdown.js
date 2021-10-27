import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

function Dropdown({ dropmenuToggle }) {

    const removeLocalStorage = () =>{
        localStorage.removeItem('username');
        localStorage.removeItem('userid');
    }

    return (
        <div className={dropmenuToggle ? 'dropdown' : 'dropdownNone'}>
           <Link to="/profile"> <p>Profile</p> </Link>
            <Link to="/login"><p onClick={removeLocalStorage}>Sign Out</p></Link>
        </div>
    )
}

export default Dropdown
