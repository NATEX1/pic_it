import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    departmentId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }]
});

export default mongoose.models.Department || mongoose.model('Department', departmentSchema);
