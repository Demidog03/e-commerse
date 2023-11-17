require("dotenv").config() // load .env variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const {log} = require("mercedlogger") // import mercedlogger's log function
const cors = require("cors") // import cors
const UserRouter = require("./controllers/User") //import User Routes
const TodoRouter = require("./controllers/Todo") // import Todo Routes
const ProductRouter = require("./controllers/Product") // import Todo Routes
const {createContext, prefetchProductData} = require("./controllers/middleware")
const productsData = require("./data/products");
const axios = require("axios");

//DESTRUCTURE ENV VARIABLES WITH DEFAULT VALUES
const {PORT = 3000} = process.env

// Create Application Object
const app = express()

// GLOBAL MIDDLEWARE
app.use(cors()) // add cors headers
app.use(morgan("tiny")) // log the request for debugging
app.use(express.json()) // parse json bodies
app.use(createContext) // create req.context

// ROUTES AND ROUTES
app.get("/api", (req, res) => {
    res.send("this is the test route to make sure server is working")
})
app.use("/api/user", UserRouter) // send all "/user" requests to UserRouter for routing
app.use("/api/products", ProductRouter) // send all "/todos" request to TodoROuter
app.use("/api/todos", TodoRouter) // send all "/todos" request to TodoROuter

// APP LISTENER
app.listen(PORT, async () => {
    log.green("SERVER STATUS", `Listening on port ${PORT}`)
})