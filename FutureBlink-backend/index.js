const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
require('dotenv').config();

// Create an instance of express
const app = express();
app.use(express.json());
app.use(cors());


// Connect to MongoDB
connectDB();

app.use('/api', require('./routes/api'));

app.use('/', (req, res) => {
  res.send('<h1>Welcome to FutureBlink - A platform for sending scheduled emails</h1>');
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
