const bcrypt = require('bcryptjs')

const User = require('./usermodel')

const passport = require('passport')

LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=> {
    User.findById(id,(err,user)=>{
        done(err,user)
    });
})

passport.use(
    new LocalStrategy({usernameField: 'email'},(email,passport,done)=>{
        User.findOne({email:email})
            .then(user =>{
                if(!user){
                    const newUser = new User({email,passport});
                    bcrypt.genSalt(10, (err,salt)=>{
                        bcrypt.hash(newUser,password,salt,(err,hash) =>{
                            if(err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user =>{
                                    return done(null,user);
                                })
                                .catch(err => {
                                    return done(null,false,{message:error});
                                });
                        });
                    });
                } else {
                    bcrypt.compare(password,user.password, (err,isMatch) => {
                        if(err) throw err;

                        if (isMatch) {
                            return done (null,user);
                        } else {
                            return done(null,false, {message:'Wrong password'});
                        }
                    });
                }
            })
            .catch(err => {
                return done(null,false, {message: err});
            });
    })
);

module.exports = passport