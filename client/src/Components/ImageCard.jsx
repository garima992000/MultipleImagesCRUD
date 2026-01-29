import React from 'react'
import { deleteOneImage } from '../utils/UserServices'
import '../CSS/ImageCard.css'
const ImageCard = ({userId,refresh,image}) => {
    const handleDelete=async()=>{
        const res=await deleteOneImage(userId,image);
        console.log('deleteOneimage res',res);
        refresh();
    }
  return (
    <div className="image-card">
      <img src={`http://localhost:3000/${image}`}  width={200} height={200}/>
      <button onClick={handleDelete}>❌</button>
    </div>
  )
}

export default ImageCard
