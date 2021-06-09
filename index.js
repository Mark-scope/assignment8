const express = require('express')
const cors = require ('cors')
const routes = require('./route')
const app = express();
const connectDB = require("./db");
const passport = require("passport");   //authetification
const Usermodel = require('./Usermodel'); // User Model 
const MongoStore = require('connect-mongo');
const cookieParser=require('cookie-parser')  //imports cookie-parser
require('./valid/passport')


const port = 5000;


// configures more  middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser())   //CookieParser middleware
app.use(express.urlencoded({ extended: true })) //Middleware
app.use(passport.initialize())   //Passport middleware


connectDB();


app.use('/api/v1',routes)
app.get("/", (req, res) => res.send("hello!"));

app.listen(port, () => console.log(`server is running at port ${port}.........`))