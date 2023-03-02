const { Schema, model } = require('mongoose');

const BookSchema = Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    editorial: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        required: true
    },
    format: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    issue: [{
        type: String,
        required: false
    }],
    rating: {
        rate: {
            type: Number,
            required: false
        },
        count: {
            type: Number,
            required: false
        },
    },
    numberPages: {
        type: Number,
        required: false
    },
    ISBN10: {
        type: String,
        required: false
    },
    ISBN13: {
        type: String,
        required: false
    },
    readAge: {
        type: Number,
        required: false
    },
    measureLexile: {
        type: Number,
        required: false
    },
    ItemWeight: {
        type: Number,
        required: false
    },
    dimensions: {
        x: {type: Number, required: false},
        y: {type: Number, required: false},
        z: {type: Number, required: false},
    },
    aboutAuthor: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = model('Book',BookSchema);