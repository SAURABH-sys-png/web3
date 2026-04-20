# Jokechat - Deployment Guide

This guide covers deploying your Jokechat app to the web using GitHub and Vercel.

## Option 1: Deploy to Vercel (Recommended ⭐)

Vercel is the easiest way to deploy Next.js apps with zero configuration.

### Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Jokechat with Stream Chat"

# Add remote (replace USERNAME and REPO with your values)
git remote add origin https://github.com/USERNAME/REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Paste your GitHub repo URL: `https://github.com/USERNAME/REPO.git`
5. Click "Import"

### Step 3: Add Environment Variables

In Vercel dashboard, go to **Settings > Environment Variables** and add:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = pk_test_dm9jYWwtYWxpZW4tNDEuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY = sk_test_WRKaq9klMqAlEUJy9RlwD1APa57W1sp4zmeSz7c4py

NEXT_PUBLIC_STREAM_API_KEY = zpbb8bufn498
STREAM_SECRET_KEY = edqu4rqxqtpuu7jbm2gwuryej349bf8dka83sc65skkybhkhbakwscnz75f7tfzs
STREAM_APP_ID = 1587329
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete (usually 2-5 minutes)
3. Get your live URL!

### Step 5: Update Clerk Configuration

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your app
3. Go to **Settings > Domains**
4. Add your Vercel domain:
   - If your site is `https://jokechat.vercel.app`, add that domain
   - Also set redirect URLs for OAuth

### Important: Update URLs in Clerk

In Clerk Dashboard > Settings:
- **Allowed Origins**: Add your Vercel URL and `http://localhost:3000`
- **Redirect URLs**: Update to your Vercel domain

## Option 2: Deploy to Netlify

### Step 1: Connect GitHub to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub account
4. Select your jokechat repository

### Step 2: Configure Build Settings

- **Build command**: `npm run build`
- **Publish directory**: `.next`

### Step 3: Add Environment Variables

In Netlify dashboard, go to **Site Settings > Build & Deploy > Environment** and add all the `.env` variables

### Step 4: Deploy

Click "Deploy site" - Netlify will automatically build and deploy!

## Option 3: Deploy to GitHub Pages (Static Only)

⚠️ **Note**: GitHub Pages requires exporting as static. For a dynamic app with Stream Chat, use Vercel or Netlify instead.

## Automated Deployments

Once deployed on Vercel/Netlify, every push to `main` branch automatically redeploys!

### GitHub Actions Workflow

The `.github/workflows/deploy.yml` file is already configured for Vercel deployment.

To use it:

1. Get your Vercel tokens:
   ```bash
   npm i -g vercel
   vercel login
   vercel link  # Links your project
   ```

2. Add GitHub Secrets:
   - Go to GitHub repo > Settings > Secrets and Variables > Actions
   - Add: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

3. On next push, GitHub Actions will automatically deploy!

## Post-Deployment Checklist

- [ ] Test signing in with Clerk
- [ ] Test chat functionality
- [ ] Verify messages send without duplicates
- [ ] Test on mobile
- [ ] Check console for errors (F12)
- [ ] Test creating new chats
- [ ] Verify real-time updates work

## Troubleshooting

### "Failed to connect to Stream Chat"
- Check API keys are correct in Vercel environment variables
- Verify `STREAM_SECRET_KEY` is exact match

### "Clerk authentication not working"
- Update Clerk redirect URLs to your domain
- Clear browser cookies and try again
- Check Clerk dashboard for errors

### "Messages not sending"
- Open browser DevTools (F12) and check Console tab
- Look for Stream Chat connection errors
- Verify user is authenticated with Clerk

### "Builds failing"
- Check build logs in Vercel/Netlify dashboard
- Ensure all dependencies in package.json are correct
- Run `npm install` locally and test `npm run build`

## Custom Domain (Optional)

### On Vercel
1. Go to Vercel dashboard
2. Project > Settings > Domains
3. Add your custom domain
4. Follow DNS configuration instructions

### On Netlify
1. Go to Netlify dashboard
2. Site Settings > Domain Management
3. Add custom domain
4. Follow DNS setup

## Monitoring

Both Vercel and Netlify provide:
- Real-time logs
- Build history
- Performance metrics
- Error tracking

## Database (Future)

When you add a database (for storing user profiles, etc.):
- Consider MongoDB Atlas, Supabase, or Firebase
- Add connection strings to environment variables
- Create API routes for database operations

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Update Clerk configuration
3. ✅ Test all features
4. Consider adding:
   - User profiles/avatars
   - Message reactions
   - File uploads
   - Voice/video calls
   - Push notifications

## Support Resources

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Clerk Docs](https://clerk.com/docs)
- [Stream Chat Docs](https://getstream.io/chat/docs/)
