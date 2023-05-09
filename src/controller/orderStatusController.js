const {selectOrderStatus,selectOrderStatusById,insertOrderStatus} = require('../model/orderStatusModel')

const OrderStatusController = {
    createOrderStatus: async (req,res,next) => {
        try {
            if (!req.body.order_id || !req.body.status_id) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else {
                let data = {
                    order_id: req.body.order_id,
                    status_id: req.body.status_id
                }

                let create = await insertOrderStatus(data)

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
    getOrderStatus: async (req,res,next)=>{
        try {
            let showOrderStatus = await selectOrderStatus()
            if (!showOrderStatus.rows[0]) {
                res.status(400).json({status:400,message:`Order Status not found`})
            } else {
                res.status(200).json({status:200,message:`Order Status found`,data:showOrderStatus.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Order Status failed`})
        }
    },
    getOrderStatusById: async (req,res,next)=>{
        try {
            let showOrderStatus = await selectOrderStatusById(req.params.id)
            if (!showOrderStatus.rows[0]) {
                res.status(400).json({status:400,message:`Order Status not found`})
            } else {
                res.status(200).json({status:200,message:`Order Status found`,data:showOrderStatus.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Order Status failed`})
        }
    }
}

module.exports = OrderStatusController