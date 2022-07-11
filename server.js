const express = require("express");
const db = require("./config/connection");
const { User, Thought } = require("./models");

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on localhost:${PORT}`);
    });
});
