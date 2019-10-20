import mongoose from 'mongoose';

const ActivationTokenSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    index: { expires: 43200 },
  },
});

export default mongoose.model('ActivationToken', ActivationTokenSchema);
