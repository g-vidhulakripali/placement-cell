const express = require("express");
const app = express();
const port = 8000;
const expresLayouts = require("express-ejs-layouts");
const sassMiddleware = require("node-sass-middleware");
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");
const MongoStore = require("connect-mongo");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expresLayouts);
app.use(express.static("./assets"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(
  session({
    name: "placement-cell",
    secret: "StudentInfo",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/placement_cell_db",
      autoRemove: "disabled",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error : ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
