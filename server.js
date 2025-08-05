const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const crypto = require('crypto');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

// Mailchimp configuration - Environment variables only for security
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_DATA_CENTER || 'us17';

// Validate required environment variables
if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
    console.warn('⚠️  Warning: Mailchimp API key or List ID not configured. Newsletter features will be disabled.');
}

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            connectSrc: ["'self'", "https://www.facebook.com", `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com`],
            imgSrc: ["'self'", "data:", "https:", "Public/"],
            frameSrc: ["https://www.facebook.com"],
            frameAncestors: [
                "'self'", 
                "https://*.myshopify.com", 
                "https://*.shopifypreview.com",
                "https://www.tennisresor.net",
                "https://tennisresor.net",
                "https://*.shopify.com"
            ]
        }
    }
}));

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-domain.railway.app', 'https://your-custom-domain.com', 'https://www.tennisresor.net']
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

// Serve Public directory for images
app.use('/Public', express.static(path.join(__dirname, 'Public'), {
    maxAge: process.env.NODE_ENV === 'production' ? '7d' : '0',
}));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - ${req.ip}`);
    next();
});

// Mailchimp Helper Functions
function getMailchimpSubscriberHash(email) {
    return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
}

async function mailchimpRequest(endpoint, method, data) {
    if (!MAILCHIMP_API_KEY) {
        throw new Error('Mailchimp API key not configured');
    }
    
    const auth = Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64');
    
    const options = {
        hostname: `${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com`,
        path: `/3.0${endpoint}`,
        method: method,
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let body = '';
            
            res.on('data', (chunk) => {
                body += chunk;
            });
            
            res.on('end', () => {
                try {
                    const response = JSON.parse(body);
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

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

// Mailchimp subscription endpoint
app.post('/api/mailchimp/subscribe', async (req, res) => {
    // Check if Mailchimp is configured
    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
        return res.status(503).json({ 
            error: 'Service unavailable',
            message: 'Newsletter service is not configured'
        });
    }
    
    try {
        const { email, tags, merge_fields } = req.body;
        
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const subscriberHash = getMailchimpSubscriberHash(email);
        
        // First, try to update existing subscriber
        try {
            const updateData = {
                email_address: email,
                status: 'subscribed',
                merge_fields: merge_fields || {},
                tags: tags || []
            };

            const response = await mailchimpRequest(
                `/lists/${MAILCHIMP_LIST_ID}/members/${subscriberHash}`,
                'PUT',
                updateData
            );

            res.json({ success: true, message: 'Successfully subscribed', data: response });
        } catch (error) {
            // If subscriber doesn't exist, create new
            if (error.status === 404) {
                const createData = {
                    email_address: email,
                    status: 'subscribed',
                    merge_fields: merge_fields || {},
                    tags: tags || []
                };

                const response = await mailchimpRequest(
                    `/lists/${MAILCHIMP_LIST_ID}/members`,
                    'POST',
                    createData
                );

                res.json({ success: true, message: 'Successfully subscribed', data: response });
            } else {
                throw error;
            }
        }
    } catch (error) {
        console.error('Mailchimp subscription error:', error);
        res.status(500).json({ 
            error: 'Failed to subscribe', 
            message: error.detail || error.message || 'An error occurred'
        });
    }
});

// Mailchimp update tags endpoint
app.post('/api/mailchimp/update-tags', async (req, res) => {
    // Check if Mailchimp is configured
    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
        return res.status(503).json({ 
            error: 'Service unavailable',
            message: 'Newsletter service is not configured'
        });
    }
    
    try {
        const { email, tags, merge_fields } = req.body;
        
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const subscriberHash = getMailchimpSubscriberHash(email);
        
        // Update subscriber tags and merge fields
        const updateData = {
            merge_fields: merge_fields || {}
        };

        const response = await mailchimpRequest(
            `/lists/${MAILCHIMP_LIST_ID}/members/${subscriberHash}`,
            'PATCH',
            updateData
        );

        // Add tags if provided
        if (tags && tags.length > 0) {
            const tagData = {
                tags: tags.map(tag => ({ name: tag, status: 'active' }))
            };

            await mailchimpRequest(
                `/lists/${MAILCHIMP_LIST_ID}/members/${subscriberHash}/tags`,
                'POST',
                tagData
            );
        }

        res.json({ success: true, message: 'Tags updated successfully' });
    } catch (error) {
        console.error('Mailchimp update error:', error);
        res.status(500).json({ 
            error: 'Failed to update tags', 
            message: error.detail || error.message || 'An error occurred'
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
        version: '1.0.0',
        mailchimp: {
            configured: !!(MAILCHIMP_API_KEY && MAILCHIMP_LIST_ID),
            listId: MAILCHIMP_LIST_ID ? 'Set' : 'Not set',
            apiKey: MAILCHIMP_API_KEY ? 'Set' : 'Not set'
        }
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
    console.log(`📧 Mailchimp: ${MAILCHIMP_API_KEY && MAILCHIMP_LIST_ID ? '✅ Configured' : '❌ Not configured'}`);
    
    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
        console.log('💡 Set MAILCHIMP_API_KEY and MAILCHIMP_LIST_ID environment variables to enable newsletter features');
    }
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