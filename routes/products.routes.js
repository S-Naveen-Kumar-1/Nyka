const express = require("express")
const { ProductModel } = require("../model/product.model")

const productRouter = express.Router()


productRouter.get("/products", async (req, res) => {
    try {
        const products = await ProductModel.find()
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