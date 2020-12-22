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

shuffleAndPick = (arr, size) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }        
    const length = arr.length;
    const numToDelete = length - size;
    return arr.splice(0, size, numToDelete);
  
}