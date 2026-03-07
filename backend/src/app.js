const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('express-async-errors'); // Helps with async error handling without try-catch everywhere

const app = express();

// Body parser
app.use(express.json());

// Security headers
app.use(helmet());

// Enable CORS
app.use(cors({
origin :"https://stayindiahp.netlify.app/",
    credentials:true;
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 100 // max 100 requests per windowMs
});
app.use('/api', limiter);

// Logging (development mostly, but useful in prod too)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Route Files
const authRouter = require('./routes/authRoutes');
const towerRouter = require('./routes/towerRoutes');
const flatRouter = require('./routes/flatRoutes');
const amenityRouter = require('./routes/amenityRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const uploadRouter = require('./routes/uploadRoutes');

// Mount routes
app.use('/api/auth', authRouter);
app.use('/api/towers', towerRouter);
app.use('/api/flats', flatRouter);
app.use('/api/amenities', amenityRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/upload', uploadRouter);

app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is healthy' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error'
    });
});

module.exports = app;
