const express = require("express");
const mongoose = require("mongoose");
const Movie = require("./schemas/MovieSchema");

const app = express();
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/moviesdb");

app.get("/movies", async (req, res) => {
    const allMovies = await Movie.find();
    return res.status(200).json(allMovies);
});

app.get("/movies/:id", async (req, res) => {
    const selectedMovie = await Movie.findById(req.params.id);
    return res.status(200).json(selectedMovie);
});

app.post("/movies", async (req, res) => {
    const newMovie = await Movie.create(req.body);
    return res.status(200).json(newMovie);
});

app.patch("/movies/:id", async (req, res) => {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    return res.status(200).send(updatedMovie);
});

app.delete("/movies/:id", async (req, res) => {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    return res.status(200).send(deletedMovie);
});

app.listen(8000);