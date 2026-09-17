// both pulls in packages that were installed
const express = require('express'); //express is framework
//cors is middleware that allows server to communicate with react app
const cors = require('cors')

////all routes and middleware will be attached to this
const app = express(); //server instance
const PORT = 3000;

//middleware
//functions that run on every request before it reaches your routes
app.use(cors()); //allowes server to communicate with browser
app.use(express.json()); //parses json in request bodies into a javascript obeject

//fake recipe data
let recipes = [
    {
        id:1,
        title: "macaroni and cheese",
        ingridients: ["milk", "flour", "butter", "macaroni elbows", "cheese"],
        instructions: "Boil elbows, create roux by melting butter then mixing in flower, pour in milk, let sauce thicken and add cheese"
    },
    {id:2,
    title: "chicken katsu",
    ingridients: ["flour", "egg", "panko crumbs" , "chicken", "oil"],
    instructions: "Dip chicken in flour, then egg, then panko crumbs. Then fry"
    }
];


////////routes syntax
    // get routes: / this is what request is being sent to
        //req is incoming request , res is response
    
//test routes
app.get('/', (req, res) => {
  res.send("recipe box api is running");
});

//get all recipes
app.get('/recipes', (req, res) => {
  res.json(recipes); //send array back as JSON
});

//get a single recipe by id
app.get('/recipes/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).json({ error: "RECIPE NOT FOUND" });
  res.json(recipe);
});

app.listen(PORT, () => {
console.log('Server running on http://localhost:${PORT}')
})

