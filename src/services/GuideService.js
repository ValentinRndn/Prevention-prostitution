import axios from 'axios';

export const getAllGuides = () => {
  return axios.get('http://localhost:5000/api/guides/getAllGuides')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};


export const getGuideByCategory = (categorie) => {
  return axios.get(`http://localhost:5000/api/guides/getFileByCategory/${categorie}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export const createGuide = async (formData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/guides/createGuide', formData, {
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
    const response = await axios.put(`http://localhost:5000/api/guides/updateGuide/${id}`, formData, {
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
    const response = await axios.delete(`http://localhost:5000/api/guides/deleteGuide/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}