const Pool = require('../config/db')

const selectMerchant = () => {
    return Pool.query(
      `
      SELECT 
        m.id, m.merchant_name, m.address, c.name as city_name, m.phone, m.expired_date 
      FROM 
        merchant as m
      JOIN
        city as c ON c.id = m.city_id
      `
    );
};

const findMerchant = (name) => {
    return new Promise((resolve,reject)=>
      Pool.query(`
        SELECT
          m.id, m.merchant_name, m.address, c.name as city_name, m.phone, m.expired_date 
        FROM 
          merchant as m
        JOIN
          city as c ON c.id = m.city_id
        WHERE 
          LOWER(m.merchant_name) LIKE LOWER('%${name}%')`,
      (err,result)=>{
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
      }))
};

const selectMerchantById = (id) => {
    return new Promise((resolve,reject)=>
      Pool.query(`
      SELECT
        m.id, m.merchant_name, m.address, c.name as city_name, m.phone, m.expired_date
      FROM 
          merchant as m
      JOIN
          city as c ON c.id = m.city_id 
      WHERE m.id = ${id}`,
      (err,result)=>{
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
      }))
};

const insertMerchant = data => {
    const {merchant_name,city_id,address,phone,expired_date} = data
    let query = ''
    query = `INSERT INTO merchant(merchant_name,city_id,address,phone,expired_date) VALUES('${merchant_name}',${city_id},'${address}','${phone}',TO_TIMESTAMP('${expired_date}', 'DD-MM-YYYY'))`
    return new Promise((resolve,reject)=>
    Pool.query(query,(err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
};

module.exports = {selectMerchant,selectMerchantById,findMerchant,insertMerchant}