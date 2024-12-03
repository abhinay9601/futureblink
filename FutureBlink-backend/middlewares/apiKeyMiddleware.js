// apiKeyMiddleware.js
const validApiKeys = ['5d0883dde69756b055076e451643dc0239bd41f75aec13a8a9c1813c0dd007ba', '5d0883dde69756b055076e451643dc0239bd41f75aec13a8a9c1813c0dd007ba']; // Replace with environment variables or database storage in production

const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({ message: 'API key is missing' });
  }
  
  if (!validApiKeys.includes(apiKey)) {
    return res.status(403).json({ message: 'Invalid API key' });
  }
  
  next(); // Proceed to the route handler if API key is valid
};

module.exports = authenticateApiKey;
