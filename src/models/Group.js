import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    groupId: {
        type: String,     
        required: true,
        unique: true
    },
    groupName: {
        type: String,       
        required: true
    },
    level: {
        type: Number,      
        required: true
    },
    department: {
        type: String,      
        required: true
    }
});

export default mongoose.models.Group || mongoose.model('Group', groupSchema);
