const socket = io("http://localhost:8000");
const form = document.getElementById("send-container");
const messagetextarea = document.getElementById('textarea')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
const messageContainerlist = document.querySelector(".containerlist")
var modal = document.getElementById('id01');

var audio = new Audio('ding-59124.mp3')

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    audio.play();
}
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }



form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append('You:'+message, 'right');
    socket.emit("send", message);
    messageInput.value = ""

})
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message = textarea.value;
    append('You:'+message, 'left');
    socket.emit("send", message);
    messagetextarea.value = ""


})

const name = prompt("Enter your name to join");
socket.emit("new-user-joined", newname);  

socket.on('user-joined', name =>{

    append(`${name} joined the chat`, 'right')
})

socket.on('receive', (data) =>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name=>{
    append(`${name} left the chat`, 'left')
})
