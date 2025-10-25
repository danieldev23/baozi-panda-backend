import { Server } from "socket.io";
import http from "http";

interface ActiveUser {
  userId: string;
  socketId: string;
}

const activeUsers: ActiveUser[] = [];

let io: Server;

export function setupSocket(server: http.Server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    // Khi user báo là online
    socket.on("userOnline", (userId: string) => {
      if (!activeUsers.find((u) => u.userId === userId)) {
        activeUsers.push({ userId, socketId: socket.id });
      }

      console.log(`✅ User online: ${userId}`);
      io.emit("activeUsers", activeUsers.map((u) => u.userId));
    });

    // Khi user join room (group chat)
    socket.on("joinRoom", (roomId: string) => {
      socket.join(roomId);
      console.log(`🏠 User ${socket.id} joined room ${roomId}`);
    });

    // Khi user gửi tin nhắn trong group
    socket.on("sendMessage", (data) => {
      const { senderId, roomId, message } = data;

      if (!roomId || !senderId || !message) return;

      io.to(roomId).emit("newMessage", {
        senderId,
        message,
        timestamp: new Date(),
      });

      console.log(`💬 [${roomId}] ${senderId}: ${message}`);
    });

    // Khi user ngắt kết nối
    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);

      const index = activeUsers.findIndex((u) => u.socketId === socket.id);
      if (index !== -1) {
        console.log(`🚪 User offline: ${activeUsers[index].userId}`);
        activeUsers.splice(index, 1);
      }

      io.emit("activeUsers", activeUsers.map((u) => u.userId));
    });
  });

  return io;
}

export function getIO(): Server {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}
