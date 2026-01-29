import { trusted } from "mongoose";
import UserModel from "../Models/UserModel.js";
import fs from 'fs';
export const create=async(req,res)=>{
    try {
       const{name,email}=req.body;
       const checkEMail=await UserModel.findOne({email});
       if(checkEMail){
        return res.json({message:"This email is not acceptable!!",status:false})
       } 
       const imagesPath=req.files?req.files.map((image)=>image.path):[]
       const user=new UserModel({name,email,images:imagesPath});
       await user.save();
       return res.json({message:"Successfully registered!!",status:true,user:user})
    } catch (error) {
        return res.json({message:error.message,status:false})
    }
}

export const getAll=async(req,res)=>{
    try {
      const users=await UserModel.find();
      return res.json({message:"List of users:",users:users,status:true})  
    } catch (error) {
        return res.json({message:error.message,status:false})
    }
}

export const updateAdd=async(req,res)=>{
    try {
       const id=req.params.id;
       const user=await UserModel.findById(id);
       if(!user){
        return res.json({message:'User not found!!',status:false})
       } 
       if(req.files.length===0){
        return res.json({message:'Cannot perform operation!!',status:false})
       }
       const imagesPath=req.files.map(image=>image.path);
       user.images.push(...imagesPath);
       await user.save();
       return res.json({message:'Images Added Successfully!!',status:true})
    } catch (error) {
        return res.json({message:error.message,status:false}) 
    }
}

export const updateDelete=async(req,res)=>{
    try {
      const userId=req.params.userId;
      const {imagePath}=req.body;
      const user=await UserModel.findById(userId);
      console.log(user.images);
      if(!user){
        return res.json({message:'User does not exists!!',status:false})
      }
      const isImagePresent=user.images.includes(imagePath);
      if(!isImagePresent){
        return res.json({message:'Image not found so cant be deleted',status:false})
      }
      console.log(imagePath); 
      fs.unlinkSync(imagePath);
      user.images=user.images.filter(img=>img!==imagePath);
      
      await user.save();
      return res.json({message:'Image deleted Successfully!!',
        status:true,
        user:user
      })
    } catch (error) {
        return res.json({message:error.message,status:false})
    }
}

export const updateReplace=async(req,res)=>{
    try {
       const userId=req.params.userId;
       const user=await UserModel.findById(userId);
       if(!user){
        return res.json({message:'User not found!!',status:false})
       }
       if(!req.files||req.files.length===0){
        return res.json({message:'No Image provided!!',status:false})
       }
       const imagesPath=req.files.map(image=>image.path);
      
    user.images.map((image)=>(fs.unlinkSync(image)));
    user.images=imagesPath;
    await user.save();
    return res.json({message:"All Images Replaced with new Ones!!",status:true})
    
    } catch (error) {
        return res.json({message:error.message,status:false})
    }
}

export const deleteAll=async(req,res)=>{
    try {
       const userId=req.params.userId;
       const user=await UserModel.findById(userId);
       if(!user){
        return res.json({message:"User not found!!",status:false})
       } 
       user.images.forEach((image)=>(fs.unlinkSync(image)));
       await UserModel.findByIdAndDelete(userId);
       return res.json({message:'Deleted Successfully',status:true})
    } catch (error) {
        return res.json({message:error.message,status:false})
    }
}