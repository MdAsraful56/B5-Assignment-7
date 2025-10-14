import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { authRouter } from './modules/auth/auth.route';
import { contactRoute } from './modules/contact/contact.route';
import { postRoute } from './modules/posts/post.route';
import { projectRouter } from './modules/project/project.route';
import { userRouter } from './modules/users/user.route';

const app = express();

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(compression()); // Compresses response bodies for faster delivery
app.use(express.json()); // Parse incoming JSON requests

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', postRoute);
app.use('/api/v1/contact', contactRoute);
app.use('/api/v1/project', projectRouter);

// Default route for testing
app.get('/', (_req, res) => {
    res.send('Portfolio API is running');
});

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route Not Found',
    });
});

export default app;
