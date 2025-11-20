import mongoose from 'mongoose'

const teacherSchema = new mongoose.Schema({
    teacherId: {
        type: String,
        required: true
    },
    prefix: {
        type: String,
        enum: ['นาย', 'นาง', 'นางสาว'],
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
    maxHoursWeek: {
        type: Number,
        required: true
    },
    classRoom: {
        type: mongoose.Schema.ObjectId,
        ref: 'Classroom'
    },
    birthDate: {
        type: String,
        required: true
    },
    subjects: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Subject'
    }]
})

export default mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema)