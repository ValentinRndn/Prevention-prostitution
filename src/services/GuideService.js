import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllGuides = () => {
  return axios.get(`${apiUrl}/api/guides/getAllGuides`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};


export const getGuideByCategory = (categorie) => {
  return axios.get(`${apiUrl}/api/guides/getFileByCategory/${categorie}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export const createGuide = async (formData) => {
  const token = localStorage.getItem('token');
  console.log('Token pour createGuide:', token ? 'Présent' : 'Absent');

  try {
    const response = await axios.post(`${apiUrl}/api/guides/createGuide`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating file:', error);
    console.error('Error response:', error.response?.data);
    throw error;
  }
};

export const updateGuide = async (id, formData) => {
  const token = localStorage.getItem('token');
  console.log('Token pour updateGuide:', token ? 'Présent' : 'Absent');
  console.log('ID du guide:', id);
  console.log('FormData keys:', Array.from(formData.keys()));

  try {
    const response = await axios.put(`${apiUrl}/api/guides/updateGuide/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating file:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    throw error;
  }
}


export const deleteGuide = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/api/guides/deleteGuide/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}