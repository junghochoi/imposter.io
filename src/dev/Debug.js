import React from 'react'
import socket from '../Socket'
function Debug() {

    const debug = () => {
      socket.emit('debug');
    }


    
    return (
        
        <button onClick={debug}>Test Server</button>
        
    )
}

export default Debug
