const express = require('express');
const app = express();
const path = require('path');
require("dotenv").config();
const bodyParser = require("body-parser");
const db = require("./config/db")
//middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Router
app.use("/team", require("./router/team"))
app.use("/news", require("./router/news"))
app.use("/career", require("./router/career"))

// db
db()

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
})  