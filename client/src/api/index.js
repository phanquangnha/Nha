import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";
//https://podstream.onrender.com/api
// const API = axios.create({ baseURL: `podstream.onrender.com/api` });
const API = axios.create({ baseURL: `http://localhost:8700/api` });
// const API = axios.create({ baseURL: `https://podstream.onrender.com/api` });

//auth
export const signIn = async ({ email, password }) =>
  await API.post("/auth/signin", { email, password });
export const signUp = async ({ name, email, password }) =>
  await API.post("/auth/signup", {
    name,
    email,
    password,
  });

export const googleSignIn = async ({ name, email, img }) =>
  await API.post("/auth/google", {
    name,
    email,
    img,
  });
export const findUserByEmail = async (email) =>
  await API.get(`/auth/findbyemail?email=${email}`);

export const generateOtp = async (email, name, reason) =>
  await API.get(
    `/auth/generateotp?email=${email}&name=${name}&reason=${reason}`
  );
export const verifyOtp = async (otp) =>
  await API.get(`/auth/verifyotp?code=${otp}`);
export const resetPassword = async (email, password) =>
  await API.put(`/auth/forgetpassword`, { email, password });

//user api
export const getUsers = async (token) =>
  await API.get(
    "/user",
    { headers: { Authorization: `Bearer ${token}` } },
    {
      withCredentials: true,
    }
  );
export const searchUsers = async (search, token) =>
  await API.get(
    `users/search/${search}`,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

//podcast api
export const createPodcast = async (podcast, token) =>
  await API.post(
    "/podcasts",
    podcast,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );
export const getPodcasts = async () => await API.get("/podcasts");
export const addEpisodes = async (podcast, token) =>
  await API.post(
    "/podcasts/episode",
    podcast,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );
export const favoritePodcast = async (id, token) =>
  await API.post(
    `/podcasts/favorit`,
    { id: id },
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );
export const getRandomPodcast = async () => await API.get("/podcasts/random");

export const getPodcastByTags = async (tags) =>
  await API.get(`/podcasts/tags?tags=${tags}`);

export const getPodcastByCategory = async (category) =>
  await API.get(`/podcasts/category?q=${category}`);

export const getMostPopularPodcast = async () =>
  await API.get("/podcasts/mostpopular");

export const getPodcastById = async (id) =>
  await API.get(`/podcasts/get/${id}`);

export const addView = async (id) => await API.post(`/podcasts/addview/${id}`);

export const searchPodcast = async (search) =>
  await API.get(`/podcasts/search?q=${search}`);

export const deletePostCard = async (id) =>
  await API.delete(`/podcasts/delete-postcard/${id}`);

// blogs
// export const createBlog = async (blog, token) =>
//   await API.post(
//     "/blogs",
//     blog,
//     { headers: { Authorization: `Bearer ${token}` } },
//     { withCredentials: true }
//   );
// export const getBlog = async () => await API.get("/podcasts");
// export const addBlogs = async (blog, token) =>
//   await API.post(
//     "/blog/episode",
//     blog,
//     { headers: { Authorization: `Bearer ${token}` } },
//     { withCredentials: true }
//   );
// export const favoriteBlog = async (id, token) =>
//   await API.post(
//     `/blog/favorit`,
//     { id: id },
//     { headers: { Authorization: `Bearer ${token}` } },
//     { withCredentials: true }
//   );

export const getListAllBlogs = async () => await API.get(`/blog/all`);

export const getAllBlogs = async (name) => await API.get(`/blog/${name}`);

export const getDetailBlog = async (id) => await API.get(`/blog/get/${id}`);

export const getBlogByCategory = async (category) =>
  await API.get(`/blogs/category?q=${category}`);

export const getMostPopularBlog = async () =>
  await API.get("/blog/mostpopular");

export const addBlog = async (body) => await API.post(`/blog`, body);

//  comment 
export const addComment = async (body) => await API.post(`/comment`, body);
export const getCommentForBlog = async (id) => await API.get(`/comment/blog/${id}`);
export const getCommentForPodCast = async (id) => await API.get(`/comment/podcasts/${id}`);

export const deleteBlog = async (id) =>
  await API.delete(`/blog/delete-blog/${id}`);

export const updateBlog = async (id, body) =>
  await API.put(`/blog/update-blog/${id}`, body);

export const searchBlog = async (search) =>
  await API.get(`/blogs/search?q=${search}`);

export const getListUser = async (search) => await API.get(`/user/list`);
