const {selectProduct,selectProductById,findProduct,insertProduct} = require('../model/productModel')

const ProductController = {
    createProduct: async (req,res,next) => {
        try {
            if (!req.body.name || !req.body.merchant_id || !req.body.price) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else {
                let data = {
                    name: req.body.name,
                    merchant_id: req.body.merchant_id,
                    price: req.body.price
                }

                let create = await insertProduct(data)

                if (!create) {
                    res.status(401).json({status:401,message:`Create failed`})
                } else {
                    res.status(201).json({status:201,message:`Create success`})
                }
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Create failed`})
        }
    },
    getProduct: async (req,res,next)=>{
        try {
            let showProduct = await selectProduct()
            if (!showProduct.rows[0]) {
                res.status(400).json({status:400,message:`Product not found`})
            } else {
                res.status(200).json({status:200,message:`Product found`,data:showProduct.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Product failed`})
        }
    },
    getProductByName: async (req,res,next)=>{
        try {
            let showProduct = await findProduct(req.body.name)
            if (!showProduct.rows[0]) {
                res.status(400).json({status:400,message:`Product not found`})
            } else {
                res.status(200).json({status:200,message:`Product found`,data:showProduct.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Product failed`})
        }
    },
    getProductById: async (req,res,next)=>{
        try {
            let showProduct = await selectProductById(req.params.id)
            if (!showProduct.rows[0]) {
                res.status(400).json({status:400,message:`Product not found`})
            } else {
                res.status(200).json({status:200,message:`Product found`,data:showProduct.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Product failed`})
        }
    }
}

module.exports = ProductController