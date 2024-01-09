const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { auth } = require("./middlewares/authMiddlewares");

const { PORT, DB_URL } = require("./constants");
const routes = require("./router");

//init
const app = express();

//configure express
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);

//configure handlebars
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "src/views");

//database connection
async function dbConnect() {
  await mongoose.connect(DB_URL);
}
dbConnect()
  .then(() => {
    console.log("Successfully connecting to the database!");
  })
  .catch((err) => console.log(`Error while connecting to DB. Error: ${err}`));
//routes
app.use(routes);

app.listen(PORT, () =>
  console.log(`Server is running on PORT: ${PORT}`)
);
