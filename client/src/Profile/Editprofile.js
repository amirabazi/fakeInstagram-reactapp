import axios from 'axios';
import React, { useState } from 'react'
import Modal from 'react-modal'
import '../Profile/Editprofile.css'
import { useHistory } from 'react-router-dom'



function Editprofile({ editToggle, setEditToggle }) {

    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [about, setAbout] = useState('');
    const [avatar, setAvatar] = useState('');
    const history = useHistory();
    let localUserId = localStorage.getItem("userid");  

    const submitEdit = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:3005/editprofile", {
            userid: localUserId,
            name: name,
            place: place,
            about: about,
            avatar: avatar,
        }).then((response) => {
            setEditToggle(false);
            console.log(response);

        }).catch((error) => {
            console.log(error);
        })
        history.go(0);
    }

    return (

        <Modal
            className='Modal'
            isOpen={editToggle}
            onRequestClose={() => setEditToggle(false)}
            ariaHideApp={false}
        >
            <div className='editProfile'>
                <h3>Edit your profile</h3>
                <form onSubmit={submitEdit} className='edit__from'>
                    <input type="text" placeholder="Name..." onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder="Place..." onChange={(e) => setPlace(e.target.value)} />
                    <input type="text" placeholder="About..." onChange={(e) => setAbout(e.target.value)} />
                    <input type="text" placeholder="Profile picture url..." onChange={(e) => setAvatar(e.target.value)} />
                    <button type="submit">Apply</button>
                </form>
            </div>
        </Modal>
    )
}

export default Editprofile
