import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const sendFormEmail = async (name, email, subject, phone, message) => {
    try {
        const response = await axios.post(`${apiUrl}/api/form/send-form-email`, {
        name,
        email,
        subject,
        phone,
        message,
        });
        return response.data;
    } catch (error) {
        console.error('Error sending form email:', error);
        throw error;
    }
    }