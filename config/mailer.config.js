
const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'manalipundir@gmail.com',
    pass: 'dkzjizrlsxhfanos '
  },
});

async function message(email, otp) {
  let mailOptions = {
    from: 'manalipundir@gmail.com',
    to: email,
    subject: 'Password Reset Mail',
    text: `Hello from Node.js!, ${otp}`
  };

 await transport.sendMail(mailOptions);
}


module.exports = { message };