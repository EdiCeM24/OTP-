const Verifier = require('auth-verify');
const dotenv = require('dotenv');

dotenv.config();

const verifier = new Verifier({
  sender: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
  serv: 'gmail',
  otp: { // otp is optional
    leng: 6,  // length of otp code
    expMin: 3,  // expiring time of otp mail  (in minutes )
    limit: 5,  // limit of sending of otp mails (This is needed to prevent being marked as spam)
    cooldown: 60  // <= user must wait 60 seconds between requests (It's a small setting the provides a big security and stability boost)
  }
});

module.exports = verifier;