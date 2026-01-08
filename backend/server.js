import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables FIRST before anything else
dotenv.config({ path: path.join(__dirname, '.env') });

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import grantRoutes from './routes/grantRoutes.js';
import scholarshipRoutes from './routes/scholarshipRoutes.js';
import donationRoutes from './routes/donationRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 10 // Max 10 files
  },
  fileFilter: (req, file, cb) => {
    // Allow common document formats
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/jpeg',
      'image/png'
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type not allowed: ${file.mimetype}`));
    }
  }
});

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost for development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // Allow the Render production URL
    if (origin.includes('beacon-backend-2udx.onrender.com')) {
      return callback(null, true);
    }
    
    // Allow any origin specified in environment variable
    if (process.env.CORS_ORIGIN && origin === process.env.CORS_ORIGIN) {
      return callback(null, true);
    }
    
    // For development, allow all origins
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging middleware - log ALL incoming requests
app.use((req, res, next) => {
  console.log(`\n📍 ${req.method} ${req.path}`);
  console.log(`🔗 Origin: ${req.get('origin') || 'no origin header'}`);
  if (req.method === 'POST' && req.path.includes('/api/forms')) {
    console.log(`📦 Content-Type: ${req.get('content-type')}`);
  }
  next();
});

// Serve static files from frontend build (production)
app.use(express.static(path.join(__dirname, 'public', 'build')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Backend is running successfully!',
    brevo_key_set: !!process.env.BREVO_API_KEY,
    company_email: process.env.COMPANY_EMAIL,
    node_env: process.env.NODE_ENV
  });
});

// Debug endpoint to test Brevo API
app.post('/api/test-email', async (req, res) => {
  try {
    console.log('\n🧪 TESTING BREVO API CONNECTION');
    console.log('📧 BREVO_API_KEY set:', !!process.env.BREVO_API_KEY);
    console.log('📧 COMPANY_EMAIL:', process.env.COMPANY_EMAIL);
    
    const axios = (await import('axios')).default;
    
    const testResponse = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        to: [{ email: process.env.COMPANY_EMAIL }],
        sender: {
          name: 'Beacon Test',
          email: process.env.COMPANY_EMAIL
        },
        subject: '🧪 Test Email from Beacon Backend',
        textContent: 'This is a test email to verify Brevo API is working correctly.'
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('✅ Brevo API test successful!');
    console.log('Message ID:', testResponse.data.messageId);
    
    res.json({
      success: true,
      message: 'Test email sent successfully',
      messageId: testResponse.data.messageId,
      email: process.env.COMPANY_EMAIL
    });
  } catch (error) {
    console.error('❌ Brevo API test failed:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: 'Brevo API test failed',
      details: error.response?.data || error.message
    });
  }
});

// Routes with file upload middleware
app.use('/api/forms', upload.array('files', 10), grantRoutes);
app.use('/api/forms', upload.array('files', 10), scholarshipRoutes);
app.use('/api/forms', upload.array('files', 10), donationRoutes);

// Serve frontend for all non-API routes (SPA routing)
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'build', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).json({ error: 'Frontend files not found. Please build and copy frontend files to public/build' });
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
  console.log(`📧 Emails will be sent to: ${process.env.COMPANY_EMAIL}`);
  console.log(`🌐 Frontend files served from: ${path.join(__dirname, 'public', 'build')}`);
});
