const {selectMerchant,selectMerchantById,findMerchant,insertMerchant} = require('../model/merchantModel')

const MerchantController = {
    createMerchant: async (req,res,next) => {
        try {
            if (!req.body.merchant_name || !req.body.city_id || !req.body.address || !req.body.phone || !req.body.expired_date) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else {
                let data = {
                    merchant_name: req.body.merchant_name,
                    city_id: req.body.city_id,
                    address: req.body.address,
                    phone: req.body.phone,
                    expired_date: req.body.expired_date
                }

                let create = await insertMerchant(data)

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
    getMerchant: async (req,res,next)=>{
        try {
            let showMerchant = await selectMerchant()
            if (!showMerchant.rows[0]) {
                res.status(400).json({status:400,message:`Merchant not found`})
            } else {
                res.status(200).json({status:200,message:`Merchant found`,data:showMerchant.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Merchant failed`})
        }
    },
    getMerchantByName: async (req,res,next)=>{
        try {
            let showMerchant = await findMerchant(req.body.name)
            if (!showMerchant.rows[0]) {
                res.status(400).json({status:400,message:`Merchant not found`})
            } else {
                res.status(200).json({status:200,message:`Merchant found`,data:showMerchant.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Merchant failed`})
        }
    },
    getMerchantById: async (req,res,next)=>{
        try {
            let showMerchant = await selectMerchantById(req.params.id)
            if (!showMerchant.rows[0]) {
                res.status(400).json({status:400,message:`Merchant not found`})
            } else {
                res.status(200).json({status:200,message:`Merchant found`,data:showMerchant.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Merchant failed`})
        }
    }
}

module.exports = MerchantController