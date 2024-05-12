import axios from "axios";
const url = "http://localhost:3000/events";
const urlMovies = "http://localhost:3000/movies";


export const getallEvents = async (id) => {
 id = id || "";
 return await axios.get(`${url}/${id}`);
};


export const addEvent = async (event) => {
 return await axios.post(url, event);
};


export const editEvent = async (id, event) => {
 return await axios.put(`${url}/${id}`, event);
};


export const deleteEvent = async (id) => {
 return await axios.delete(`${url}/${id}`);
};

export const getallMovies = async (id) => {
 id = id || "";
 return await axios.get(`${urlMovies}/${id}`);
};


export const addMovie = async (event) => {
 return await axios.post(urlMovies, event);
};


export const editMovie = async (id, event) => {
 return await axios.put(`${urlMovies}/${id}`, event);
};


export const deleteMovie = async (id) => {
 return await axios.delete(`${urlMovies}/${id}`);
};