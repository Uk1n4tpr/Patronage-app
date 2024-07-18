const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer')


const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePasswords = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

const sendMail = async (id, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'ukinatpr124@gmail.com',
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const newMail = await transporter.sendMail({
    to: email,
    from: 'ukinatpr124@gmail.com',
    subject: "Aktivacioni email",
    html: `
        <p>Pritisnite na link ispod za aktivaciju</p>
        <a href="http://localhost:5173/login/${id}">Activation link</a>
      `,
  });
  console.log(newMail)
};



module.exports = {
  hashPassword,
  comparePasswords,
  sendMail
};
