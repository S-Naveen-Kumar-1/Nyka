const express = require("express")
const { ProductModel } = require("../model/product.model")

const productRouter = express.Router()


productRouter.get("/products", async (req, res) => {
    try {
        let query = {};
        if (req.query.gender) {
            query.gender = req.query.gender;
        }
        if (req.query.category) {
            query.category = req.query.category;
        }
        let sortQuery = {};
        if (req.query.sort) {
            sortQuery[req.query.sort] = req.query.sortOrder === 'asc' ? 1 : -1;
        }
        let searchQuery = {};
        if (req.query.search) {
            searchQuery = { name: { $regex: new RegExp(req.query.search, 'i') } };
        }
        const page = parseInt(req.query.page) || 1
        const skip = (page - 1) * limit;
        const products = await ProductModel.find({ ...query, ...searchQuery })
            .sort(sortQuery)
            .skip(skip)
            .limit(limit);
        res.status(200).send(products)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
})
productRouter.get("/products/:id", async (req, res) => {
    const { id } = req.params
    try {
        const products = await ProductModel.findOne({ _id: id })
        res.status(200).send(products)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
})
productRouter.post("/products", async (req, res) => {
    try {
        const product = new ProductModel(req.body)
        await product.save()
        res.status(201).send({ "msg": "Product successfully uploaded", "product": req.body })
    }
    catch (err) {
        res.status(400).send(err.message)
    }
})
productRouter.patch("/products/:id", async (req, res) => {
    const { id } = req.params

    try {
        await ProductModel.findByIdAndUpdate({ _id: id }, req.body)
        res.status(204).send({ "msg": "product updated successfully", "product": req.body })
    }
    catch (err) {
        res.status(400).send(err.message)

    }
})
productRouter.delete("/products/:id", async (req, res) => {
    const { id } = req.params

    try {
        await ProductModel.findByIdAndDelete({ _id: id })
        res.status(202).send({ "msg": `product with id ${id} deleted successfully` })
    }
    catch (err) {
        res.status(400).send(err.message)
    }
})
module.exports = { productRouter }