import mongoose from 'mongoose';

const applySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    resumeUrl: {
        type: String,
        required: true,
    },
});

const Apply = mongoose.models.Apply || mongoose.model('Apply', applySchema);
export default Apply;

