const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
  ? process.env.CORS_ALLOWED_ORIGINS.split(",").map(origin => origin.trim()).filter(Boolean)
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = new socket.Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  app.set("socket", socket);
});


//Express Middlewares for recieving and parsing json and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Different Routes
const authenticateToken = require("./middleware/authenticateToken.js");
const auth = require("./routes/auth.route.js");
const user = require("./routes/user.route.js");
const issue = require("./routes/issue.route.js");
const flag = require("./routes/flag.route.js");

app.use("/auth", auth);
app.use("/user", authenticateToken, user);
app.use("/issues", authenticateToken, issue);
app.use("/flags", authenticateToken, flag);

//Connecting the Database
const redis = require("./service/redis.js");
redis.on("connect", () => {
  console.log("Connected to Redis");
});
redis.on("error", (err) => {
  console.error("Redis client encountered an error:", err);
});


//Starting the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server Started at ${PORT}`));