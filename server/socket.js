import { Server } from "socket.io"

export const initSocket = (server) => {
    const io = new Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: "http://localhost:3000",
            // credentials: true,
        }
    })

    io.on("connection", (socket) => {
        socket.on("setup", (user) => {
            socket.join(user.id)
            socket.emit("connected")
        })

        socket.on("join room", (room) => {
            socket.join(room)
        })

        socket.on("new message", (newMessageRecieved) => {
            var Box = newMessageRecieved.Box;

            if (!Box.Members) return console.log("Box.Members not defined");

            Box.Members.forEach((user) => {
                if (user.id == newMessageRecieved.Author.id) return;

                socket.in(user.id).emit("message recieved", newMessageRecieved);
            });
        });
    });
}