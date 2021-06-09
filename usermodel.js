const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsermodelSchema = new Schema({

    Name: String,
    Email: {
        type: String,
        required: true,
        unique:true,
    } ,
    Password:String,
    hash: String,
    salt:String
    
})



const Usermodel = mongoose.model('Usermodel', UsermodelSchema)

module.exports = Usermodel;