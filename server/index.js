// index.js
// This is the server's entry point.
// Its only job is to configure Express (middleware, mounted routes)
// and start listening for requests - no route logic lives here anymore.

const express = require('express');
const cors = require('cors');
const recipesRoutes = require('./routes/recipesRoutes');
const errorHandler = require('./middleware/errorHandler');


const app = express();
const PORT = 3000;

// helmet() sets a collection of HTTP response headers that guard against
// several common web vulnerabilities (e.g. preventing the browser from
// guessing content types in unsafe ways, blocking the site from being
// embedded in a hidden iframe elsewhere). It's a well-established,
// low-effort baseline for any public-facing Express app.
app.use(helmet());

// CORS controls which OTHER websites are allowed to make requests to this API
// from a browser. During local development, allowing "*" (everyone) is convenient.
// Once deployed publicly, we restrict it to only our actual frontend's domain -
// otherwise any website on the internet could call this API directly from a
// visitor's browser, which is unnecessary exposure for a public app.
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  // Add your real deployed frontend URL here once you have one, e.g.:
  // 'https://recipe-box-yourname.vercel.app'
];

// Middleware runs on every incoming request, before it reaches any route.
app.use(cors({
  origin: function (origin, callback) {
    // `origin` is undefined for tools like curl/Postman (no browser involved) -
    // we allow those through since this check is specifically about browser behavior.
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());


// A simple root route, mostly useful for a quick "is the server alive?" check
app.get('/', (req, res) => {
  res.send('Recipe Box API is running!');
});

// Mount the recipes router under the /recipes path.
// Every route defined in recipesRoutes.js is now prefixed with /recipes automatically.
app.use('/recipes', recipesRoutes);

// IMPORTANT: error-handling middleware must be registered LAST,
// after all your other routes. Express only reaches this if
// something earlier in the chain throws or calls next(err).
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});