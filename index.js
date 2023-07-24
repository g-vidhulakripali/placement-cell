// Importing the 'express' module and creating an Express application.
const express = require("express");
const app = express();

// Setting the port for the server to listen on.
const port = 8000;

// Importing required middleware and configuration modules.
const expresLayouts = require("express-ejs-layouts");
const sassMiddleware = require("node-sass-middleware");
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMiddleware = require("./config/middleware");

// Configuring the sass middleware to compile SCSS files to CSS.
app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

// Parsing the URL-encoded data sent by forms.
app.use(express.urlencoded());

// Parsing cookies sent in the request.
app.use(cookieParser());

// Setting up express-ejs-layouts for rendering views using layouts.
app.use(expresLayouts);

// Serving static files from the 'assets' directory.
app.use(express.static("./assets"));

// Setting the view engine as 'ejs'.
app.set("view engine", "ejs");

// Setting the views directory to 'views'.
app.set("views", "./views");

// Configuring session middleware to store session data in MongoDB.
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
      mongoUrl:
        "mongodb+srv://gvidhulakripali:Oey4aY6N1BI9N57K@cluster0.squt5dz.mongodb.net/placement-cell-db",
      autoRemove: "disabled",
    }),
  })
);

// Initializing passport for authentication.
app.use(passport.initialize());

// Using passport for session-based authentication.
app.use(passport.session());

// Configuring passport to use local authentication strategy.
app.use(passportLocal.setAuthenticatedUser);

// Adding flash messages middleware to display flash messages to the user.
app.use(flash());

// Custom middleware to set flash messages.
app.use(customMiddleware.setFlash);

// Extracting styles and scripts from layout to be used in the views.
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Using the routes defined in './routes'.
app.use("/", require("./routes"));

// Starting the server and listening on the specified port.
app.listen(port, function (err) {
  if (err) {
    console.log(`Error : ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
