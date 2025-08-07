import axios from 'axios';

const api = axios.create({
  baseURL: 'https://my-server-ydzm.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default function useAxiosPublic() {
  return api;
}
