const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the email templates
const emailTemplateSchema = new Schema({
  subject: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  templateType: {
    type: String,
    enum: ['Introduction', 'Follow-Up', 'Offer'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update `updatedAt` on each update
emailTemplateSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model based on the schema
const EmailTemplate = mongoose.model('EmailTemplate', emailTemplateSchema);

module.exports = EmailTemplate;
