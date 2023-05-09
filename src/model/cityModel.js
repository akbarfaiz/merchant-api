const Pool = require('../config/db')

const selectCity = () => {
    return Pool.query(
      `SELECT * FROM city`
    );
};

const findCity = (city) => {
    return new Promise((resolve,reject)=>
      Pool.query(`SELECT * FROM city WHERE LOWER(name) LIKE LOWER('%${city}%')`,
      (err,result)=>{
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
      }))
};

const selectCityById = (id) => {
    return new Promise((resolve,reject)=>
      Pool.query(`SELECT * FROM city WHERE id = ${id}`,
      (err,result)=>{
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
      }))
};

const insertCity = data => {
    const {name,longitude,latitude} = data
    let query = ''
    query = `INSERT INTO city(name,longitude,latitude) VALUES('${name}','${longitude}','${latitude}')`
    return new Promise((resolve,reject)=>
    Pool.query(query,(err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
};

module.exports = {selectCity,selectCityById,findCity,insertCity}