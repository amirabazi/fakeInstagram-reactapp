import React, { useState, useEffect } from 'react'
import '../Register/Register.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import {loggedState} from '../atoms'


function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    const [sessionData, setSessionData] = useState({});
    const [isLogged, setIsLogged] = useRecoilState(loggedState);
    

    console.log('LOGIN SATUTS', isLogged);
    const getLogin = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:3005/login", {
            username: username,
            password: password
        }).then((response) => {
            if(response.data.msg==='noUser'){
                setError("User doesn't exist !")
            }
            else if(response.data.msg==='pwErr'){
                setError("Wrong password !");
            }
            else if(response.data.msg==='logged'){
              //  console.log('LOGIN RESPONSE: ',response.data.result[0].iduser)
                setIsLogged(true);
                localStorage.setItem('username', username);
                localStorage.setItem('userid',response.data.result[0].iduser)
                history.push("/");
                //loggedIn Globalstate (true)
            }            
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        axios.get("http://localhost:3005/login")
        .then((response)=>{
            console.log('session',response)
            if(response.data.loggedIn===true){
                setSessionData(response.data.user)
            }
        }).catch((error)=>{
            console.log(error);
        })
        
    }, [])
    

    return (
        <div className='register'>
            <img className='register_img' src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo" />
            <p className="register__info">Login to Instagram</p>
            <form onSubmit={getLogin} className='register_form'>
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
                <button type='submit' className='form__btn'>Login</button>
            </form>
            <p className='error'>{error}</p>
            <p className='register__info'>
                This is fake instagram app !
            </p>
        </div>
    )
}

export default Login
