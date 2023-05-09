const {selectUsers,selectUsersById,insertUsers,findUser,updateUsers,deleteUsers} = require('../model/usersModel')
const generateToken = require('./../helper/generateToken');
const argon2 = require('argon2');

const usersController = {
    createUsers: async (req,res,next) => {
        try {
            if (!req.body.date_of_birth || !req.body.full_name || !req.body.address || !req.body.phone || !req.body.email || !req.body.active || !req.body.password) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else if (req.body.password.length < 6) {
                res.status(404).json({status:404,message:`Your password must at least 6 characters`})
            } else if (req.body.password.length > 12) {
                res.status(404).json({status:404,message:`Maximum password is 12 characters`})
            } else {
                let {rows:[users]} = await findUser(req.body.email)
                if (users) {
                    res.status(401).json({status:401,message:`Email has been registered`})
                } else {
                    let data = {
                        date_of_birth: req.body.date_of_birth,
                        full_name: req.body.full_name,
                        address: req.body.address,
                        phone: req.body.phone,
                        email: req.body.email,
                        active: req.body.active,
                        password: await argon2.hash(req.body.password)
                    }

                    let register = await insertUsers(data)

                    if (!register) {
                        res.status(401).json({status:401,message:`Register failed`})
                    } else {
                        res.status(201).json({status:201,message:`Register success`})
                    }
                }
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Register Error`})
        }
    },
    loginUsers: async (req,res,next)=>{
        try {
            if (!req.body.email || !req.body.password) {
                res.status(404).json({status:404,message:`Please fill Email or Password`})
            } else {
                let {rows:[users]} = await findUser(req.body.email)

                if (!users) {
                    res.status(404).json({status:404,message:`User not found`})
                } else {
                    let verifyPassword = await argon2.verify(users.password,req.body.password)

                    let data = users
                    delete data.password

                    let token = generateToken(users)

                    if (verifyPassword) {
                        users.token = token
                        delete users.password
                        res.status(200).json({status:200,message:`Login success`,data:users})
                    } else {
                        res.status(404).json({status:404,message:`Incorrect Password`})
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    },
    getAllUser: async (req,res,next)=>{
        try {
            let show = await selectUsers()
            if (!show.rows[0]) {
                res.status(400).json({status:400,message:`User not found`})
            } else {
                res.status(200).json({status:200,message:`User found`,data:show.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Get User error`})
        }
    },
    updateUser: async (req,res,next)=>{
        try {
            let show = await selectUsersById(req.payload.id)
            if (!show.rows[0]) {
                res.status(400).json({status:400,message:`User not found`})
            } else {
                
                let data = {
                    full_name: req.body.full_name || show.rows[0].full_name,
                    address: req.body.address || show.rows[0].address,
                    phone: req.body.phone || show.rows[0].phone,
                    active: req.body.active || show.rows[0].active
                }

                let update = await updateUsers(req.payload.id,data)

                if (!update) {
                    res.status(400).json({status:400,message:`Update failed`})
                } else {
                    res.status(200).json({status:200,message:`Update Success`})
                }
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Update Error ${error}`})
        }
    }
}

module.exports = usersController