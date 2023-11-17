require("dotenv").config(); // loading env variables
const productsData = require("../data/products.json");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Todo = require("../models/Todo");
const Product = require("../models/Product");

// CREATE CONTEXT MIDDLEWARE
const createContext = (req, res, next) => {
  // put any data you want in the object below to be accessible to all routes
  req.context = {
    models: {
      User,
      Todo,
      Product
    },
  };
  next();
};

// MIDDLEWARE FOR AUTHORIZATION (MAKING SURE THEY ARE LOGGED IN)
const isLoggedIn = async (req, res, next) => {
  try {
    // check if auth header exists
    if (req.headers.authorization) {
      // parse token from header
      const token = req.headers.authorization.split(" ")[1]; //split the header and get the token
      if (token) {
        const payload = await jwt.verify(token, process.env.SECRET);
        if (payload) {
          // store user data in request object
          req.user = payload;
          next();
        } else {
          res.status(400).json({ error: "token verification failed" });
        }
      } else {
        res.status(400).json({ error: "malformed auth header" });
      }
    } else {
      res.status(400).json({ error: "No authorization header" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const prefetchProductData = async (req, res, next) => {
  const { Product } = req.context.models;
  console.log('saving...')
  try {
    const existProducts = await Product.find();
    if(existProducts.length === 0 || !existProducts) {
      console.log('No products found, inserting data...');
      await Product.insertMany(productsData);
      console.log('Data insertion complete.');
    }
    next();
  } catch (error) {
    console.error('Error in prefetchProductData:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// export custom middleware
module.exports = {
  isLoggedIn,
  createContext,
  prefetchProductData
};
