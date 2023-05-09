const Pool = require('../config/db')

const selectOrder = () => {
    return Pool.query(
      `
      SELECT 
        oi.id, oi.date, oi.quantity, p.name as product_name, p.price, s.full_name as user_name, c.name as city_name
      FROM 
        order_items as oi
      JOIN
        products as p ON p.id = oi.product_id
      JOIN
        users as s ON s.id = oi.user_id
      JOIN
        merchant as m ON m.id = p.merchant_id
      JOIN
        city as c ON c.id = m.city_id
      ORDER BY 
        oi.date DESC
      `
    );
};

const selectOrderById = (id) => {
    return new Promise((resolve,reject)=>
      Pool.query(`
      SELECT 
        oi.id, oi.date, oi.quantity, p.name as product_name, p.price, s.full_name as user_name, c.name as city_name
      FROM 
        order_items as oi
      JOIN
        products as p ON p.id = oi.product_id
      JOIN
        users as s ON s.id = oi.user_id
      JOIN
        merchant as m ON m.id = p.merchant_id
      JOIN
        city as c ON c.id = m.city_id
      WHERE oi.id = ${id}
      ORDER BY 
        oi.date DESC`,
      (err,result)=>{
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
      }))
};

const selectOrderByProduct = (id) => {
  return new Promise((resolve,reject)=>
    Pool.query(`
    SELECT 
      oi.id, oi.date, oi.quantity, p.name as product_name, p.price, s.full_name as user_name, c.name as city_name
    FROM 
      order_items as oi
    JOIN
      products as p ON p.id = oi.product_id
    JOIN
      users as s ON s.id = oi.user_id
    JOIN
      merchant as m ON m.id = p.merchant_id
    JOIN
      city as c ON c.id = m.city_id
    WHERE oi.product_id = ${id}
    ORDER BY 
        oi.date DESC`,
    (err,result)=>{
      if(!err){
        resolve(result)
      } else {
        reject(err)
      }
    }))
};

const selectOrderByCity = (city) => {
  return new Promise((resolve,reject)=>
    Pool.query(`
    SELECT 
      oi.id, oi.date, oi.quantity, p.name as product_name, p.price, s.full_name as user_name, c.name as city_name
    FROM 
      order_items as oi
    JOIN
      products as p ON p.id = oi.product_id
    JOIN
      users as s ON s.id = oi.user_id
    JOIN
      merchant as m ON m.id = p.merchant_id
    JOIN
      city as c ON c.id = m.city_id
    WHERE c.id = ${city}
    ORDER BY 
        oi.date DESC`,
    (err,result)=>{
      if(!err){
        resolve(result)
      } else {
        reject(err)
      }
    }))
};

const selectOrderByMonth = (month) => {
  return new Promise((resolve,reject)=>
    Pool.query(`
    SELECT 
      oi.id, oi.date, oi.quantity, p.name as product_name, p.price, s.full_name as user_name, c.name as city_name
    FROM 
      order_items as oi
    JOIN
      products as p ON p.id = oi.product_id
    JOIN
      users as s ON s.id = oi.user_id
    JOIN
      merchant as m ON m.id = p.merchant_id
    JOIN
      city as c ON c.id = m.city_id
    WHERE EXTRACT(MONTH FROM oi.date :: timestamp) = ${month}
    ORDER BY 
        oi.date DESC`,
    (err,result)=>{
      if(!err){
        resolve(result)
      } else {
        reject(err)
      }
    }))
};

const insertOrder = data => {
    const {date,quantity,product_id,user_id} = data
    let query = ''
    query = `INSERT INTO order_items(date,quantity,product_id,user_id) VALUES(TO_TIMESTAMP('${date}', 'DD-MM-YYYY HH24:MI'),${quantity},${product_id},${user_id})`
    return new Promise((resolve,reject)=>
    Pool.query(query,(err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
};

module.exports = {selectOrder,selectOrderById,selectOrderByMonth,selectOrderByProduct,selectOrderByCity,insertOrder}