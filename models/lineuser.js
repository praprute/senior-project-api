const mongoose = require('mongoose');

const lineSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    LineID: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    role: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('Lineuser', lineSchema);