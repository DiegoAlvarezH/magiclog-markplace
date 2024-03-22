import axios from "./axios";

export const getProductosRequest = async () => axios.get("/producto");

export const createProductoRequest = async (producto) => axios.post("/productos", producto);

export const updateProductoRequest = async (producto) =>
  axios.put(`/producto/${producto._id}`, producto);

export const deleteProductoRequest = async (id) => axios.delete(`/producto/${id}`);

export const getProductoRequest = async (id) => axios.get(`/producto/${id}`);
