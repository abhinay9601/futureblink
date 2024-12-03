const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flowSchema = new Schema({
    nodes: Array,
    edges: Array,
    createdAt: { type: Date, default: Date.now },
  });
  
const Flow = mongoose.model("Flow", flowSchema);

module.exports = Flow;