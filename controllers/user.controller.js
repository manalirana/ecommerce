const userModel = require('../models/user.model');
const otpModel = require('../models/otp.model');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { message } = require('../config/mailer.config');

const saltRounds = 10;

const signUp = async (req, res) => {
  console.log(req.body.email)
  const isEmailExist = await userModel.findOne({ email: req.body.email });
  if (isEmailExist) {
    res.status(400).send("Email is already Exist");
  }
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const createUser = await userModel.create({
    ...req.body,
    password: hashedPassword
  })
  res.status(201).send(createUser);
}

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }
  const token = jwt.sign({ userId: user._id, role: 'Seller' }, 'secretkey');
  res.json({ token });
}

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const isEmailExist = await userModel.findOne({ email });
  if (!isEmailExist) {
    return res.status(401).json({ message: 'Invalid email' });
  }
  const otp = Math.floor(1000 + Math.random() * 9000)
  await message(email, otp);
  console.log(otp)
  const createOtp = await otpModel.create({
    userId: isEmailExist._id,
    otp,
    lastSentTime: new Date(),
  });
  const token = jwt.sign({ userId: isEmailExist._id }, 'secretkey');

  return res.status(200).json({ token });
}

const verifyOtp = async (req, res) => {
  const { enteredOTP } = req.body;
  const { userId } = req.user;
  console.log(userId);
  const otpData = await otpModel.findOne({ userId });
  console.log('otpData', otpData);
  if (!otpData) {
    res.status(400).send("user does not exists");
  }
  if (enteredOTP !== otpData.otp) {
    return res.status(400).json({ error: 'OTP is incorrect. Please try again.' });
  }
  await otpModel.deleteOne({
    userId: userId
  });
  console.log("userId..", userId)
  if (new Date().getTime() - otpData.lastSentTime.getTime() > 40000) {
    return res.status(400).json({ error: 'OTP expired' });
  }
  return res.status(200).json({ message: 'otp verified' });
}

const resendOtp = async (req, res) => {
  const { userId } = req.user;
  const userExist = await userModel.findOne({ _id: userId });

  const otp = Math.floor(1000 + Math.random() * 9000)
  await message(userExist.email, otp);
  console.log(otp)
  const createOtp = await otpModel.create({
    userId: userExist._id,
    otp,
    lastSentTime: new Date(),
  });

  return res.status(200).json({message: "otp send successful"})
}

const createPassword = async (req, res) => {
  const { userId } = req.user;
  const user = await userModel.findOne({ _id: userId });
  if (!user) {
    return res.status(401).json({ message: 'Invalid user' });
  }

  const { newPassword, confirmPassword } = req.body;
  if (confirmPassword !== newPassword) {
    return res.status(400).json({ message: 'password is not match' })
  }
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  const updatePassword = await userModel.findOneAndUpdate({ _id: userId }, { password: hashedPassword }, { new: true })
  res.status(200).json(updatePassword)
}

module.exports = { signUp, login, forgotPassword, verifyOtp, resendOtp, createPassword };

