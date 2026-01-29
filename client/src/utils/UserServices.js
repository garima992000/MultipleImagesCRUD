import { axiosInstance } from "./axiosInstance";

export const createUser = async (data) => {
  try {
    const res = await axiosInstance.post("/create", data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async () => {
  try {
    const res = await axiosInstance.get("/getAll");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const AddImage = async (data, id) => {
  try {
    const res = await axiosInstance.patch(`/updateAdd/${id}`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteOneImage = async (userId,imagePath) => {
  try {
    const res = await axiosInstance.delete(`/updatedelete/${userId}`,{data: { imagePath }});
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const replaceImages = async (userId, data) => {
  try {
    const res = await axiosInstance.patch(`/updateReplace/${userId}`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const res = await axiosInstance.delete(`/delete/${userId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
