// controllers/homeInsuranceController.js

import HomeInsurance from '../models/homeInsuranceModel.js';

// Create a new home insurance holder
export const createHomeInsurance = async (req, res) => {
    console.log(req.body);
    try {
        const { user_id, policyHolderName, propertyAddress, coverageType, premiumAmount, filename, imageFile } = req.body;
        
        // Assuming imageFile contains data URL of the image
        const imageData = imageFile.split(';base64,').pop(); // Extract image data from the data URL
        const imageBuffer = Buffer.from(imageData, 'base64'); // Convert image data to buffer

        const homeInsurance = new HomeInsurance({
            user_id,
            policyHolderName,
            propertyAddress,
            coverageType,
            premiumAmount,
            filename,
            image: {
                data: imageBuffer,
                contentType: 'image/png' // Assuming the image format is PNG, adjust as needed
            }
        });

        const savedInsurance = await homeInsurance.save();
        res.status(201).json(savedInsurance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get all home insurance holders
export const getHomeInsurances = async (req, res) => {
    try {
        const homeInsurances = await HomeInsurance.find();
        res.status(200).json(homeInsurances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single home insurance holder by ID
export const getHomeInsurance = async (req, res) => {
    try {
        const { id } = req.params;
        const homeInsurance = await HomeInsurance.findById(id);
        if (!homeInsurance) {
            return res.status(404).json({ message: `No home insurance found with ID ${id}` });
        }
        res.status(200).json(homeInsurance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a home insurance holder by ID
export const updateHomeInsurance = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedInsurance = await HomeInsurance.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedInsurance) {
            return res.status(404).json({ message: `No home insurance found with ID ${id}` });
        }
        res.status(200).json(updatedInsurance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a home insurance holder by ID
export const deleteHomeInsurance = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInsurance = await HomeInsurance.findByIdAndDelete(id);
        if (!deletedInsurance) {
            return res.status(404).json({ message: `No home insurance found with ID ${id}` });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
