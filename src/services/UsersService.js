import axios from 'axios';

export const getAllUsers = () => {
    return axios.get('http://localhost:5000/api/users/getAllUsers')
    .then(response => {
        return response.data;
    })
    .catch(error => {
        throw error;
    });
};

export const getUserById = (id) => {
    return axios.get(`http://localhost:5000/api/users/getUserById/${id}`)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        throw error;
    });
}



export const createUser = async (formData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/createUser', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating file:', error);
        throw error;
    }
};


export const updateUser = async (id, userData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`http://localhost:5000/api/users/updateUser/${id}`, userData, {
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
      const response = await axios.delete(`http://localhost:5000/api/users/deleteUser/${id}`, {
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