import { useEffect } from "react";
import { useProductos } from "../context/productosContext";
import { ProductoCard } from "../components/productos/ProductoCard";
import { ImFileEmpty } from "react-icons/im";

export function ProductosPage() {
  const { productos, getProductos } = useProductos();

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <>
      {productos.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No tienes ningun producto hasta el momento :(
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {productos.map((producto) => (
          <ProductoCard producto={producto} key={producto._id} />
        ))}
      </div>
    </>
  );
}
