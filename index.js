import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const baseURL = "https://v2.jokeapi.dev";
let joke;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {joke: joke, error: null, selectedCategory: null})
})


app.post("/", async (req, res) => {
    try {
        const category = req.body.category;
        const response = await axios.get(baseURL + "/joke" + "/" + category + "?type=single");
        const randomJoke = response.data.joke;
        joke = randomJoke;
        res.render("index.ejs", {
            joke: randomJoke,
            error: null,
            selectedCategory: category,
        });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: "No jokes available for the selected category. Please try again.",
            selectedCategory: null,
        });
    }
});


app.listen(port, () => {
    console.log("Listening on port: " + port)
})