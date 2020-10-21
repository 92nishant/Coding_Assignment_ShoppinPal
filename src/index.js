require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const db = require("./config/db");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

app.use(bodyParser.urlencoded({ extended:false }));

app.use(bodyParser.json({type: 'application/json'}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, handshakingtoken');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', "token");

    // Pass to next layer of middleware
    next();

});


app.get('/',(req,res) => {
	res.json({"message":"ShoppinPal Coding Assigment"});
})

app.get('/test',(req, res)=>{
    return res.status(200).json({message: "ShoppinPal Coding Assigment Testing"});
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('./app/routes/routes.js')(app);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(db.url, { useUnifiedTopology: true, useNewUrlParser:true  })
.then((connection) => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    //console.log(err);
    console.log(db.url);
    console.log('Could not connect to the database. Exiting ++ now...');
    process.exit();
});

app.listen(process.env.NODE_PORT, () => {
	console.log('\x1b[34m', `ShoppinPal listing PORT ${process.env.NODE_PORT}`);
})
