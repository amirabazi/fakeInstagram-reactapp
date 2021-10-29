import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import {loggedState} from '../atoms'
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';

function Dropdown({ dropmenuToggle }) {
    const [isLogged, setIsLogged] = useRecoilState(loggedState);
    const removeLocalStorage = () =>{
        localStorage.removeItem('username');
        localStorage.removeItem('userid');
        setIsLogged(false);
    }

    return (
        <div className={dropmenuToggle ? 'dropdown' : 'dropdownNone'}>
           <Link to="/profile"> <p>Profile</p> </Link>
           <Link to="/login"><p onClick={removeLocalStorage}>Sign Out</p></Link>
        </div>
    )
}

export default Dropdown
