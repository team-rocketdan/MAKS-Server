const express = require('express');
const mysql = require('mysql');
const dbInfo = require('./config/database.js');
var conn = mysql.createConnection(dbInfo);

var userRouter = require('./routes/user.js');
var marketRouter = require('./routes/market.js');
var menuRouter = require('./routes/menu.js');
var orderRouter = require('./routes/orders');

var app = express();

app.set('port', process.env.PORT || 3004);

app.use('/user', userRouter);
app.use('/market', marketRouter);
app.use('/menu', menuRouter);
app.use('/orders', orderRouter);

app.listen(app.get('port'), () => {
    console.log('express server listening on port' + app.get('port'));
});

/* module.exports = app; */