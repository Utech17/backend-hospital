import axios from "axios";
import { ClassDB } from "../config";
import { ClassInterface } from "../interfaces";

const API_URL = "http://localhost:3900/api/class"; // URL de la API

const ClassServices = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      return {
        message: response.data.message,
        status: response.status,
        data: response.data.data,
      };
    } catch (error: any) {
      console.error("Error al obtener clases:", error);
      return error.response?.data || { message: "Error desconocido", status: 500 };
    }
  },

  getOne: async (id: number | string) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return {
        message: response.data.message,
        status: response.status,
        data: response.data.data,
      };
    } catch (error: any) {
      console.error("Error al obtener la clase:", error);
      return error.response?.data || { message: "Error desconocido", status: 500 };
    }
  },

  create: async (data: Partial<ClassInterface>) => {
    try {
      data.des_class = data.des_class?.toLowerCase();
      const response = await axios.post(`${API_URL}`, data);
      return {
        message: response.data.message,
        status: response.status,
        data: response.data.data,
      };
    } catch (error: any) {
      console.error("Error al crear la clase:", error);
      return error.response?.data || { message: "Error desconocido", status: 500 };
    }
  },

  update: async (id: number | string, data: Partial<ClassInterface>) => {
    try {
      data.des_class = data.des_class?.toLowerCase();
      const response = await axios.put(`${API_URL}/${id}`, data);
      return {
        message: response.data.message,
        status: response.status,
        data: response.data.data,
      };
    } catch (error: any) {
      console.error("Error al actualizar la clase:", error);
      return error.response?.data || { message: "Error desconocido", status: 500 };
    }
  },

  delete: async (id: number) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return {
        message: response.data.message,
        status: response.status,
      };
    } catch (error: any) {
      console.error("Error al eliminar la clase:", error);
      return error.response?.data || { message: "Error desconocido", status: 500 };
    }
  },

  findByName: async (name: string) => {
    try {
      const response = await axios.get(`${API_URL}/search?name=${name}`);
      return {
        message: response.data.message,
        status: response.status,
        data: response.data.data,
      };
    } catch (error: any) {
      console.error("Error al buscar la clase por nombre:", error);
      return error.response?.data || { message: "Error desconocido", status: 500 };
    }
  },
};

export { ClassServices };
