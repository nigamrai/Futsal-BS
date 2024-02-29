import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'user name is required'],
        minLength: [5, 'Name must be at least 5 char'],
        maxLength: [50, 'Name must be less than50 char'],
        trim: true
    },
    number: {
        type: Number,
        required: [true, 'user number is required'],
        length: [ 10, 'Number must be 10 char'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'user email is required'],
        unique: true,
        lowercase: true,
        unique: [true, 'already registered']

    },
    password: {
        type: String,
        select: false
    },
    confirmPassword: {
        type: String,
    },
    role: {
        type: String,
        enum:["USER","ADMIN","FUTSAL"],
        default:"USER"
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('user', userSchema); //database ma store hune(user vaneko database ko collection ho)

export default userModel;