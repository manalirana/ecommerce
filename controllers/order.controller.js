const express = require('express');
const orderModel = require('../models/address.model');

const address = async(req, res) => {
    const { userId } = req.user;
    const userAddress = req.body;
    const existId = await orderModel.findOne({userId});
    const createAddress = await orderModel.create(userAddress);
    return res.status(200).json(userId,createAddress)
} 


module.exports = { address } ;

