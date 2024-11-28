const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
let path=require('path')
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
let Users={};
console.log(Users)

function removeKeyByValue(obj, value) {
    for (const key in obj) {
      if (obj[key] === value) {
        delete obj[key]; // Remove the key
        return key; // Optionally return the key that was removed
      }
    }
    return null; // Return null if no key is found with the given value
  }
  
io.on("connection", (socket) => {
    console.log('user connected with id '+socket.id)
    socket.emit('resMsg','User connected with id :'+socket.id)
    // For recieving username
    socket.on('UserName',(msg)=>{
        if(!(msg in Users)){
            Users[msg]=socket.id;

        }else{
            console.log('allready present')
        }
        console.log(Users)
    })
    socket.on("Reciver",(msg)=>{
        console.log('Recievermsg'+msg.Name)
        console.log('Recievermsg'+msg.Msg)
    socket.to(Users[msg.Name]).emit('privateMsg',{From:msg.From,Msg:msg.Msg})

    })
    socket.on('disconnect',()=>{
        console.log('user disconnect with id '+socket.id)
        removeKeyByValue(Users,socket.id)
        console.log(Users)
    })
});

httpServer.listen(3000,()=>{
    console.log('app is listening on port 3000')
});

app.get("/",(req,res)=>{
    res.render("pages/index.ejs")

})

app.get("/register",(req,res)=>{
    res.render("Users/registration.ejs")

})