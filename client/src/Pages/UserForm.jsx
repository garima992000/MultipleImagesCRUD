import React from "react";
import { useState } from "react";
import { createUser } from "../utils/UserServices";
import "../CSS/UserForm.css";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [images, setImages] = useState([]);
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    images.forEach((image) => formData.append("images", image));
    const res = await createUser(formData);
    const { status, message } = res;
    if (status === true) {
      toast.success(message);
    }
    navigate('/userslist')
  };
  return (
    <div className="form-wrapper">
      <h2 className="form-heading">Create New User</h2>

      <form className="user-form">
        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="file"
          multiple
          onChange={(e) => setImages([...e.target.files])}
        />

        <button onClick={handleSubmit}>Create User</button>
      </form>
    </div>
  );
};

export default UserForm;
