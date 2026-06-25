import Product from "../models/Product.js";
import User from "../models/User.js";

export const addProduct = async (
  req,
  res
) => {
  try {
    const {
      name,
      price,
      description
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image file"
      });
    }

    const image = `/uploads/${req.file.filename}`;

    const product =
      await Product.create({
        name,
        price,
        image,
        description,
        createdBy: req.user.id
      });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getProducts = async (
  req,
  res
) => {
  try {
    const products =
      await Product.find().sort({
        createdAt: -1
      });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found"
      });
    }

    product.name =
      req.body.name ||
      product.name;

    product.price =
      req.body.price ||
      product.price;

    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    product.description =
      req.body.description ||
      product.description;

    const updated =
      await product.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteProduct = async (
  req,
  res
) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found"
      });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const likeProduct = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user.id
      );

    const productId =
      req.params.id;

    const exists =
      user.likedProducts.includes(
        productId
      );

    if (exists) {
      user.likedProducts =
        user.likedProducts.filter(
          (item) =>
            item.toString() !==
            productId
        );
    } else {
      user.likedProducts.push(
        productId
      );
    }

    await user.save();

    res.json({
      success: true
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getLikedProducts =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        ).populate(
          "likedProducts"
        );

      res.json(
        user.likedProducts
      );
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };