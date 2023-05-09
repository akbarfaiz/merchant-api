const {selectCity,selectCityById,findCity,insertCity} = require('../model/cityModel')

const cityController = {
    createCity: async (req,res,next) => {
        try {
            if (!req.body.longitude || !req.body.name || !req.body.latitude) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else {
                let data = {
                    longitude: req.body.longitude,
                    name: req.body.name,
                    latitude: req.body.latitude,
                }

                let create = await insertCity(data)

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
    getCity: async (req,res,next)=>{
        try {
            let showCity = await selectCity()
            if (!showCity.rows[0]) {
                res.status(400).json({status:400,message:`City not found`})
            } else {
                res.status(200).json({status:200,message:`City found`,data:showCity.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`City failed`})
        }
    },
    getCityByName: async (req,res,next)=>{
        try {
            let showCity = await findCity(req.body.name)
            if (!showCity.rows[0]) {
                res.status(400).json({status:400,message:`City not found`})
            } else {
                res.status(200).json({status:200,message:`City found`,data:showCity.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`City failed`})
        }
    },
    getCityById: async (req,res,next)=>{
        try {
            let showCity = await selectCityById(req.params.id)
            if (!showCity.rows[0]) {
                res.status(400).json({status:400,message:`City not found`})
            } else {
                res.status(200).json({status:200,message:`City found`,data:showCity.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`City failed`})
        }
    }
}

module.exports = cityController