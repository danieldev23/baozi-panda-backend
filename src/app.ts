import express from "express";
import { Request, Response } from "express";
import { config } from "dotenv";
import v1Router from "./routes/v1.routes";
import path from "path";
import { connect } from "./config/database.config";
import morgan from "morgan";
import { AnsiColor, colorize } from "./constants/colors.constants";
import cors from 'cors';
import { setupSocket } from "./gateway/socket.gateway";
import http from "http";
config();
const app = express();
const PORT = process.env.PORT;
const DB_CONNECT = process.env.DATABASE_URL;
connect(DB_CONNECT || "");

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",       // local dev
      "https://hsksimple.online",
      "https://hsksimple.vercel.app"         // frontend production
    ],
    credentials: true,               // cho phép gửi cookie/token qua request
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
const server = http.createServer(app);
setupSocket(server);
// Use morgan for logging HTTP requests
morgan.format("colored", (tokens, req: Request, res) => {
  const status = Number(tokens.status(req, res));
  const method = tokens.method(req, res) || "";
  const url = tokens.url(req, res) || "";
  const responseTime = tokens["response-time"](req, res) || "0";
  const time = new Date().toLocaleString('vi-VN');

  const statusColor =
    status >= 500 ? AnsiColor.Red :
    status >= 400 ? AnsiColor.Red : 
    status >= 300 ? AnsiColor.Cyan : 
    AnsiColor.Green; 
  return [
    colorize(AnsiColor.Green, 'SERVER-LOG:'),
    colorize(AnsiColor.Gray, `[${time}]`), 
    colorize(AnsiColor.Magenta, method), 
    colorize(AnsiColor.Blue, `${req.protocol}s://${req.get("host")}${req.baseUrl}${url}`), 
    colorize(statusColor, status.toString()),
    colorize(AnsiColor.Yellow, `${responseTime} ms`), 
  ].join(" ");
});

app.use(morgan("colored"));
app.use(express.json());
// Use static middleware to serve static files
app.use(
  "/images",
  express.static(path.join(__dirname, "../src/public/images"))
);
// Routes
app.use("/api", v1Router);

// 404 Error Handling Middleware (placed after routes)
app.use((req: Request, res: Response) => {
  const filePath = path.join(__dirname, "public", "index.html");
  return res.status(404).sendFile(filePath);
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
