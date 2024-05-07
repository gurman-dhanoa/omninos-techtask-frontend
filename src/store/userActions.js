import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/api/v1",
  withCredentials: true,
});

const applicationConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const userLogin = createAsyncThunk(
  "userLogin",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.post(
        `/users/login`,
        data,
        applicationConfig
      );
      return result.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: error.response?.data?.message || error.message,
      });
    }
  }
);

export const userRegister = createAsyncThunk(
  "userRegister",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.post(`/users/register`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return result.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: error.response?.data?.message || error.message,
      });
    }
  }
);

export const getUser = createAsyncThunk(
  "getUserDetails",
  async (arg, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.get(`/users/current-user`);
      return result.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: error.response?.data?.message || error.message,
      });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logoutUser",
  async (arg, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.post(`/users/logout`);
      return result.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: error.response?.data?.message || error.message,
      });
    }
  }
);

export const publishPost = createAsyncThunk(
  "publishPost",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.post(`/post/upload-post`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return result.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: error.response?.data?.message || error.message,
      });
    }
  }
);

export const fetchPosts = createAsyncThunk(
  "fetchPosts",
  async (arg, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.get(`/post`);
      return result.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: error.response?.data?.message || error.message,
      });
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  "fetchUserPosts",
  async (arg, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.get(`/post/user-posts`);
      return result.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: error.response?.data?.message || error.message,
      });
    }
  }
);

export const fetchPostDetails = createAsyncThunk(
  "fetchPostDetails",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.get(`/post/details/${data.postId}`);
      return result.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: error.response?.data?.message || error.message,
      });
    }
  }
);

export const likePost = createAsyncThunk(
  "likePost",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.post(`/post/like/${data.postId}`,data);
      return result.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: error.response?.data?.message || error.message,
      });
    }
  }
);

export const userLikeStatus = createAsyncThunk(
  "likePost",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.get(`/post/likeStatus/${data.postId}`,data);
      return result.data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: error.response?.data?.message || error.message,
      });
    }
  }
);