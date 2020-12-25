import React , { Component  } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../views/Loading';
import Lobby from '../views/Lobby';
import Game from '../views/Game';
import ErrorBoundary from '../containers/ErrorBoundary';

import socket from '../Socket';

import { LOBBY_EXISTS, START_GAME, LEAVE_LOBBY } from '../Events';


export class GameWrapper extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             lobbyExists: null,
             gameStarted: false,
        }
    }

    componentDidMount() {
        socket.on(START_GAME, ()=> {
            this.setState((prevState) => ({
                ...prevState,
                gameStarted: true,
            }));
        })

        socket.emit(LOBBY_EXISTS, this.props.roomCode, (exists)=>{
            this.setState((prevState) => ({
                ...prevState,
                lobbyExists: exists
            }));
        });
        

    }

    componentWillUnmount() {
        socket.emit(LEAVE_LOBBY, this.props.roomCode);
    }
    
    render() {


        let content = null;
        if (this.state.lobbyExists === null) {
            content =  <Loading />
        } else if (this.state.gameStarted === true){
            content = <Game {...this.props}/>
        } else if (this.state.lobbyExists === false) {
            content =  <Redirect to='/' />
        } else if (this.state.lobbyExists === true){
            content =  <Lobby {...this.props} />
        }
        return (
            <ErrorBoundary>
                {content}
            </ErrorBoundary>
        );

    }
}

export default GameWrapper


// function GameWrapper(props) {
//     const { roomCode } = props;

//     const [ gameState, setGameState ] = useState({
//         lobbyExists: null,
//         gameStarted: false,

//     });

//     useEffect(() => {

//         socket.on(START_GAME, ()=> {
//             setGameState((prevState) => ({
//                 ...prevState,
//                 gameStarted: true,
//             }));
//         })

//         if (gameState.lobbyExists === null) {
//             socket.emit(LOBBY_EXISTS, roomCode, (exists)=>{
//                 setGameState((prevState) => ({
//                     ...prevState,
//                     lobbyExists: exists
//                 }));
//             });
//         }


//         return () =>  socket.emit(LEAVE_LOBBY, roomCode);
//     }, []);




    // let content = null;
    // if (gameState.lobbyExists === null) {
    //     content =  <Loading />
    // } else if (gameState.gameStarted === true){
    //     content = <Game {...props}/>
    // }else if (gameState.lobbyExists === false) {
    //     content =  <Redirect to='/' />
    // } else if (gameState.lobbyExists === true){
    //     content =  <Lobby {...props} />
    // }
    // return (
    //     <ErrorBoundary>
    //         {content}
    //     </ErrorBoundary>
        
        

    // );

// }

