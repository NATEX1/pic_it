import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema({
    roomId: {
        type: String,     
        required: true,
        unique: true
    },
    name: {
        type: String,     
        required: true
    },
});

export default mongoose.models.Classroom || mongoose.model('Classroom', classroomSchema);
