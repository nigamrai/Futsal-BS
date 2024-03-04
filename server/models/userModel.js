import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    fullName: {
        type: 'String',
        required: [true, 'user name is required'],
        minLength: [5, 'Name must be at least 5 char'],
        maxLength: [50, 'Name must be less than50 char'],
        trim: true
    },
    mobile: {
        type: Number,
        required: [true, 'user number is required'],
        length: [ 10, 'Number must be 10 number'],
        trim: true

    },
    email: {
        type: 'String',
        required: [true, 'user email is required'],
        unique: true,
        lowercase: true,
        unique: [true, 'already registered'],
        trim: true
    },
    password: {
        type: 'String',
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: 'String'
        },
        secure_url: {
            type: 'String'
        }
    },
    role: {
        type: 'String',
        enum:["USER","ADMIN","FUTSAL"],
        default:"USER"
        
    },
},{
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});


const User = model('user', userSchema, 'users');
export default User;