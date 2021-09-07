const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const CucasSchema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },    
    description: String,
    cod: String,
    title: String
})
    

CucasSchema.pre('save', function() {
    if (!this.url) {
        this.url = `${process.env.APP_URL}/files/${this.key}`
    }
})

CucasSchema.pre('remove', function() {
    return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'temp', 'uploads', this.key))
})

module.exports = mongoose.model('Cucas', CucasSchema);