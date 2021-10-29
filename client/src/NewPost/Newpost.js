import React, { useState } from 'react';
import '../NewStory/Newstory.css'
import Modal from 'react-modal';
import axios from 'axios';
import { useHistory } from 'react-router-dom'

function Newpost({ addPostOn, setAddPostOn }) {

    const history = useHistory();
    const [imgUrl, setImgUrl] = useState('')
    const [caption, setCaption] = useState('')
    let localUserId = localStorage.getItem("userid");  
    const submitPost = async (e) => {
        e.preventDefault();
        if (imgUrl === '') { }
        else {
            axios.post("http://localhost:3005/addpost", {
                imgUrl: imgUrl,
                caption: caption,
                userid: localUserId,
            }).then((response) => {
                setImgUrl('');
                setCaption('');
            }).catch((error) => {
               
            })
            setAddPostOn(false);
            history.go(0);
        }

    }

    return (

        <Modal id="modal" className="Modal"
            isOpen={addPostOn}
            onRequestClose={() => setAddPostOn(false)}
            ariaHideApp={false}
        >
            <div id="modal" className='newstory'>
                <h2>Add new post</h2>
                <form onSubmit={submitPost} className="newstory__form">
                    <input type="text"
                        minLength="10"
                        value={imgUrl}
                        placeholder="img-url:"
                        className="form__input"
                        onChange={((e) => {
                            setImgUrl(e.target.value)
                        })}
                    />
                    <input type="text"
                        placeholder="caption..."
                        className="form__input"
                        onChange={((e) => {
                            setCaption(e.target.value)
                        })}
                    />
                    <button type="submit">Add post</button>
                </form>
            </div>
        </Modal>

    )
}

export default Newpost
