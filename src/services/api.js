import axios from "axios";

const API_URL = "https://vercel-backend-three-ashen.vercel.app//api/companies";

export const fetchCompanies = () => axios.get(API_URL);
export const addCompany = (company) => axios.post(API_URL, company);
export const updateCompany = (id, company) => axios.put(`${API_URL}/${id}`, company);
export const deleteCompany = (id) => axios.delete(`${API_URL}/${id}`);
