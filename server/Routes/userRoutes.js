import express from 'express';
import { create, getAll, updateAdd, updateDelete } from '../Controllers/userController.js';
import upload from '../Config/multer.js';
const router=express();

router.post('/create',upload.array("images",2),create);
router.get('/getAll',getAll);
router.patch('/updateAdd/:id',upload.array("images",2),updateAdd);
router.delete('/updatedelete/:userId',updateDelete)
export default router;