const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            connectSrc: ["'self'", "https://www.facebook.com"],
            imgSrc: ["'self'", "data:", "https:"],
            frameSrc: ["https://www.facebook.com"]
        }
    }
}));

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-domain.railway.app', 'https://your-custom-domain.com']
        : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));

// Compression middleware
app.use(compression());

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files middleware
app.use(express.static(path.join(__dirname), {
    maxAge: process.env.NODE_ENV === 'production' ? '1d' : '0',
    etag: true,
    lastModified: true
}));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - ${req.ip}`);
    next();
});

// API Routes
app.post('/api/submit-result', (req, res) => {
    try {
        const result = req.body;
        
        // Validate the result data
        if (!result.email || !result.difficulty || typeof result.score !== 'number') {
            return res.status(400).json({ 
                error: 'Invalid result data',
                message: 'Email, difficulty, and score are required'
            });
        }

        // Log the result (in production, you might want to save to a database)
        console.log('Quiz result submitted:', {
            email: result.email,
            difficulty: result.difficulty,
            score: result.score,
            percentage: result.percentage,
            date: result.date
        });

        // Here you would typically save to a database
        // await saveResultToDatabase(result);

        res.json({ 
            success: true, 
            message: 'Result saved successfully',
            id: Date.now() // Simple ID generation
        });
    } catch (error) {
        console.error('Error submitting result:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: 'Failed to save result'
        });
    }
});

// API endpoint to get quiz statistics (optional)
app.get('/api/stats', (req, res) => {
    // In a real application, you would fetch this from a database
    const mockStats = {
        totalQuizzes: 1247,
        averageScore: {
            easy: 85,
            medium: 72,
            hard: 58,
            expert: 23
        },
        topScores: [
            { difficulty: 'expert', score: 10, percentage: 100 },
            { difficulty: 'expert', score: 9, percentage: 90 },
            { difficulty: 'hard', score: 10, percentage: 100 }
        ]
    };
    
    res.json(mockStats);
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Main route - serve the quiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch-all route - serve index.html for client-side routing
app.get('*', (req, res) => {
    // Only serve HTML for non-API routes
    if (!req.url.startsWith('/api/')) {
        res.sendFile(path.join(__dirname, 'index.html'));
    } else {
        res.status(404).json({ error: 'API endpoint not found' });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'production' 
            ? 'Something went wrong' 
            : error.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not found',
        message: 'The requested resource was not found'
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎾 Tennis Quiz server running on port ${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📱 Access at: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});

module.exports = app; 