import mongoose from 'mongoose';

const PaymenthistorySchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
    unique: true,
  },
  razorpay_order_id: {
    type: String
  }
});

export default mongoose.models.Paymenthistory || mongoose.model('Paymenthistory', PaymenthistorySchema);