const express = require('express')
const path = require('path')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


class messageController {

    async chat({ request, response, auth }) {
    
 //pode salvar as mensagens no db pelo array

        io.on('connection', socket => {
            console.log(`Socket conectado: ${socket.id}`);

            socket.emit('previousMessages', messages);

            socket.on('sendmenssage', data => {
                messages.push(data);
                socket.broadcast.emit('receivedMessage', data);
                console.log(data);
            })
        })
    }
}

module.exports = messageController