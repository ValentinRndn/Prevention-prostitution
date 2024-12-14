import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllUsers = () => {
    return axios.get(`${apiUrl}/api/users/getAllUsers`)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        throw error;
    });
};

export const getUserById = (id) => {
    return axios.get(`${apiUrl}/api/users/getUserById/${id}`)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        throw error;
    });
}



export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/api/users/createUser`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateUser = async (id, userData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${apiUrl}/api/users/updateUser/${id}`, userData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Envoi du token dans l'en-tête Authorization
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };
  
  export const deleteUser = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`${apiUrl}/api/users/deleteUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Envoi du token dans l'en-tête Authorization
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };