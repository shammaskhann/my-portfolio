# GitHub Pages Auto-Deployment Setup Guide

## 📋 Prerequisites
- Git repository initialized
- GitHub account with the portfolio repository
- Node.js 18+ installed locally

## 🚀 Setup Instructions

### Step 1: Prepare Your Repository

Make sure your repository is properly set up:

```bash
cd /Users/macbook/Projects/my-portfolio
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
git branch -M main
git push -u origin main
```

### Step 2: Update Vite Configuration

The `vite.config.js` already has been updated with the base path. Ensure it matches your repository name:

```javascript
base: '/my-portfolio/', // Change 'my-portfolio' to your actual repo name if different
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Select **Source: GitHub Actions**
   - Save

### Step 4: Configure Environment Variables (if needed)

If you have environment variables, create a GitHub Secret:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add your EmailJS credentials:
   - Name: `VITE_EMAILJS_SERVICE_ID`
   - Value: (your service ID)
   - Repeat for: `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`

Then update `.github/workflows/deploy.yml` to use them:

```yaml
- name: Build project
  env:
    VITE_EMAILJS_SERVICE_ID: ${{ secrets.VITE_EMAILJS_SERVICE_ID }}
    VITE_EMAILJS_TEMPLATE_ID: ${{ secrets.VITE_EMAILJS_TEMPLATE_ID }}
    VITE_EMAILJS_PUBLIC_KEY: ${{ secrets.VITE_EMAILJS_PUBLIC_KEY }}
  run: npm run build
```

### Step 5: Automatic Deployment

The workflow will automatically deploy when you:

```bash
# Make changes to your code
git add .
git commit -m "Update portfolio"
git push origin main
```

The GitHub Actions workflow will:
1. ✅ Build your project
2. ✅ Generate optimized `dist` folder
3. ✅ Deploy to GitHub Pages

Your portfolio will be live at: `https://YOUR_USERNAME.github.io/my-portfolio/`

### Step 6: Manual Deployment (Local)

If you want to deploy locally using `gh-pages`:

```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

## 📊 Workflow Details

The workflow file (`.github/workflows/deploy.yml`) does:

- **Triggers on**: Pushes to `main` branch or manual trigger
- **Installs**: Node.js 20 with npm cache
- **Builds**: Runs `npm run build` to generate `dist` folder
- **Deploys**: Uploads to GitHub Pages automatically

## 🔍 Check Deployment Status

1. Go to your repository on GitHub
2. Click **Actions** tab
3. See the workflow run status
4. Once ✅ Complete, your site is live

## 🐛 Troubleshooting

### Build fails?
- Check error logs in Actions tab
- Ensure all dependencies are installed: `npm install`
- Verify environment variables are set

### Site shows 404?
- Check that `base` in `vite.config.js` matches your repo name
- Ensure GitHub Pages is enabled and set to "GitHub Actions"

### Environment variables not working?
- Add them as GitHub Secrets (see Step 4)
- Update the deploy.yml to use `${{ secrets.VAR_NAME }}`

## 📝 Summary

Your portfolio now has:
- ✅ Automatic deployment on every push to `main`
- ✅ GitHub Actions workflow configured
- ✅ Optimized production build
- ✅ Live at GitHub Pages URL

Just push your code and it deploys automatically! 🎉
