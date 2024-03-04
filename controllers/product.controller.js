const express = require('express');
// const router = express.Router();
const productModel = require('../models/product.model');

// Endpoint to add a product
const product = async (req, res) => {
    try {
        console.log("dfghj");
        const { role } = req.user;

        if (role !== 'Seller') {
            res.status(403).send({ message: 'user is not authorized for create products' })
        }
        const createProduct = await productModel({
            ...req.body
        });
        await createProduct.save();

        return res.status(201).json(createProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getproduct = async (req, res) => {
    const products = await productModel.find();
    const brands = [];
    // implement listing of brands using map & forEach also.
    // read difference between map & foreach.
    for (let item of products) {
        brands.push(item.brand)
    }
    res.send(brands);
}

// const getproduct = async(req, res) => {
//     const products = await productModel.find();
//     const brands = [];
//     // implement listing of brands using map & forEach also.
//     // read difference between map & foreach.
//     products.forEach(item => {
//       brands.push(item.brand);
//     });
//     res.send(brands);
// }

const patch = async (req, res) => {

    try {
        const productId = req.params.id;
        const updateProperties = req.body;
        const isProductExisted = await productModel.findOne({ _id: productId })
        if (!isProductExisted) {
            res.status(404).send('id is not found');
        }
        const updatedProduct = await productModel.findByIdAndUpdate({ _id: productId }, updateProperties, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteproduct = async (req, res) => {

    try {
        const productId = req.params.id;
        const isproductExist = await productModel.findOne({ _id: productId })
        if (!isproductExist) {
            res.status(404).send('Product is not found');
        }
        await productModel.deleteOne({ _id: productId });
        res.json({ messgae: 'Product deleted' })

    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getProductByCategory = async (req, res) => {
    const { category } = req.query;
    const productByCategory = await productModel.find({ category });
    if (!productByCategory) {
        res.status(400).send('No product found');
    }

    res.status(200).send(productByCategory);
}

const getProductBySubCategory = async (req, res) => {
    const { subCategory } = req.query;
    const productBySubCategory = await productModel.find({ subCategory });
    if (!productBySubCategory) {
        res.status(400).send('No product found');
    }
    res.status(200).send(productBySubCategory);
}

const getProductByPrice = async (req, res) => {
    const { minPrice, maxPrice, subCategory, productName } = req.query;
    
    const product = productName ? {      //ternary opr
        price: { $gte: minPrice, $lte: maxPrice },
        subCategory,
        productName
    } :  {
        price: { $gte: minPrice, $lte: maxPrice },
        subCategory
    };
    
    const productList = await productModel.find(product);
    if (!productList.length) {
        res.status(200).send('No product found');
    }
    res.status(200).send(productList);
}


const getProductBySize = async (req, res) => {
    const { size } = req.query;
    const product = await productModel.find({ size: { $in: [size] } });
    if (!size) {
        res.status(200).send('No product found');
    }
    res.status(400).send(product);
}

const getProductByBrand = async (req, res) => {
    const { brand } = req.query;
    const product = await productModel.find({ brand: { $eq: brand } });
    if (!brand) {
        res.status(200).send('No product found');
    }
    res.status(400).send(product);
}

module.exports = {
    product,
    getproduct,
    patch,
    deleteproduct,
    getProductByCategory,
    getProductBySubCategory,
    getProductByPrice,
    getProductBySize,
    getProductByBrand
};



