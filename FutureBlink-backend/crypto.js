const crypto = require('crypto');

// Generate a random 32-character API key
const generateApiKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Example usage
const apiKey = generateApiKey();
console.log("Generated API Key:", apiKey);
