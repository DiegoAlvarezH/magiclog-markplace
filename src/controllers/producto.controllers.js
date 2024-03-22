import Producto from "../models/producto.model.js";

export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find({ user: req.user.id }).populate("user");
    res.json(productos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProducto = async (req, res) => {
  try {
    // if (req.user.role !== 'vendedor') {
    //   return res.status(403).json({ message: "Unauthorized to create product" });
    // }

    const { title, sku, credits, date, isPublic, quantity, price } = req.body;
    const newProducto = new Producto({
      title,
      sku,
      credits,
      date,
      isPublic,
      quantity,
      price,
      user: req.user.id,
    });
    await newProducto.save();
    res.json(newProducto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const deletedProducto = await Producto.findByIdAndDelete(req.params.id);
    if (!deletedProducto)
      return res.status(404).json({ message: "Producto not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const { title, sku, credits, date, isPublic } = req.body;
    const productoUpdated = await Producto.findOneAndUpdate(
      { _id: req.params.id },
      { title, sku, credits, date, isPublic },
      { new: true }
    );
    return res.json(productoUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: "Producto not found" });
    return res.json(producto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductosByUser = async (req, res) => {
  try {
    const productos = await Producto.find({ user: req.params.userId }).populate("user");
    res.json(productos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPublicProductos = async (req, res) => {
  try {
    const publicProductos = await Producto.find({ isPublic: true }).populate("user");
    res.json(publicProductos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPrivateProductos = async (req, res) => {
  try {
    const privateProductos = await Producto.find({ user: req.user.id, isPublic: false }).populate("user");
    res.json(privateProductos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTopRatedProductos = async (req, res) => {
  try {
    const topRatedProductos = await Producto.find().sort({ rating: -1 }).populate("user");
    res.json(topRatedProductos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const commentOnProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ message: "Producto not found" });
    }

    const { text } = req.body;

    const newComment = {
      user: req.user.id,
      text,
    };

    producto.comments.push(newComment);
    await producto.save();

    res.json(producto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const likeProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ message: "Producto not found" });
    }

    // verify like is like=true or +2
    const alreadyLiked = producto.likes.some(like => like.user.equals(req.user.id));

    if (alreadyLiked) {
      return res.status(400).json({ message: "You already liked this producto" });
    }

    producto.likes.push({ user: req.user.id });
    await producto.save();

    res.json(producto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};