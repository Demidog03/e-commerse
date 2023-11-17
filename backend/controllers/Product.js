const {Router} = require("express");
const {isLoggedIn} = require("./middleware");
const router = Router();

// Get all products
router.get("/", isLoggedIn, async (req, res) => {
  const { Product } = req.context.models;

  try {
    const products = await Product.find();
    console.log(products)
    if(products.length === 0) {
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

module.exports = router;