const mongoose = require('mongoose')
const {Schema, model} = mongoose


const UserSchema = new Schema({
    name: {type:String, required: true},
    lastName: {type:String, required: true},
    userName: {type:String, required: true, unique: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    mjestoPrebivalista: {type:String},
    struka: {type: String},
    vrstaUsluga: {type: Array},
    godineStaza: {type: Number},
    oKorisniku: {type: String}
})

const UserModel = model('User', UserSchema)

module.exports = UserModel