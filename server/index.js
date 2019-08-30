const http = require('http'),
      path = require('path'),
      Routing = require('./rutas.js')
      bodyParser= require('body-parser'),
      express = require('express')
      session = require( 'express-session' ),
      cors = require ('cors'); 

const PORT = 8080
const app = express()

app.use(session({secret:'XASDASDA',resave: false,saveUninitialized: true,}));

const server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})) 

app.use(express.static(path.join(__dirname, '../src/app')));

app.use(cors())
app.use('/',Routing)

server.listen(PORT, function(){
    console.log('Conectado al puerto: ' + PORT)
})