import React from "react";
import { useEffect } from "react";
import {
  AddImage,
  deleteUser,
  getUsers,
  replaceImages,
} from "../utils/UserServices";
import { useState } from "react";
import "../CSS/UsersList.css";
import { toast } from "react-toastify";
import ImageCard from "../Components/ImageCard";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const UserList = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const fileInputRef = useRef(null);
  const replaceInputRef = useRef(null);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.users);
  };

  const handleDelete = async (id) => {
    const res = await deleteUser(id);
    const { status, message } = res;
    if (status === true) {
      toast.success(message);
    }
    fetchUsers();
  };

  const handleChange = async (e) => {
    const files = [...e.target.files];
    const formData = new FormData();
    files.forEach((image) => formData.append("images", image));
    const res = await AddImage(formData, selectedUserId);
    const { status, message } = res;
    if (status === true) {
      toast.success(message);
    }
    fetchUsers();
    e.target.value = "";
  };

  const handleReplaceChange = async (e) => {
    const files = [...e.target.files];
    const formData = new FormData();
    files.forEach((image) => formData.append("images", image));
    const res = await replaceImages(selectedUserId, formData);
    const { status, message } = res;
    if (status === true) {
      toast.success(message);
    }
    fetchUsers();
    e.target.value = "";
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  console.log("users", users);
  return (
    <div className="users-page">
      {users &&
        users.map((user) => {
          return (
            <div className="user-card" key={user._id}>
              <p>{user.name}</p>
              <Swiper
                modules={[Navigation,Autoplay]}
                navigation={user.images.length > 1}
                spaceBetween={10}
                slidesPerView={1}
                loop={user.images.length > 1}
                autoplay={{
                  delay: 3000
                }}
              >
                {user.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <ImageCard
                      userId={user._id}
                      refresh={fetchUsers}
                      image={image}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleChange}
              />
              <button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginLeft: "20px",
                }}
                onClick={() => {
                  setSelectedUserId(user._id);
                  fileInputRef.current.click();
                }}
              >
                Add Images
              </button>
              <input
                type="file"
                multiple
                ref={replaceInputRef}
                style={{ display: "none" }}
                onChange={handleReplaceChange}
              />
              <button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginLeft: "20px",
                }}
                onClick={() => {
                  replaceInputRef.current.click();
                  setSelectedUserId(user._id);
                }}
              >
                Replace All Images{" "}
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default UserList;
