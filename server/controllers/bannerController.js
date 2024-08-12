import Banner from '../models/Banner.js';

// Get banner details
export const getBanner = async (req, res) => {
    try {
        const banner = await Banner.findOne({});
        res.json(banner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update/Create banner details
export const updateBanner = async (req, res) => {
    try {
        const { isVisible, description, timer, link } = req.body;
        const banner = await Banner.findOneAndUpdate(
            {},
            { isVisible, description, timer, link },
            { new: true, upsert: true }
        );
        res.json(banner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
