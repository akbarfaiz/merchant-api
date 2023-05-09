const {selectStatus,selectStatusById,insertStatus} = require('../model/statusModel')

const StatusController = {
    createStatus: async (req,res,next) => {
        try {
            if (!req.body.user_id || !req.body.description) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else {
                let data = {
                    user_id: req.body.user_id,
                    description: req.body.description
                }

                let create = await insertStatus(data)

                if (!create) {
                    res.status(401).json({status:401,message:`Create failed`})
                } else {
                    res.status(201).json({status:201,message:`Create success`})
                }
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Create failed ${error}`})
        }
    },
    getStatus: async (req,res,next)=>{
        try {
            let showStatus = await selectStatus()
            if (!showStatus.rows[0]) {
                res.status(400).json({status:400,message:`Status not found`})
            } else {
                res.status(200).json({status:200,message:`Status found`,data:showStatus.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Status failed`})
        }
    },
    getStatusById: async (req,res,next)=>{
        try {
            let showStatus = await selectStatusById(req.params.id)
            if (!showStatus.rows[0]) {
                res.status(400).json({status:400,message:`Status not found`})
            } else {
                res.status(200).json({status:200,message:`Status found`,data:showStatus.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Status failed`})
        }
    }
}

module.exports = StatusController