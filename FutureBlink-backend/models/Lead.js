const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the user data
const leadSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address']
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
  },
  companyName: {
    type: String,
    required: true
  },
  linkedinProfile: {
    type: String,
    required: true,
    match: [/^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+$/, 'Please enter a valid LinkedIn profile URL']
  },
  source: {
    type: String,
    enum: ['Organic Search', 'Paid Ads', 'Social Media', 'Referral'],
    required: true
  }
});

// Create the model based on the schema
const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
