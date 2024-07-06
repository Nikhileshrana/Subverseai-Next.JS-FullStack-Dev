import mongoose from 'mongoose';

const Usercall = new mongoose.Schema({
    Call_ID: {
        type: String,
        required: true,
    },
    Customer_ID: {
        type: String,
        required: true,
        unique: true,
    },
    Agent_Name: {
        type: String,
        required: true,
    },
    Call_Recording_URL: {
        type: String,
        required: true,
    },
});

export default mongoose.models.Usercall || mongoose.model('Usercall', Usercall);