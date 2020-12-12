import React from 'react'
import socket from '../socket'
function Debug() {

    const debug = () => {
      socket.emit('debug');
    }


    
    return (
        
        <button onClick={debug}>Test Server</button>
        
    )
}

export default Debug
