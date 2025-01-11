import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const showNumbers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/statistics/getStats`);
    return response.data; 
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques depuis le service:', error);
    throw error; 
  }
};



export const saveStatistiques = async (statistique) => {
  try {
    const response = await axios.put(`${apiUrl}/api/statistics/updateStats`, statistique);
    return response.data;
  } catch (error) {
    console.error('Error saving statistics:', error);
    throw error;
  }
};
