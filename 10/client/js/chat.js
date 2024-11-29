const socket = io();

socket.on('messageFromServer', (message) => {
    const messages = document.getElementById('messages');
    const messageElement = document.createElement('p');
    messageElement.innerText = message;
    messages.appendChild(messageElement)
})

socket.on('users', (users) => {
    console.log(users)
})

const sendMessage = () => {
    const input = document.getElementById('input');
    socket.emit('messageFromClient', input.value);
    input.value = ""
}

const searchParams = new URLSearchParams(window.location.search);
socket.emit('join', searchParams.get('username'), searchParams.get('roomId'))