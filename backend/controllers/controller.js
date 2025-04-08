import db from '../config/db.js';
import asyncHandler from 'express-async-handler';

export const getUser = asyncHandler (async(req, res) => {
   const [data]  = await db.query('SELECT * FROM user');
  res.status(200).json(data);
})

export const getUserById = asyncHandler (async(req, res) => {
  const [data]  = await db.query('SELECT * FROM user where id =?',[req.params.id]);
 res.status(200).json(data[0]);
})

export const  createUser = asyncHandler (async(req,res) => {
  const {name, department, salary, address, startDate, time } = req.body;

  const [result] = await db.query(
    'INSERT INTO user (name, department, salary, address, startDate, time) values (?,?,?,?,?,?)', [name, department, salary, address, startDate, time]);
  
  res.status(201).json({
    success:true,
    message: 'User created successfully!!!!',
    userId: result.insertId,
  })
})

export const updateUser = asyncHandler(async(req,res) => {
 const { id } = req.params;
 const { name, department, salary, address, startDate, time } = req.body;
  
 const [result] = await db.query(
  'UPDATE user set name=?, department=?, salary=?, address=?, startDate=?, time=? where id=?',[name, department, salary, address, startDate, time, id]
 );

 res.status(201).json({
  success: true,
  message: 'User Updated!!'
 })
})

export const deleteUser = asyncHandler(async(req,res) => {
  const {id} = req.params;

  const [result] = await db.query(
    'DELETE from user where id=?',[id]
  )

  res.status(200).json({
    success: true,
    message: 'User Deleted!!'
  })
})



export default {getUser,createUser,updateUser,deleteUser,getUserById};