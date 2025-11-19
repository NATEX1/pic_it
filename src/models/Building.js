import mongoose from 'mongoose';

const buildingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  floor: {
    type: Number,
    required: true, 
    min: 1, 
  },
}, {
  timestamps: true,
});

export default mongoose.models.Building || mongoose.model('Building', buildingSchema);
