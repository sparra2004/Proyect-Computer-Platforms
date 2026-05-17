import axios from 'axios';

const api = axios.create({
  baseURL: 'https://proyect-computer-platforms-production.up.railway.app',
});

export default api;

// Users
export const getUsers = () => api.get('/users');
export const getUserById = (id: number) => api.get(`/users/${id}`);
export const createUser = (data: any) => api.post('/users', data);
export const updateUser = (id: number, data: any) => api.patch(`/users/${id}`, data);

// Conductores
export const getConductores = () => api.get('/conductores');
export const getConductorById = (id: number) => api.get(`/conductores/${id}`);
export const createConductor = (data: any) => api.post('/conductores', data);

// Vehiculos
export const getVehiculos = () => api.get('/vehiculos');
export const createVehiculo = (data: any) => api.post('/vehiculos', data);

// Viajes
export const getViajes = () => api.get('/viajes');
export const createViaje = (data: any) => api.post('/viajes', data);