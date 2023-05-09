const {selectOrder,selectOrderById,selectOrderByMonth,selectOrderByProduct,selectOrderByCity,insertOrder} = require('../model/orderModel')

const OrderController = {
    createOrder: async (req,res,next) => {
        try {
            if (!req.body.date || !req.body.quantity || !req.body.product_id || !req.body.user_id) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else {
                let data = {
                    date: req.body.date,
                    quantity: req.body.quantity,
                    product_id: req.body.product_id,
                    user_id: req.body.user_id
                }

                let create = await insertOrder(data)

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
    getOrder: async (req,res,next)=>{
        try {
            let showOrder = await selectOrder()
            if (!showOrder.rows[0]) {
                res.status(400).json({status:400,message:`Order not found`})
            } else {
                res.status(200).json({status:200,message:`Order found`,data:showOrder.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Order failed`})
        }
    },
    getOrderById: async (req,res,next)=>{
        try {
            let showOrder = await selectOrderById(req.params.id)
            if (!showOrder.rows[0]) {
                res.status(400).json({status:400,message:`Order not found`})
            } else {
                res.status(200).json({status:200,message:`Order found`,data:showOrder.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Order failed`})
        }
    },
    getOrderByMonth: async (req,res,next)=>{
        try {
            let showOrder = await selectOrderByMonth(req.params.month)
            if (!showOrder.rows[0]) {
                res.status(400).json({status:400,message:`Order not found`})
            } else {
                res.status(200).json({status:200,message:`Order found`,data:showOrder.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Order failed`})
        }
    },
    getOrderByProduct: async (req,res,next)=>{
        try {
            let showOrder = await selectOrderByProduct(req.params.product_id)
            if (!showOrder.rows[0]) {
                res.status(400).json({status:400,message:`Order not found`})
            } else {
                res.status(200).json({status:200,message:`Order found`,data:showOrder.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Order failed`})
        }
    },
    getOrderByCity: async (req,res,next)=>{
        try {
            let showOrder = await selectOrderByCity(req.params.city_id)
            if (!showOrder.rows[0]) {
                res.status(400).json({status:400,message:`Order not found`})
            } else {
                res.status(200).json({status:200,message:`Order found`,data:showOrder.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Order failed ${error}`})
        }
    },
}

module.exports = OrderController