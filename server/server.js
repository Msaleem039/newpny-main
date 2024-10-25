// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import categoryRoutes from './routes/categoryRoutes.js';
import instructorRoutes from './routes/instructorRoutes.js';
import courseRoutes from './routes/courseRoutes.js';


import cors from 'cors';
import blogpostrouter from './routes/blogpostroutes.js';
import blogcatroutes from './routes/Blogcatroutes.js';
import specialBroutes from './routes/special.blogPostRoutes.js';
import specialcityroutes from './routes/cityCategoryRoutes.js';
import router from './routes/eflyerRoutes.js';
// Load environment variables
dotenv.config();
// Connect to the database
connectDB();
const app = express();
app.use(express.json());
// CORS Middleware Configuration
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin (frontend)
    credentials: true, // Enable sending cookies and credentials
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // Allow these methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
}));

// Middleware to parse JSON bodies
app.use(express.json());
// API routes
app.use('/api/categories',categoryRoutes);
app.use('/api/instructors',instructorRoutes);
app.use('/api/courses',courseRoutes);
app.use('/api/blogpost',blogpostrouter);
app.use('/api/blogcate',blogcatroutes);
app.use('/api/specialcatblog',specialBroutes);
app.use('/api/citycategory',specialcityroutes);
app.use('/api/eflyer',router);
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
