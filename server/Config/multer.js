import multer from 'multer';

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
})

const upload=multer({
    storage,
    limits:{
        fileSize:50*1024*1024
    },
    fileFilter:(req,file,cb)=>{
        if(file.mimetype.startsWith('image/')){
            cb(null,true)
        }
        else{
            cb(new Error('Incorrect file Type!!'))
        }
    }
})

export default upload;