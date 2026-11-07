import http from 'http';
import fs, { readdirSync } from 'fs';
import { WebSocketServer } from 'ws';
import { type } from 'os';

const PORT = 3001;

const server=http.createServer((req,res)=>{
    fs.readFile("./public/index.html",(err,data)=>{
        if(err){
            res.writeHead(404,{"content-type":"text/plain"})
            res.end("Error loading page")
            return
        }
        res.writeHead(200,{"content-type":"text/html"})
        res.end(data)
    })
})

const wss=new WebSocketServer({server})

wss.on("connection",(socket,req)=>{
    const username=new URL(req.url,"http://localhost").searchParams.get("username")
    wss.clients.forEach((client)=>{
            if(client.readyState==WebSocket.OPEN){
                client.send(JSON.stringify({
                type:"system",
                text:`${username} joined`
            }))
            }
        })

    socket.on("message",(data)=>{
        const {username,text}=JSON.parse(data.toString())
        wss.clients.forEach((client)=>{
            if(client.readyState==WebSocket.OPEN){
                client.send(JSON.stringify({
                type:"chat",
                username,
                text
            }))
            }
        })
    })

    socket.on("close",()=>{
        wss.clients.forEach((client)=>{
            if(client.readyState==WebSocket.OPEN){
                client.send(JSON.stringify({
                type:"system",
                text:`${username} left`
            }))
            }
        })
    })
})

server.listen(PORT,()=>{
    console.log("Chat server runnning at http://localhost:3001")
})
