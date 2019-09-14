const express = require('express')
var http = require('http')
var app = express()
var server = http.createServer(app)
var io = require('socket.io').listen(server)
app.get('/',(req,res)=>{
    res.send("Chat server is running on the port 3000")
})  

io.on('connection',(socket)=>{
    console.log('user connected')

    socket.emit('check','check')

    socket.on('username',(username)=>{
        console.log(username + "has joined the chat")
        socket.emit('authenticated','authenticated')
    })

    socket.on('messageDetection',(u,m)=>{
        let message = {u,m}
        console.log(message)
        io.emit('receivemessage',message)
    })

})


server.listen(3000,()=>{
    console.log("Chat server is running on the port 3000")
})  