const express = require('express');
const alexaApp = express.Router();
const fileUpload = require('express-fileupload'); // Import fileUpload
const axios = require('axios'); // Ensure axios is imported for API requests
const expressAsyncHandler = require('express-async-handler');
require('dotenv').config();

// Use the fileUpload middleware
alexaApp.use(fileUpload());

// Endpoint to process the image
alexaApp.post('/google-vision', async (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).send('No image uploaded');
    }

    const image = req.files.image.data.toString('base64');

    try {
        const response = await axios.post(
            `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION_API_KEY}`,
            {
                requests: [
                    {
                        image: { content: image },
                        features: [{ type: 'TEXT_DETECTION' }]
                    }
                ]
            }
        );

        const textAnnotations = response.data.responses[0].textAnnotations;
        res.json({ text: textAnnotations[0]?.description || 'No text detected' });
    } catch (error) {
        res.status(500).send('Error processing image');
    }
});

module.exports = alexaApp;