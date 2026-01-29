import express from 'express';
import { create, deleteAll, getAll, updateAdd, updateDelete, updateReplace } from '../Controllers/userController.js';
import upload from '../Config/multer.js';
const router=express();

router.post('/create',upload.array("images"),create);
router.get('/getAll',getAll);
router.patch('/updateAdd/:id',upload.array("images"),updateAdd);
router.delete('/updatedelete/:userId',updateDelete)
router.patch('/updateReplace/:userId',upload.array("images"),updateReplace);
router.delete('/delete/:userId',deleteAll);
export default router;