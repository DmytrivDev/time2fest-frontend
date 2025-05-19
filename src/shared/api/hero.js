import api from './axios';

export const getHeroBlock = async () => {
  const res = await api.get('/heroes');
  return res.data;
};