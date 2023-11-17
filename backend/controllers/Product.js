const {Router} = require("express");
const {isLoggedIn} = require("./middleware");
const getRecommendedProducts = require("../services/Product");
const router = Router();

// Get all products
router.get("/", isLoggedIn, async (req, res) => {
  const { Product } = req.context.models;

  try {
    const products = await Product.find();

    if(!products) {
      res.status(400).json({ error: 'There are no products' });
    }
    res.json({ products });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error });
  }
});

// Add list of products
router.post("/", isLoggedIn, async (req, res) => {
  const { Product } = req.context.models;
  const { products } = req.body;

  try {
    const newProducts = await Product.insertMany(products);
    res.json(newProducts);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/recommended/:id", isLoggedIn, async (req, res) => {
  const { Product } = req.context.models;
  const { id } = req.params;

  try {
    const product = await Product.findOne({id});
    const allProducts = await Product.find();

    if(!product) {
      res.status(400).json({ error: 'There is no product' });
    }
    if(allProducts.length === 0 || !allProducts) {
      res.status(400).json({ error: 'There are no products' });
    }

    const recommendedProducts = getRecommendedProducts([...allProducts], product).map(({ _doc }) => _doc);

    res.json({ recommendedProducts });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error });
  }
});

router.get("/:id", isLoggedIn, async (req, res) => {
  const { Product } = req.context.models;
  const { id } = req.params;

  try {
    const product = await Product.findOne({ id });

    if (!product) {
      res.status(400).json({ error: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = router;