const Pool = require('../config/db')

const selectStatus = () => {
    return Pool.query(
      `SELECT * FROM master_status`
    );
};

const selectStatusById = (id) => {
    return new Promise((resolve,reject)=>
      Pool.query(`SELECT * FROM master_status WHERE user_id = ${id}`,
      (err,result)=>{
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
      }))
};

const insertStatus = data => {
    const {user_id,description} = data
    let query = ''
    query = `INSERT INTO master_status(user_id,description) VALUES(${user_id},'${description}')`
    return new Promise((resolve,reject)=>
    Pool.query(query,(err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
};

module.exports = {selectStatus,selectStatusById,insertStatus}