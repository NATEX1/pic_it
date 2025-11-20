import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    subjectId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    shortName: {
        type: String
    },
    hoursPerWeek: {
        type: Number,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }
});

export default mongoose.models.Subject || mongoose.model('Subject', subjectSchema);
