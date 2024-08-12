import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
    isVisible: { type: Boolean, default: true },
    description: { type: String, required: true },
    timer: { type: Number, required: true },
    link: { type: String, required: true },
});

const Banner = mongoose.model('Banner', bannerSchema);

export default Banner;
