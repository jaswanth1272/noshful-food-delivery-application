import React from 'react'

export default function Message(props) {
        const discInfo=props.disc;
        console.log("in message",props.disc);
        return (
            <div className='m-3 p-5 discussionBox'>
                <h1 style={{fontSize:"25px"}}>{discInfo.thread}</h1>
                <p>{discInfo.email}</p>
            </div>
        )
}
