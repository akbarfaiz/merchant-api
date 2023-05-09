const Pool = require('../config/db')

const selectUsers = () => {
    return Pool.query(
      `SELECT * FROM users`
    );
};

const selectUsersById = (id) => {
  return Pool.query(
    `SELECT id,email,date_of_birth,full_name,address,phone,active FROM users WHERE id = ${id}`
  );
};

const findUser = (email) => {
    return new Promise((resolve,reject)=>
      Pool.query(`SELECT * FROM users WHERE email='${email}'`,
      (err,result)=>{
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
      }))
};

const insertUsers = data => {
    const {date_of_birth,full_name,address,phone,email,active,password} = data
    let query = ''
    query = `INSERT INTO users(date_of_birth,full_name,address,phone,email,active,password) VALUES(TO_TIMESTAMP('${date_of_birth}', 'DD-MM-YYYY'),'${full_name}','${address}','${phone}','${email}',${active}, '${password}')`
    return new Promise((resolve,reject)=>
    Pool.query(query,(err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
};

const updateUsers = (id,data) => {
  const {full_name,address,phone,active} = data
  let query = ''
  query = `UPDATE users SET full_name = '${full_name}', address = '${address}', phone = '${phone}', active = ${active} WHERE id = ${id}`
  return new Promise((resolve,reject)=>
  Pool.query(query,(err,result)=>{
      if(!err){
      resolve(result)
      } else {
      reject(err)
      }
  }))
};

module.exports = {selectUsers, selectUsersById, findUser, insertUsers, updateUsers}