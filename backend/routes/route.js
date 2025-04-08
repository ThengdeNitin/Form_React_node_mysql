import express from 'express';
import { getUser, createUser, updateUser, deleteUser,getUserById } from '../controllers/controller.js';

const route = express.Router();

route.post('/create', createUser);
route.get('/get', getUser);
route.get('/get/:id', getUserById);
route.put('/update/:id', updateUser);
route.delete('/delete/:id', deleteUser);

export default route;
