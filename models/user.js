// Importing Mongoose and bcrypt
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Middleware to hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 8);
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
