export const generateRoomCode = () => {
    const CHARACTER_LENGTH = 6
    const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';  
    let res = '';
    for (let i = 0; i < CHARACTER_LENGTH; i++){
        res += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
    }
    // return 'abcde';
    return res;
} 