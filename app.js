const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const morgan = require('morgan');
require('./database.js');

//config
app.set('port', process.env.PORT || 19200);

app.set(morgan("dev"));

//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(flash());
app.use(cookieParser("asd-jkl-key"));
app.use(require('./router.js'));

app.listen(app.get('port'), () => {
    console.log('API is running on port '+ app.get('port'));
});