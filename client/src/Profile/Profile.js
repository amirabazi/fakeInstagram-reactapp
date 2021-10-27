import React from 'react'
import './Profile.css';
import {useState, useEffect} from 'react';
import Editprofile from './Editprofile';
import axios from 'axios';
import { useRecoilState } from 'recoil'
import {loggedState, sessData,userDataAll} from '../atoms'


function Profile() {

    const [editToggle, setEditToggle] = useState(false);
    const [profileData, setProfileData] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    let localUserId = localStorage.getItem("userid");  
    const [userData, setUserData] = useRecoilState(userDataAll); 
    const editProfileToggle = () => {
        setEditToggle((value)=>!value)
        console.log(editToggle)
    }

    

    useEffect(() => {
        axios.post("http://localhost:3005/profiledata",{
            userid: localUserId,
        })
        .then((response)=>{
            setProfileData(response.data[0]);
        }).catch((error)=>{
            console.log(error);
        })
       
    }, [])    

    console.log('profdata',profileData)

    useEffect(() => {
        axios.post("http://localhost:3005/profileposts",{
            userid: localUserId,
        })
        .then((response)=>{
            setUserPosts(response.data);
            
        }).catch((error)=>{
            console.log(error);
        })
       
    }, [])
    
    console.log('postdata',userPosts.length)
    

    return (        

        <div className='profile'>
            <div className="profile__about">
                <img src={profileData.avatar} alt="" className="about__img" />
                <div className="about__info">
                    <div className="profile__top">
                        <p>{userData.username}</p>
                        <button onClick={editProfileToggle}>Edit Profile</button>
                    </div>
                    <Editprofile editToggle={editToggle} setEditToggle = {setEditToggle} />
                    <div className="profile__middle">
                        <p>Posts: <span>{userPosts.length}</span></p>
                    </div>
                    <div className="profile__bottom">
                        <h4>{profileData.name}</h4>
                        <p>{profileData.placeFrom}</p>
                        <p>{profileData.about}</p>
                    </div>

                </div>
            </div>

            <div className="profile__posts">
                {userPosts.map((data)=>{
                    return <div key={data.idposts} className="img__wrapper">
                    <img src={data.postimg} alt="" />
                </div>
                })}             

            </div>
        </div>
    )
}

export default Profile
