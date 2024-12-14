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
  try {
    const response = await axios.post(`${apiUrl}/api/guides/createGuide`, formData, {
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

export const updateGuide = async (id, formData) => {
  try {
    const response = await axios.put(`${apiUrl}/api/guides/updateGuide/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating file:', error);
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