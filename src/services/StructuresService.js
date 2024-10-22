import axios from 'axios';

const api = 'http://localhost:5000/api/structures';

export const getAllStructures = () => {
  return axios.get(`${api}/getAllStructures`).then((res) => res.data);
};

export const createStructure = (data) => {
  return axios.post(`${api}/createStructure`, data);
};

export const updateStructure = (id, data) => {
  return axios.put(`${api}/updateStructure/${id}`, data);
};

export const deleteStructure = (id) => {
  return axios.delete(`${api}/deleteStructure/${id}`);
};
