const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    userId : {
        type : String,
        require : true,
    },
    otp : {
        type : Number,
        require : true,
    },
    lastSentTime : {
        type : Date,
        require : true,
      }
});

const Otp = mongoose.model('isOtp' , otpSchema);
module.exports = Otp;