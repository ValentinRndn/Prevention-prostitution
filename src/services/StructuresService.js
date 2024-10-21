import axios from 'axios';

export const showStructureByCategorie = () => {
    return axios.get('http://localhost:5000/api/structures/getStructureByCategorie/:categorie')
    .then(response => {
        return response.data;
    })
    .catch(error => {
        throw error;
    })
};

export const getAllStructures = () => {
    return axios.get('http://localhost:5000/api/structures/getAllStructures')
    .then(response => {
        return response.data;
    })
    .catch(error => {
        throw error;
    })
};
