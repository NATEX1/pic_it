import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    grade: {
        type: String,
        required: true
    },
    prefix: {
        type: String,
        enum: ['ด.ช.', 'ด.ญ.', 'น.ส.', 'นางสาว', 'นาย', 'นาง'],
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['กำลังศึกษา', 'จบการศึกษา', 'พักการเรียน', 'ลาออก'],
        default: 'กำลังศึกษา'
    }
});

export default mongoose.models.Student || mongoose.model('Student', studentSchema);
