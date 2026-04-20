# Quick Railway Deployment

## 🚀 One-Click Deploy to Railway

**Time needed**: 5 minutes ⏱️

### Prerequisites
- GitHub account (already have it!)
- Railway account (free at railway.app)
- Your 5 environment variables

### Step-by-Step

#### 1. Create Railway Account
- Go to https://railway.app
- Sign up with GitHub (1 click!)

#### 2. Create New Project
- Click "New Project"
- Select "Deploy from GitHub repo"
- Authorize Railway to access your GitHub
- Find and select `jokechat` repository

#### 3. Configure Build
- Railway auto-detects Next.js ✅
- Click "Deploy"
- Wait 2-3 minutes for build to complete

#### 4. Add Environment Variables
Once deployed:
- Click your project
- Go to **Deployments** tab
- Click the active deployment (green checkmark)
- Click **Variables** tab
- Click "New Variable" for EACH of these:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
pk_test_dm9jYWwtYWxpZW4tNDEuY2xlcmsuYWNjb3VudHMuZGV2JA
```

```
CLERK_SECRET_KEY
sk_test_WRKaq9klMqAlEUJy9RlwD1APa57W1sp4zmeSz7c4py
```

```
NEXT_PUBLIC_STREAM_API_KEY
zpbb8bufn498
```

```
STREAM_SECRET_KEY
edqu4rqxqtpuu7jbm2gwuryej349bf8dka83sc65skkybhkhbakwscnz75f7tfzs
```

```
STREAM_APP_ID
1587329
```

#### 5. Redeploy with Variables
- After adding all variables
- Click "Redeploy" button
- Wait 1-2 minutes

#### 6. Get Live URL
- In Railway dashboard
- Look for **Domain** section
- Click the URL - that's your live site! 🎉

#### 7. Update Clerk Settings
- Go to https://dashboard.clerk.com
- Select your app
- Settings > Domains > Add Domain
- Paste your Railway domain (e.g., `jokechat-production.up.railway.app`)
- Save

### Test Your App
1. Open your Railway domain URL
2. Sign up / Sign in with Clerk
3. Go to Chats page (`/userchat`)
4. Browse Contacts (`/contacts`)
5. Send a message!

### That's It! 🎊

Your app is now live and can be tested!

## Updating Your App

To make changes and redeploy:

```bash
# Make changes locally
git add .
git commit -m "Your change"
git push origin main
```

Railway automatically detects changes and redeploys! 🔄

## Free Tier Limits

Railway free tier includes:
- ✅ 5GB storage
- ✅ 100GB/month bandwidth
- ✅ $5/month free credit
- ✅ Custom domain support

For a chat app prototype, this is plenty!

## Troubleshooting

### "Build failed"
- Check build logs in Railway
- Ensure `npm run build` works locally: `npm run build`
- Verify all environment variables are added

### "App runs but no messages appear"
- Check browser console (F12)
- Verify environment variables are correct
- Check Clerk is configured for Railway domain

### "Clerk auth not working"
- Update Clerk > Settings > Domains
- Add your Railway domain
- Clear browser cookies and try again

## Next Steps

- ✅ Test the app
- ✅ Try sending messages
- ✅ Test with friends (send them the link!)
- ✅ Once verified, deploy to production (Vercel)

## Alternative Free Hosting

If Railway doesn't work, try:
- **Render.com** - Very similar to Railway
- **Koyeb** - Also free tier
- **Heroku** - Classic choice (now paid but some free alternatives)

All work great with Next.js + GitHub!

---

Need help? Check [DEPLOYMENT.md](./DEPLOYMENT.md) for more details.
