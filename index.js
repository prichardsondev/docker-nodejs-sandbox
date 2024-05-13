const express = require('express');
const cors = require('cors');
const connectWithRetry = require('./src/db');
const routes = require('./src/routes/post');
const { CORS_ORIGIN } = require('./src/config');

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(cors({
  origin: `${CORS_ORIGIN}`, // Adjust this for production with specific domains
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Database connection
connectWithRetry();

// API routes
routes(app);

// Root route
app.get('/', (req, res) => res.send("That's Right!!!"));

// Start server
app.listen(port, () => console.log(`Server listening on port ${port}`));

