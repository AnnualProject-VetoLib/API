require("./lib/db");

const User = require("./lib/user");
const Clinical = require("./lib/clinical");
const HealthBook = require("./lib/health_book");
const { SERVER_PORT } = require("./lib/const");
const bodyParser = require("body-parser");
const Express = require("express");
const Cors = require("cors");
const Path = require("path");
const logger = require("morgan");
const app = Express();

//** PARAMETERS **//

const chalk = require("chalk"); // or you can use the require('chalk') syntax too

const morganMiddleware = logger((tokens, req, res) => {
  return [
    chalk.white(`[${tokens.date(req, res)}]`),
    chalk.white(`[${tokens["remote-addr"](req, res)}]`),
    //  chalk.hex("#fffa65").bold("from " + tokens.referrer(req, res)),
    chalk.white(`[${tokens["user-agent"](req, res)}]`),
    chalk.blue(tokens.method(req, res)),
    chalk.yellow(tokens.status(req, res)),
    chalk.grey(tokens.url(req, res)),
    chalk.green(tokens["response-time"](req, res) + " ms"),
  ].join(" ");
});

app.use(morganMiddleware);
// app.use(logger('combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Cors({ origin: "http://localhost:5000" }));
//app.use(Cors({origin: 'http://109.31.193.30'}));
// app.use(Cors({origin: 'http://ideal-lnt.fr'}));
app.use(Express.static(Path.join(__dirname, "public")));
app.set("views", Path.join(__dirname, "views"));
app.set("view engine", "ejs");

//** DEFAULT PATH **//

app.get("/", (_req, res) => {
  res.send("Server is open!");
});

//** USER PATH **//

app.get("/users", User.getAll);
app.get("/users/veto", User.getVeto);
app.get("/users/customer", User.getCustomer);
app.get("/user/:id", User.getById);
app.post("/user/add", User.add);
app.put("/user/update/:id", User.update);
app.delete("/user/delete/:id", User.remove);
app.post("/login", User.login);

//** CLINICAL PATH **//

app.get("/clinicals", Clinical.getAll);

//** HEALTH BOOK **//

app.get("/health_books", HealthBook.getAll);
app.get("/health_book/:id", HealthBook.getById);
app.post("/health_book/add", HealthBook.add);
app.put("/health_book/update/:id", HealthBook.update);
app.delete("/health_book/delete/:id", HealthBook.remove);

//** SERVER LISTEN **//

app.listen(SERVER_PORT, () => {
  console.debug(`Server listening on : ${SERVER_PORT}`);
});
