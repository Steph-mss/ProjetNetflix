const rateLimit = require('express-rate-limit');

const globalRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: 'Too many requests from this IP, please try again after a minute',
});

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 requests per 15 minutes
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
});

module.exports = { globalRateLimiter, loginRateLimiter };
