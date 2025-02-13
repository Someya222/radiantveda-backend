const mongoose = require('mongoose');

const UserResponseSchema = new mongoose.Schema({
    skinType: String,
    skinSensitivity: String,
    concerns: [String],
    breakouts: String,
    ageGroup: String,
    ayurveda: String,
    skinGoal: String,
    sunscreen: String,
    sleep: String,
    activeIngredients: String,
    allergies: String,
    skinConditions: String,
});

module.exports = mongoose.model('UserResponse', UserResponseSchema);
