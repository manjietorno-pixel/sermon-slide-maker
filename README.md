# Sermon Slide Maker - Vercel Deployment Guide (Mac)

A professional church sermon presentation generator for pastors. Creates beautiful PPTX presentations with zero network restrictions.

---

## **Quick Start (5 minutes)**

### **Step 1: Install Node.js (Mac)**

```bash
# Option A: Using Homebrew (recommended)
brew install node

# Verify installation
node --version
npm --version
```

If you don't have Homebrew, install it first:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

---

### **Step 2: Create Vercel Account**

1. Go to **https://vercel.com**
2. Click **Sign up**
3. Choose **Sign up with GitHub** (easiest)
   - If you don't have GitHub, create one first at https://github.com
4. Authorize Vercel

---

### **Step 3: Prepare Project on Your Mac**

```bash
# Create a folder for the project
mkdir sermon-slide-maker
cd sermon-slide-maker

# Download these files into this folder:
# - package.json
# - vercel.json
# - .gitignore
# - public/index.html
# - api/generate-pptx.js

# Create folder structure
mkdir -p public api

# Copy files into correct locations
# (You'll do this after downloading)
```

---

### **Step 4: Deploy to Vercel (Option A - Recommended)**

**Using Vercel CLI (easiest for Mac):**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd /path/to/sermon-slide-maker
vercel

# Follow the prompts:
# - Choose "y" for all questions
# - Your URL will be displayed at the end
```

**Using GitHub + Vercel Web (alternative):**

1. Create a GitHub repository with your project files
2. Go to https://vercel.com/import
3. Select your GitHub repository
4. Click "Deploy"
5. Get your live URL

---

### **Step 5: Share with Pastors**

Once deployed, you'll get a URL like:
```
https://sermon-slide-maker.vercel.app
```

Share this URL with pastors. They can:
1. Open the link in any browser
2. Fill in sermon details
3. Add slides (content, scripture, points, etc.)
4. Click "Generate PPTX"
5. Download PowerPoint presentation

---

## **File Structure**

```
sermon-slide-maker/
├── package.json           ← Dependencies
├── vercel.json           ← Vercel config
├── .gitignore            ← Git ignore
├── public/
│   └── index.html        ← The wizard app (served to browsers)
└── api/
    └── generate-pptx.js  ← Backend (generates PPTX on server)
```

---

## **How It Works**

1. **Frontend** (public/index.html): Pastors use the wizard to create slides
2. **Backend** (api/generate-pptx.js): Server generates professional PPTX
3. **Download**: Pastors get the finished PowerPoint file

**No network restrictions** - works everywhere! ✓

---

## **Troubleshooting (Mac)**

### **"vercel command not found"**
```bash
npm install -g vercel
```

### **"npm: command not found"**
→ Install Node.js (see Step 1 above)

### **Port already in use (local testing)**
```bash
vercel dev --listen 3001
```

### **Can't log in to Vercel**
```bash
vercel logout
vercel login
```

### **Need to update after making changes**
```bash
cd /path/to/sermon-slide-maker
vercel --prod
```

---

## **Local Testing (Optional)**

To test before deploying:

```bash
# Install dependencies
npm install

# Start local development server
vercel dev

# Open http://localhost:3000 in browser
# Test the app locally
```

---

## **Features**

✓ **Wizard-style interface** - Step-by-step for non-technical users  
✓ **Multiple slide types** - Scripture, points, sections, quotes  
✓ **Bilingual support** - NKJV English + ASND Filipino  
✓ **Professional design** - Navy, gold, white church aesthetic  
✓ **No setup needed** - Pastors just open the URL  
✓ **Works offline** - PPTX generated server-side  
✓ **Free hosting** - Vercel includes free tier  

---

## **Need Help?**

1. Check Vercel docs: https://vercel.com/docs
2. Check Node.js docs: https://nodejs.org/en/docs/
3. Email support through Vercel dashboard

---

**Happy sermon slide making!** 🎉
