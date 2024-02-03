import axios from 'axios';

const fetchUserTournaments = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/user-tournaments/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user tournaments:', error);
    throw error; // You may want to handle the error appropriately in your application
  }
};

export default fetchUserTournaments;
