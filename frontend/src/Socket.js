import io from "socket.io-client";
const ENDPOINT = "https://imposter-backend.herokuapp.com/";
const socket = io(ENDPOINT);
export default socket;