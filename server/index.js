// index.js
// This is the server's entry point.
// Its only job is to configure Express (middleware, mounted routes)
// and start listening for requests - no route logic lives here anymore.

const express = require('express');
const cors = require('cors');
const recipesRoutes = require('./routes/recipesRoutes');

const app = express();
const PORT = 3000;

// Middleware runs on every incoming request, before it reaches any route.
app.use(cors());          // Allows the React frontend (different port) to call this API
app.use(express.json());  // Parses incoming JSON request bodies into req.body

// A simple root route, mostly useful for a quick "is the server alive?" check
app.get('/', (req, res) => {
  res.send('Recipe Box API is running!');
});

// Mount the recipes router under the /recipes path.
// Every route defined in recipesRoutes.js is now prefixed with /recipes automatically.
app.use('/recipes', recipesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});