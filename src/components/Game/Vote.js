


import React, { useState, useEffect } from 'react';
import Loading from '../../views/Loading';
import socket from '../../Socket';
import {
    SHOW_ANSWERS
} from '../../Events';
function Vote() {

    const [receivedRes, setReceivedRes] = useState(false);
    const [responses, setResponses] = useState([]);

    useEffect(() => {

        socket.once(SHOW_ANSWERS, (res) =>{
            setReceivedRes(true);
            setResponses(res);
        });


        return () => {
            socket.off(SHOW_ANSWERS);
        }
    }, []);

 
    let content = <Loading />
    if (receivedRes) {
        content = (
            <ul>
                {responses.map(e =>  <li key={e.socketId}>{e.playerName} - {e.answer}</li>)}
            </ul>
        )
        
    }
    
    return content;
}

export default Vote


