const socketIo = require("socket.io");
const { validateToken } = require("./tokenUtils");
const My = require("./My");


const roomToSocketMap = new Map();
const userToRoomMap = new Map();


class NotificationManagerSocketio {

  static io;

  static handleConnection(server) {

    NotificationManagerSocketio.io = socketIo(server);

    NotificationManagerSocketio.io.on("connection", (socket) => {

      console.log(`A client connected to socket-id: ${socket.id}\n`);


      // Listen for specific events from the client
      socket.on('joinRoom', async (room, token) => {

        const { isTokenValid, authUser } = await validateToken(token);

        if (isTokenValid) {
          addRoomToUser(room, authUser.username);
          addSocketToRoom(socket, room);
        }

      });


      // Listen for disconnect event
      socket.on('disconnect', () => {
        handleDisconnect(socket)
      });


      // Here you can listen for other events from the client if needed.

    });

  }


  static getUsersToRoomsMap() {
    const usersToRoomsObj = {};
    userToRoomMap.forEach((maps, user) => {

      usersToRoomsObj[user] = [...maps]

    });

    const roomsToSocketsObjs = {};
    roomToSocketMap.forEach((sockets, room) => {
      roomsToSocketsObjs[room] = [...sockets];
    });

    return { usersToRoomsObj, roomsToSocketsObjs };

  }


  static notifyUser(user, notification) {

    const rooms = userToRoomMap.get(user.username);

    rooms?.forEach(room => {
      NotificationManagerSocketio.io.to(room).emit('onPostReadyNotification', { notification });
      console.log(`Emitted onPostReadyNotification event to room ==> ${room}`);
    });
  }

}



function handleDisconnect(socket) {

  console.log(`Socket ${socket.id} disconnected`);

  // Reference the disconnecting room(s).
  let theDisconnectingRooms = [];

  roomToSocketMap.forEach((sockets, room) => {
    if (sockets.has(socket.id)) {
      theDisconnectingRooms.push(room);
    }
  });


  // Remove the room from user's map.
  userToRoomMap.forEach((rooms, userId) => {

    for (const roomToDelete of theDisconnectingRooms) {
      if (rooms.has(roomToDelete)) {
        rooms.delete(roomToDelete);
        console.log(`${roomToDelete} has been removed from user: ${userId}`);
      }
    }

  });


  // Remove the room from the roomsToSocketsMap.
  for (const roomToDelete of theDisconnectingRooms) {
    roomToSocketMap.delete(roomToDelete);
    console.log(`${roomToDelete} has been removed from the roomsToSocketsMap`);
  }

  console.log(`\n`);
}


function addRoomToUser(room, userId) {
  // Check if user is in map.
  console.log(`User:${userId} is joining room ==> ${room}`);
  if (userToRoomMap.has(userId)) {
    console.log(`User: ${userId} already is in map...`);
  } else {
    userToRoomMap.set(userId, new Set());
  }

  // Add room to user's map.
  userToRoomMap.get(userId).add(room);
  console.log(`User: ${userId} adds room ==> ${room}\n`);
}


function addSocketToRoom(socket, room) {
  socket.join(room);
  console.log(`Socket ${socket.id} has joined room ==> ${room}`);

  // Store socket in roomToSocketMap
  if (roomToSocketMap.has(room)) {
    console.log(`Room ${room} already exsits in roomToSocketMap...`);
  } else {
    roomToSocketMap.set(room, new Set());
    console.log(`New room ${room} has been added to roomToSocketMap...`);
  }

  roomToSocketMap.get(room).add(socket.id);
  console.log(`Socket ${socket.id} has been added to room ==> ${room}'s Set of sockets..\n`)
}


module.exports = NotificationManagerSocketio;