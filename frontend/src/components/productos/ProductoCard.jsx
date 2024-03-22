import { useProductos } from "../../context/productosContext";
import { Button, ButtonLink, Card } from "../ui";

export function ProductoCard({ producto }) {
  const { deleteProducto } = useProductos();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{producto.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteProducto(producto._id)}>Delete</Button>
          <ButtonLink to={`/productos/${producto._id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{producto.sku}</p>
      {/* format date */}
      <p>
        {producto.date &&
          new Date(producto.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
    </Card>
  );
}
