import axios from 'axios';


export const showNumbers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/statistics/getStats');
    return response.data; 
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques depuis le service:', error);
    throw error; 
  }
};



export const saveStatistiques = async (statistique) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/statistics/updateStats`, statistique);
    return response.data;
  } catch (error) {
    console.error('Error saving statistics:', error);
    throw error;
  }
};
