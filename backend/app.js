const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// using swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('js-yaml');
const fs = require('fs');
const swaggerDocument =  YAML.load(fs.readFileSync('./swagger.yaml', 'utf8'));


const healthcheckRouter = require('./routes/healthcheck');

// user routers
const userRouter = require('./routes/user_info_api');

// admin routers
const storeAdminRouter = require('./routes/store_info_api');
const foodAdminRouter = require('./routes/food_info_api');
const stockAdminRouter = require('./routes/stock_info_api');

// get routers
const getStoresRouter = require('./routes/get_stores_api');
const getFoodsRouter = require('./routes/get_foods_api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// default middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// routers
app.use('/healthcheck', healthcheckRouter);

// user routers
app.use('/api/1.0/user', userRouter);

// admin routers
app.use('/api/1.0/admin/store', storeAdminRouter);
app.use('/api/1.0/admin/food', foodAdminRouter);
app.use('/api/1.0/admin/stock', stockAdminRouter);

// get routers
app.use('/api/1.0/stores', getStoresRouter);
app.use('/api/1.0/foods', getFoodsRouter);

// swagger ui
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
const express = require("express");
const mongo = require('./model/mongo.js');
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require('./routes');

require('dotenv-defaults').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);

mongo.connect();

const server = app.listen(process.env.PORT || 5000, function () {
    console.log('Listening on port ' + server.address().port);
});
