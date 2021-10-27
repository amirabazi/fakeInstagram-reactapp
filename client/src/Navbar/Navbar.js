import React, { useState } from 'react';
import './Navbar.css';
import { AiFillHome, AiOutlineFolderAdd, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';
import Newpost from '../NewPost/Newpost';
import { useRecoilState } from 'recoil'
import {loggedState, sessData,userDataAll} from '../atoms'



function Navbar() {

    const [dropmenuToggle, setDropmenuToggle] = useState(false);
    const [addPostOn, setAddPostOn] = useState(false);
    const [userData, setUserData] = useRecoilState(userDataAll); 

    const changeAddPostState = () => {
        setAddPostOn((value) => !value);
    }


    const dropdownToggle = () => {
        setDropmenuToggle((value) => !value);
    }



    return (
        <div className='navbar'>
            <Link to="/"> <img className='navbar__img' src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo" /> </Link>
            <AiOutlineSearch className='serachIcon' />
            <input className='navbar__search' type="text" placeholder="Search.." />

            <div className='navbar__options'>
                <a href="/#home"><AiFillHome className='options__btn' /></a>
                <Link to="/addpost"><AiOutlineFolderAdd className='options__btn' onClick={changeAddPostState} /> </Link>
                <Newpost addPostOn={addPostOn} setAddPostOn={setAddPostOn} />                
                <img onClick={dropdownToggle} className='options__profile' src={userData.avatar} alt="profile" />
                <Dropdown dropmenuToggle={dropmenuToggle} />
            </div>

        </div >
    )
}

export default Navbar
