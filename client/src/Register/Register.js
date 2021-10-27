import React, { useState } from 'react'
import './Register.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';

function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const getRegister = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:3005/register", {
            username: username,
            password: password,

        }).then((response) => {
            console.log(response)
            if (response.data === '') {
                setError('User already exists !');
            }
            else {
                history.push("/login");
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className='register'>
            <img className='register_img' src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo" />
            <p className="register__info">Register to Instagram</p>
            <form onSubmit={getRegister} className='register_form'>
                <input className='form__input'
                    type="text"
                    placeholder='username'
                    required
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <input className='form__input'
                    type="password"
                    placeholder='password'
                    required
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button type='submit' className='form__btn'>Register</button>
            </form>
            <p className='error'>{error}</p>
           <Link to="/login"> <p className='register__info'>
                You already have account? <span className='login__span'>Login</span>
            </p>
            </Link>
        </div>
    )
}

export default Register
