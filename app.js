const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
require("./src/models");



const homeRoutes = require("./src/routes/homeRoutes");
const authRoutes = require("./src/routes/authRoutes");
const postsRoutes = require("./src/routes/postRoutes");
const profilesRoutes = require("./src/routes/profilesRoutes");
const muxHooksRoutes = require("./src/routes/muxHooksRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");
const notificationManagerRoutes = require("./src/routes/notificationManagerRoutes");
const userRelationshipRoutes = require("./src/routes/userRelationshipRoutes");

const errorHandlerMiddleware = require("./src/middlewares/errorHandlerMiddleware");
const notFoundErrorHandlerMiddleware = require("./src/middlewares/notFoundErrorHandlerMiddleware");
const authMiddleware = require("./src/middlewares/authMiddleware");
const NotificationManagerSocketio = require("./src/utils/NotificationManagerSocketio");


const app = express();
const server = http.createServer(app);



// Set middlewares.
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
// Parse URL-encoded bodies for form submissions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(authMiddleware.authenticate);



// Init socketio connection.
NotificationManagerSocketio.handleConnection(server);



// Routes
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);
app.use("/profiles", profilesRoutes);
app.use("/muxHooks", muxHooksRoutes);
app.use("/notifications", notificationRoutes);
app.use("/notificationManager", notificationManagerRoutes);
app.use("/userRelationships", userRelationshipRoutes);


// Set default error handler middlewares.
app.use(notFoundErrorHandlerMiddleware);
app.use(errorHandlerMiddleware);


// Listen to requests.
const port = process.env.PORT;
if (process.env.NODE_ENV !== "test") {
  server.listen(port, () => {
    console.log("Listening to port " + port);
  });
}


module.exports = server;