const express = require("express");
const router = express.Router();

router.post("/generate-routine", (req, res) => {
    const data = req.body;

    // Log incoming data to debug
    console.log("Incoming data:", data);

    if (!data.skinType || !data.ageGroup || !data.concerns) {
        return res.status(400).json({ message: "Required fields are missing." });
    }

    // Placeholder for AI-generated routine
    const routine = {
        message: "Routine generated successfully!",
        personalizedRoutine: {
            skinType: data.skinType,
            ageGroup: data.ageGroup,
            tips: ["Use aloe vera gel", "Apply sunscreen daily"],
        },
    };

    res.status(200).json(routine);
});

module.exports = router;
