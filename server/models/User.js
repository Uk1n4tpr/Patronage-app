const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: {type: String, default: ""},
  facebook: {type: String, default: ""},
  instagram: {type: String, default: ""},
  mjestoPrebivalista: { type: String, default: null },
  struka: { type: String, default: null },
  vrstaUsluga: { type: Array, default: null },
  godineStaza: { type: String, default: null },
  oKorisniku: { type: String, default: null },
  firstLogin: {type: String, default: null},
  image: {type: String},
  joiningDate: {
    type: String,
    default: 
      new Date(),
  },
  isActivated: {type: String, default: false}
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
