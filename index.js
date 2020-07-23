const User = require('./lib/user');
const Clinical = require('./lib/clinical');
const { SERVER_PORT } = require('./lib/const');
const bodyParser = require('body-parser');
const Express = require('express');
const Cors = require('cors');
const Path = require('path');
const logger = require("morgan");
const app = Express();

//** PARAMETERS **//

app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Cors({origin: 'http://localhost:5000'}));
//app.use(Cors({origin: 'http://109.31.193.30'}));
// app.use(Cors({origin: 'http://ideal-lnt.fr'}));
app.use(Express.static(Path.join(__dirname, 'public')));
app.set('views', Path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//** DEFAULT PATH **//

app.get('/', (_req, res) => { res.send('Server is open!') } );

//** USER PATH **//

app.get('/users', User.getAll);
app.get('/user/:id', User.getById);
app.post('/user/add', User.add);
app.put('/user/update/:id', User.update);
app.delete('/user/delete/:id', User.remove);
// app.post('/login', User.login);

//** CLINICAL PATH **//

app.get('/clinicals', Clinical.getAll);

//** SERVER LISTEN **//

app.listen(SERVER_PORT, () => {
   console.debug(`Server listening on : ${SERVER_PORT}`);
});