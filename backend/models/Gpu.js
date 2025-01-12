import mongoose from 'mongoose';

const gpuSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startingPrice: {
    type: Number,
    required: true,
  },
  currentBid: {
    amount: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Gpu', gpuSchema);