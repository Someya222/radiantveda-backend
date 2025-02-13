const mongoose = require('mongoose');

const QuestionnaireSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        activeIngredients: { type: String, required: true },
        ageGroup: { type: String, required: true },
        allergies: { type: String, required: true },
        ayurveda: { type: String, required: true },
        breakouts: { type: String, required: true },
        concerns: { type: [String], required: true },
        skinConditions: { type: String, default: "" },
        skinGoal: { type: String, required: true },
        skinSensitivity: { type: String, required: true },
        skinType: { type: String, required: true },
        sleep: { type: String, required: true },
        sunscreen: { type: String, required: true }
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Questionnaire = mongoose.model('Questionnaire', QuestionnaireSchema);

module.exports = Questionnaire;