import axios from 'axios';

const API_ENDPOINT = 'https://static.bymiles.co.uk/tech-test/feedv2.json';

const JourneysApiService = {
  getJourneys: async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      return response.data;
    } catch (error) {
      console.error('Error fetching data: ', error);
      return [];
    }
  },
};

export default JourneysApiService;
