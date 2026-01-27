import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://admin:admin123@cluster0.h9fzijr.mongodb.net/MulterMultipleImages?appName=Cluster0')
.then(()=>{console.log('MongoDB is Connected!!')})
.catch((err)=>{console.error(err)})