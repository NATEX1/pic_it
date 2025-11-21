import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    subjectId: {
        type: String,
        required: true,
        unique: true
    },
    group: {
        type: mongoose.Schema.ObjectId,
        ref: 'Group'
    },
    name: {
        type: String,
        required: true
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
