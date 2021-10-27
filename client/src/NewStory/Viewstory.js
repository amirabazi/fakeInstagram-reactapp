import React, { useEffect } from 'react'
import Modal from 'react-modal'
import './Viewstory.css'
import {
    AiOutlineClose
} from "react-icons/ai";
import axios from 'axios';

function Viewstory({imgurl , id , storyOn, setStoryOn }) {   
    return (
        //axios get iz baze SELECT imgsotry FROM posts WHERE id = id ->>> i taj imgstory umjesto imgURL


        <Modal className='modal'
            isOpen={storyOn}
            onRequestClose={() => setStoryOn(false)}
            ariaHideApp={false}
        >
            <div className='viewstory'>
                <img src={imgurl}
                    alt=""
                    className="viewstory__img" />
                <AiOutlineClose className='close__icon'
                    onClick={() => setStoryOn(false)} />
            </div>
        </Modal>
    )
}

export default Viewstory
