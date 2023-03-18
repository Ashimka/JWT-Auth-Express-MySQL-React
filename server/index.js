require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const setupDb = require("./db/db");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const router = require("./routes");

const PORT = process.env.PORT || 5005;
setupDb();
const app = express();

// custom middleware logger
app.use(logger);
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
// Cross Origin Resource Sharing
app.use(cors(corsOptions));
// form data: ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));
// built in middleware for json
app.use(express.json());
// middleware for cookies
app.use(cookieParser());
// serve static files
app.use("/", express.static(path.resolve(__dirname, "static")));
// routes
app.use("/", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
