
// Importing Express and Mongoose
import express from 'express';
import mongoose from 'mongoose';

// Importing routes
import userRoutes from './routes/users.js';
import homeinsurance from './routes/homeInsuranceRoutes.js'

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());
// Serve static files from the 'public' directory
app.use(express.static('public'));
// Apply user routes
app.use('/api/users', userRoutes);
app.use('/api/home-insurance', homeinsurance);

// Connect to MongoDB and start the server
mongoose.connect('mongodb+srv://sunsunnysinger:JrWKJmITyFW0TxrA@cluster0.th5p1er.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(err => console.error('MongoDB connection failed:', err));
