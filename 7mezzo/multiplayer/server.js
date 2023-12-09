const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 8080 })

server.on('connection', socket => {
    console.clear()
    console.log('Client connected')
    
    socket.on('message', message => {
        console.log(`${message}`)
    })
  
    socket.on('close', () => {
        console.log('Client disconnected')
    })
})
