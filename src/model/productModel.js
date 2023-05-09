const Pool = require('../config/db')

const selectProduct = () => {
    return Pool.query(
      `
      SELECT 
        p.id, p.name as product_name, p.price, m.merchant_name, m.address, m.phone as merchant_phone
      FROM 
        products as p
      JOIN
        merchant as m ON m.id = p.merchant_id 
      `
    );
};

const findProduct = (name) => {
    return new Promise((resolve,reject)=>
      Pool.query(`
      SELECT 
        p.id, p.name as product_name, p.price, m.merchant_name, m.address, m.phone as merchant_phone 
      FROM 
        products as p
      JOIN
        merchant as m ON m.id = p.merchant_id
      WHERE LOWER(p.name) LIKE LOWER('%${name}%')
      `,
      (err,result)=>{
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
      }))
};

const selectProductById = (id) => {
    return new Promise((resolve,reject)=>
      Pool.query(`
      SELECT 
        p.id, p.name as product_name, p.price, m.merchant_name, m.address, m.phone as merchant_phone 
      FROM 
        products as p
      JOIN
        merchant as m ON m.id = p.merchant_id 
      WHERE p.id = ${id}`,
      (err,result)=>{
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
      }))
};

const insertProduct = data => {
    const {name,merchant_id,price} = data
    let query = ''
    query = `INSERT INTO products(name,merchant_id,price) VALUES('${name}',${merchant_id},${price})`
    return new Promise((resolve,reject)=>
    Pool.query(query,(err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
};

module.exports = {selectProduct,selectProductById,findProduct,insertProduct}