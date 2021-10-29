import React, { useEffect } from 'react'
import Modal from 'react-modal'
import './Viewstory.css'
import {
    AiOutlineClose
} from "react-icons/ai";
import axios from 'axios';

function Viewstory({imgurl , id , storyOn, setStoryOn }) {   
    return (     
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
