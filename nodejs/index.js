require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

if (!process.env.PORT) {
  return process.exit(1);
}

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// built-in middleware for json
app.use(express.json());

require("./routes")(app);

const PORT = process.env.PORT;
app.listen(PORT, () => console.info(`Listening on port ${PORT}...`));
