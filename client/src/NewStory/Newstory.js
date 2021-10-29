import React, { useState } from 'react';
import './Newstory.css';
import Modal from 'react-modal';
import axios from 'axios';
import { useHistory } from 'react-router-dom';



function Newstory({ modalOn, setModalOn }) {    
    
    const history = useHistory();
    const [storyUrl, setStoryUrl] = useState(null);
    let localUserId = localStorage.getItem("userid");      

    const submitStory = async (e) =>{
        e.preventDefault();
        axios.post("http://localhost:3005/addstory", {
            storyUrl : storyUrl,
            userid: localUserId,
        }).then((response)=>{
            if(response.data.msg==='empty'){
                
            }else{
                console.log(response.data)
                setModalOn(false);               
            }           
        }).catch((error)=>{
            console.log(error);
        })
        setStoryUrl(null);
        history.go(0);
    }


    return (
        <Modal id="modal" className="Modal"
            isOpen={modalOn}
            onRequestClose={() => setModalOn(false)}
            ariaHideApp={false}
        >
            <div id="modal" className='newstory'>
                <h2>Post a new story</h2>
                <form onSubmit={submitStory} className="newstory__form">
                    <input type="text" 
                    placeholder="img-url:" 
                    className="form__input" 
                    value={storyUrl || null}
                    onChange={(e)=>{
                        setStoryUrl(e.target.value);
                    }}
                    />
                    <button type="submit">Add story</button>
                </form>
            </div>
        </Modal>

    )
}

export default Newstory
