#!/bin/bash

echo "🚀 Priyanka's AI Assistant Setup"
echo "================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env file with your actual credentials:"
    echo "   - DEEPSEEK_API_KEY: Get from https://platform.deepseek.com/"
    echo "   - MAIL_USER: Your Gmail address"
    echo "   - MAIL_PASS: Gmail app password (not regular password)"
    echo "   - MAIL_TO: shahasanepriyanka@gmail.com (or your preferred email)"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🔧 Testing setup..."
node server/test-setup.js

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your credentials"
echo "2. Run: npm run dev:full"
echo "3. Open http://localhost:5173 in your browser"
echo ""
echo "For more information, see README.md"