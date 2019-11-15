import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://leafy-caster-169415.firebaseio.com/'
});

export default instance;