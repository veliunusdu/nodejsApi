import express from 'express';
import { getAllUsers, createUser, getUser, deleteUser, updateUser, putUser } from '../controllers/users.mjs';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put('/:id', putUser);
router.patch('/:id', updateUser);

export default router;
