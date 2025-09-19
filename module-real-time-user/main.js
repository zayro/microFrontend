import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('public/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

function computeUserId(socket) {
    // parse cookie / read JWT token / ... and retrieve the user ID (to be implemented)
    return socket.id;
  }
  
  const users = new Map();
  
  function handleConnection(userId) {
    const count = users.get(userId) || 0;
    users.set(userId, count + 1);
    return count === 0;
  }
  
  function handleDisconnection(userId) {
    const count = users.get(userId) - 1;
    if (count === 0) {
      users.delete(userId);
    } else {
      users.set(userId, count);
    }
    return count === 0;
  }
  
  async function isUserConnected(userId) {
    const sockets = await io.in(userId).fetchSockets();
    return sockets.length > 0;
  }
 
  function usersCount() {
    return users.size;
  }
  
  function usersList() {
    return [...users.keys()];
  }

  io.on("connection", (socket) => {
    const userId = computeUserId(socket);
    const hasConnected = handleConnection(userId);
  
    if (hasConnected) {
      io.emit("user has connected", userId);
    }
  
    socket.on("disconnect", () => {
      const hasDisconnected = handleDisconnection(userId);
  
      if (hasDisconnected) {
        io.emit("user has disconnected", userId);
      }
    });
  });


  function isUserConnectedOnThisNode(userId) {
    return users.has(userId);
  }
  
  io.on("isUserConnected", (userId, cb) => {
    cb(isUserConnectedOnThisNode(userId));
  });
  



server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});