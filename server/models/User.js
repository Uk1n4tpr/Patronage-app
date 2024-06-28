const mongoose = require('mongoose')
const {Schema, model} = mongoose


const UserSchema = new Schema({
    name: {type:String, required: true},
    lastName: {type:String, required: true},
    userName: {type:String, required: true, unique: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true}
})

const UserModel = model('User', UserSchema)

module.exports = UserModel