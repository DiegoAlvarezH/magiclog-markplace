import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useProductos } from "../context/productosContext";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function ProductoFormPage() {
  const { createProducto, getProducto, updateProducto } = useProductos();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateProducto(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        createProducto({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }

      // navigate("/productos");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadProducto = async () => {
      if (params.id) {
        const producto = await getProducto(params.id);
        setValue("title", producto.title);
        setValue("sku", producto.sku);
        setValue("quantity", producto.quantity); // Nuevo campo
        setValue("price", producto.price); // Nuevo campo
        setValue(
          "date",
          producto.date ? dayjs(producto.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", producto.completed);
      }
    };
    loadProducto();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Nombre del producto</Label>
        <Input
          type="text"
          name="title"
          placeholder="Titulo de tu producto"
          {...register("title")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Please enter a title.</p>
        )}

        <Label htmlFor="sku">Codigo/Referencia</Label>
        <Input
          name="sku"
          id="sku"
          rows="3"
          placeholder="Codigo/Referencia de tu producto"
          {...register("sku")}
        ></Input>

        <Label htmlFor="quantity">quantity</Label>
        <Input
          type="number"
          name="quantity"
          placeholder="quantity de tu producto"
          {...register("quantity")}
        />
        
        <Label htmlFor="price">price</Label>
        <Input
          type="number"
          name="price"
          placeholder="price de tu producto"
          {...register("price")}
        />

        {/* <Label htmlFor="date">Date</Label> */}
        {/* <Input type="date" name="date" {...register("date")} /> */}
        
        <Button>Guardar</Button>
      </form>
    </Card>
  );
}
