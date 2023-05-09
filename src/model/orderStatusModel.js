const Pool = require('../config/db')

const selectOrderStatus = () => {
    return Pool.query(
      `SELECT * FROM order_status`
    );
};

const selectOrderStatusById = (id) => {
    return new Promise((resolve,reject)=>
      Pool.query(`SELECT * FROM order_status WHERE order_id = ${id}`,
      (err,result)=>{
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
      }))
};

const insertOrderStatus = data => {
    const {order_id,status_id} = data
    let query = ''
    query = `INSERT INTO order_status(order_id,status_id) VALUES(${order_id},${status_id})`
    return new Promise((resolve,reject)=>
    Pool.query(query,(err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
};

module.exports = {selectOrderStatus,selectOrderStatusById,insertOrderStatus}