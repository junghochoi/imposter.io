import React from 'react'
import socket from '../Socket'
function Debug() {

    const debug = () => {
      socket.emit('debug',() => {
        setTimeout(console.log, 1000, "callback");
      });
      console.log("not call back");
    }


    
    return (
        
        <button onClick={debug}>Test Server</button>
        
    )
}

export default Debug
