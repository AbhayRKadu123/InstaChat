
const socket = io();
const UserNameBtn=document.querySelector('#UserNameBtn')
const UserName=document.querySelector('#UserName')
const SendMsg=document.querySelector("#SendMessage")
const Reciver=document.querySelector("#Reciver")
const NewMessage=document.querySelector("#Message")
let MsgScreen=document.querySelector(".chat-window")
let Message=NewMessage;
// handling function for displaying message on screen
function getCurrentTime() {
  const now = new Date(); // Get the current date and time
  const hours = String(now.getHours()).padStart(2, '0'); // Get hours and pad with 0 if needed
  const minutes = String(now.getMinutes()).padStart(2, '0'); // Get minutes and pad with 0 if needed
  // const seconds = String(now.getSeconds()).padStart(2, '0'); // Get seconds and pad with 0 if needed
  
  return `${hours}:${minutes}`; // Return time in HH:MM:SS format
}
function playSound(url) {
  const audio = new Audio(url); // Create an audio object with the URL of the sound
  audio.play(); // Play the sound
}
function RecievedMessage(msg){
  let div=document.createElement('div')
  div.setAttribute('class','message received')
  div.innerHTML=`<span class="message-meta">
      <strong>Sender:</strong> ${msg.From} <span class="timestamp">${getCurrentTime()}</span>
  </span>
  ${msg.Msg}`

  MsgScreen.appendChild(div)
  playSound('/sprites/Notification.wav')
}



function SentMessage(msg){
  let div=document.createElement('div')
  div.setAttribute('class','message sent')
  div.innerHTML=` <span class="message-meta">
                   <strong>You:</strong>  <span class="timestamp">${getCurrentTime()}</span>
               </span>
               ${msg}`
  MsgScreen.appendChild(div)
  console.log(msg)
}







socket.on("connect", () => {
  console.log(socket.connected); // true
});
socket.on('resMsg',(msg)=>{
    console.log(msg)
})
socket.on('privateMsg',(msg)=>{
  RecievedMessage(msg)

  
  console.log('private message'+msg)
})
UserNameBtn.addEventListener('click',()=>{
    console.log('UserName btn clicked.')
    console.log(UserName.value)
socket.emit("UserName",UserName.value)

})
SendMsg.addEventListener('click',()=>{
  if(UserName.value==""){
    
  }
  SentMessage(Message.value)
socket.emit("Reciver",{From:UserName.value,Name:Reciver.value,Msg:Message.value})
NewMessage.value=""
})




