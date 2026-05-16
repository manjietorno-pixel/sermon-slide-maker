#!/bin/bash

echo "🚀 Sermon Slide Maker - Mac Setup"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Installing..."
    # Check if Homebrew is installed
    if ! command -v brew &> /dev/null; then
        echo "Installing Homebrew first..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    brew install node
    echo "✓ Node.js installed"
else
    echo "✓ Node.js found: $(node --version)"
fi

echo ""
echo "Installing dependencies..."
npm install

echo ""
echo "✓ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Create a GitHub repository with your project files"
echo "2. Or run: vercel" 
echo "3. Follow the prompts to deploy"
echo ""
echo "To test locally:"
echo "  vercel dev"
echo ""
