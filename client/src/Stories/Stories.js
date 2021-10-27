import React, { useState, useEffect } from 'react'
import './Stories.css'
import {
    AiOutlineSmile,
    AiOutlineHeart,
    AiOutlineComment,
    AiOutlineSave,
    AiFillPlusCircle
} from "react-icons/ai";
import { Link } from 'react-router-dom';
import Newstory from '../NewStory/Newstory';
import Viewstory from '../NewStory/Viewstory';
import axios from 'axios';
import { useRecoilState } from 'recoil'
import {loggedState, sessData,userDataAll} from '../atoms'



function Stories() {

    const [likeColor, setLikeColor] = useState(false);
    const [modalOn, setModalOn] = useState(false);
    const [storyOn, setStoryOn] = useState(false);
    const [story, setStory] = useState([]);
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useRecoilState(userDataAll); 
    const [currentStory, setCurrentStory] = useState({});
    const [localData, setLocalData] = useState('');
    let localUserId = localStorage.getItem("userid");  
    
   

    const changeStoryOnState = (story) => {
        setStoryOn((value) => !value);
        setCurrentStory({
            img: story.storyimg,
            id: story.idstories,
        });
        console.log('CUR STORY',currentStory)
        
    }
    const changeModalState = () => {
        setModalOn((value) => !value);
    }
    const changeLikeColor = () => {
        setLikeColor((value) => !value);
    }

    useEffect(() => {
        axios.post("http://localhost:3005/profiledata",{
            userid: localUserId,
        })
        .then((response)=>{
            setUserData(response.data[0]);
        }).catch((error)=>{
            console.log(error);
        })
       
    }, [])
    console.log('INNER JOIN,', posts)
    //console.log('ALL DATA FROM USER',userData)

    useEffect(() => {
        axios.get("http://localhost:3005/showstory")
            .then((response) => {
                setStory(response.data)
            }).catch((error) => {
                console.log(error);
            })

        axios.get("http://localhost:3005/showposts")
            .then((result) => {
                setPosts(result.data)
            }).catch((error) => {
                console.log(error);
            })
    }, [])



    return (

        <div id="home">
            <div className='stories'>
                <div className='story' onClick={changeModalState}>
                    <AiFillPlusCircle className='story__img pop' />
                    <p className='story__user'>Add Story</p>

                </div>

                {story.map((data) => {
                    return <div id={data.idstories} className='story'>
                        <img onClick={()=>changeStoryOnState(data)}
                            className='story__img pop'
                            src={data.avatar}
                            alt="" />
                        <p className='story__user'>{data.username}</p>
                        
                    </div>

                })}
            <Viewstory imgurl={currentStory.img} id={currentStory.id} storyOn={storyOn} setStoryOn={setStoryOn} />
            </div>
            <Newstory modalOn={modalOn} setModalOn={setModalOn} />
            <div id="stories" className="home_left">

                    {/* INNER JOIN POSTS I USER DA UZMEM ODATLE AVATAR, USERNAME */}
                {posts.map((post) => {

                    return <div className='posts' id={post.idposts}>
                        {/* {top-post} */}


                        <div className="post__top">
                            <div className="post__top__left">
                                <img
                                    src={post.avatar}
                                    alt=""
                                    className="post__img" />
                                <Link to={'/users/' + post.username}>
                                    <p className="post__user">{post.username}</p>
                                </Link>
                            </div>
                        </div>

                        {/* {post img} */}

                        <div className="post__content">
                            <img className='content__img'
                                src={post.postimg}
                                alt="" />
                        </div>

                        {/* {interaction btn} */}
                        <div className="post__intertact">
                            <div className="interact__left">
                                <AiOutlineHeart
                                    className={likeColor ? 'btn pop liked' : 'btn pop'}
                                    onClick={changeLikeColor} />
                                <AiOutlineComment className='btn pop' />
                            </div>
                            <div className="interact__right">
                                <AiOutlineSave className='btn pop' />
                            </div>
                        </div>
                        {/* {comment section} */}

                        <div className="post__comments">
                            <p className='caption'>{post.postcaption}</p>
                        </div>

                        {/* {input} */}
                        <form className="post__addcomm">
                            <AiOutlineSmile className='emoji__icon pop' />
                            <input className='post__input'
                                type="text"
                                placeholder='Comment...' />
                            <button className='post__addbtn' type='submit'>Post</button>
                        </form>
                    </div>
                })}
            </div >
        </div>
    )
}

export default Stories
