require('dotenv').config();
const express = require('express');
const { swaggerUi, specs } = require('./docs/swagger');
const walletRoutes = require('./routes/wallet');
const rateLimiter = require('./middlewares/rateLimiter');
const app = express();
app.use(express.json());

// Rate Limiter Middleware
app.use(rateLimiter);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/wallet', walletRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('API documentation available at http://localhost:3000/api-docs');
});
