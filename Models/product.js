var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String,
    price: Number,
    color: {
        type: String,
        enum: ['black', 'green', 'blue', 'red']
    },
    created: Date,
    last_updated: Date
});

productSchema.pre('save', {query: true}, function (next) {
    this._id = mongoose.mongo.ObjectID();
    this.created = new Date();
    this.last_updated = new Date();
    next();
});

module.exports = mongoose.model('product', productSchema);