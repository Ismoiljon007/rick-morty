import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api";

export const getCharacters = (params) =>
  axios.get(`${API_URL}/character`, {
    params: params,
  });
export const getCharacter = (id) => axios.get(`${API_URL}/character/${id}`);
export const getEpisodes = (params) =>
  axios.get(`${API_URL}/episode`, {
    params: params,
  });
export const getEpisode = (id) => axios.get(`${API_URL}/episode/${id}`);
export const getLocations = (params) =>
  axios.get(`${API_URL}/location`, {
    params: params,
  });
export const getLocation = (id) => axios.get(`${API_URL}/location/${id}`);
