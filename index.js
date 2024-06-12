// Import required modules
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// Instantiate the express and define the port
const app = express();
const port = 3000;

// Define the base URL used to retrieve the result
const baseURL = "https://v2.jokeapi.dev";
// Define the joke so no errors within the code should occur
let joke;

// Define the static folder for CSS file and also expressely use the bodyParser
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Render the home page - currently without a joke
app.get("/", (req, res) => {
    res.render("index.ejs", { joke: joke, error: null, selectedCategory: null })
});

// Render the page after selecting a category and retrieving the appropriate joke
app.post("/", async (req, res) => {
    try {
        // Get the category based on user's choice from form-select
        const category = req.body.category;
        // Get the response and format it into usable data
        const response = await axios.get(baseURL + "/joke" + "/" + category + "?type=single");
        const randomJoke = response.data.joke;
        // Render the page with provided result
        res.render("index.ejs", {
            joke: randomJoke,
            error: null,
            selectedCategory: category,
        });
    } catch (error) {
        // Log errors in the console if any
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