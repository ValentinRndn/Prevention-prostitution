import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const getAllStructures = () => {
  return axios.get(`${apiUrl}/api/structures/getAllStructures`).then((res) => res.data);
};

export const createStructure = (data) => {
  return axios.post(`${apiUrl}/api/structures/createStructure`, data);
};

export const updateStructure = (id, data) => {
  return axios.put(`${apiUrl}/api/structures/updateStructure/${id}`, data);
};

export const deleteStructure = (id) => {
  return axios.delete(`${apiUrl}/api/structures/deleteStructure/${id}`);
};
