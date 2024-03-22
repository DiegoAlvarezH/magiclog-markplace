import { createContext, useContext, useState } from "react";
import {
  createProductoRequest,
  deleteProductoRequest,
  getProductosRequest,
  getProductoRequest,
  updateProductoRequest,
} from "../api/producto";

const ProductoContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductoContext);
  if (!context) throw new Error("useProductos must be used within a ProductoProvider");
  return context;
};

export function ProductoProvider({ children }) {
  const [productos, setProductos] = useState([]);

  const getProductos = async () => {
    const res = await getProductosRequest();
    setProductos(res.data);
  };

  const deleteProducto = async (id) => {
    try {
      const res = await deleteProductoRequest(id);
      if (res.status === 204) setProductos(productos.filter((producto) => producto._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createProducto = async (producto) => {
    try {
      const res = await createProductoRequest(producto);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducto = async (id) => {
    try {
      const res = await getProductoRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProducto = async (id, producto) => {
    try {
      await updateProductoRequest(id, producto);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductoContext.Provider
      value={{
        productos,
        getProductos,
        deleteProducto,
        createProducto,
        getProducto,
        updateProducto,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
}
