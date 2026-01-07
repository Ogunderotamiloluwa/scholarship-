#!/bin/bash
# This file shows the exact commands to set up and run the entire system

echo "🚀 BEACON SCHOLARSHIP PORTAL - SETUP GUIDE"
echo "=========================================="
echo ""

# Check if backend packages are installed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    echo "✅ Backend dependencies installed"
fi

# Check if frontend packages are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
    echo "✅ Frontend dependencies installed"
fi

echo ""
echo "🎯 YOUR SYSTEM IS READY!"
echo ""
echo "Start your development environment:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "Terminal 2 - Frontend:"
echo "  npm run dev"
echo ""
echo "📧 Email Configuration:"
echo "  Service: Brevo"
echo "  Email: ogunderotamiloluwa@gmail.com"
echo "  API Key: [Configured in backend/.env]"
echo ""
echo "🌐 URLs:"
echo "  Backend:  http://localhost:5000"
echo "  Frontend: http://localhost:5173"
echo "  API Base: http://localhost:5000/api"
echo ""
echo "✅ Health Check:"
echo "  curl http://localhost:5000/api/health"
echo ""
echo "📝 Documentation:"
echo "  - QUICK_REFERENCE.md       (Quick lookup)"
echo "  - BACKEND_SETUP_GUIDE.md   (Detailed setup)"
echo "  - INTEGRATION_EXAMPLES.md  (Code examples)"
echo "  - FILE_TREE.md             (File structure)"
echo ""
echo "🎓 Grant Form Endpoint:       POST /api/forms/grant"
echo "📚 Scholarship Form Endpoint: POST /api/forms/scholarship"
echo "💝 Donation Form Endpoint:    POST /api/forms/donation"
echo ""
echo "=========================================="
echo "Happy coding! 🎉"
