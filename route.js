const express = require("express");
const Usermodel = require("./Usermodel");
const checkUser = require("./Middleware");
const Router = express();
const { genPassword, validPassword } = require("./valid/password");
const passport = require('passport')
const jwt = require('jsonwebtoken')


const expirationtimeInMs = 600000
const secret = "wow123"

Router.post("/login", async function (request, response) {
  const { Email, Password } = request.body;

  let responseData = await Usermodel.findOne({ Email });

  if (responseData) {
    const Solid = validPassword(password,responseData.salt,responseData.hash)
   
    if (Solid) {

      const payload = {
        email: responseData.email,
        expiration: Date.now() + parseInt(expirationtimeInMs)
    }

    const token = jwt.sign(JSON.stringify(payload), secret)
    response
    .cookie('jwt',
        token, {
            httpOnly: true,
            secure: false 
        }
    )
    
.status(200).send({ success: true, message: "Successful" });
    } else {
      response
        .status(300)
        .send({ failure: true, message: "Wrong username or password" });
    }
  } else {
    response.status(400).send({ goaway: true, message: "User does not exist" });
  }
});


Router.post("/signup", async function (request, response) {
  const { Name, Email, Password } = request.body;

  const saltHash = genPassword(Password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  let newUser = new Usermodel({
    Name,
    Email,
    salt,
    hash,
  });

  let responseData = await newUser.save();

  if (responseData) {
    response.status(200).send({ success: true, message: responseData });
  } else {
    response
      .status(400)
      .send({ success: false, message: "User Already Exist" });
  }
});



Router.post('loging', (request, response) => {
  response.status(600).send('Helooo')
})


Router.get('/protected', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.status(200).json({
            message: 'welcome to the protected route!'
        })
    }
)
module.exports = Router;
