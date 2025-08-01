# ✅ SplitMate Vercel Deployment Checklist

## Pre-Deployment Setup

### 1. Database Setup (MongoDB Atlas)

- [ ] Create MongoDB Atlas account
- [ ] Create new project "SplitMate"
- [ ] Create free cluster (M0)
- [ ] Create database user with read/write permissions
- [ ] Allow network access from anywhere (0.0.0.0/0)
- [ ] Get connection string and save it

### 2. Code Preparation

- [ ] ✅ `vercel.json` created
- [ ] ✅ `backend/package.json` updated with build script
- [ ] ✅ `frontend/package.json` proxy removed
- [ ] ✅ `frontend/src/services/api.js` uses environment variable
- [ ] ✅ `backend/server.js` CORS updated for Vercel
- [ ] ✅ All changes committed to Git

### 3. Environment Variables Ready

- [ ] MongoDB connection string
- [ ] JWT secret (strong password)
- [ ] Frontend URL (will be your Vercel domain)

---

## Deployment Steps

### 1. Vercel Setup

- [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Click "New Project"
- [ ] Import your GitHub repository
- [ ] Configure project settings:
  - Project Name: `splitmate`
  - Framework Preset: Other
  - Root Directory: `./`
  - Build Command: (leave empty)
  - Output Directory: (leave empty)

### 2. Environment Variables

Set these in Vercel dashboard:

#### Backend Variables:

- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `3000`
- [ ] `MONGODB_URI` = `mongodb+srv://...`
- [ ] `JWT_SECRET` = `your-secret-key`
- [ ] `JWT_EXPIRE` = `7d`
- [ ] `FRONTEND_URL` = `https://your-app-name.vercel.app`

#### Frontend Variables:

- [ ] `REACT_APP_API_URL` = `https://your-app-name.vercel.app/api`

### 3. Deploy

- [ ] Click "Deploy"
- [ ] Wait for build to complete (5-10 minutes)
- [ ] Note your deployment URL

---

## Post-Deployment Testing

### 1. Basic Functionality

- [ ] Visit your deployed URL
- [ ] Test signup functionality
- [ ] Test login functionality
- [ ] Check if database connection works

### 2. Core Features

- [ ] Create a group
- [ ] Add members to group
- [ ] Create an expense
- [ ] Test expense splitting
- [ ] Check balance calculations

### 3. Error Handling

- [ ] Check Vercel Function Logs
- [ ] Monitor MongoDB Atlas connections
- [ ] Test error scenarios

---

## Troubleshooting

### Common Issues:

- [ ] CORS errors → Check environment variables
- [ ] Database connection → Verify MongoDB Atlas settings
- [ ] Build failures → Check `vercel.json` configuration
- [ ] API routes not working → Verify route configuration

### Debug Commands:

```bash
# Check Vercel logs
vercel logs

# Redeploy with debug
vercel --debug

# Check environment variables
vercel env ls
```

---

## Security Checklist

### Environment Variables

- [ ] No `.env` files committed to Git
- [ ] Strong JWT secret used
- [ ] Database password is secure

### Database Security

- [ ] MongoDB Atlas security features enabled
- [ ] Strong database user password
- [ ] Network access properly configured

### API Security

- [ ] Rate limiting enabled
- [ ] Input validation working
- [ ] HTTPS enforced in production

---

## Performance Optimization

### Monitoring

- [ ] Set up Vercel Analytics (optional)
- [ ] Monitor function execution times
- [ ] Check database query performance

### Optimization

- [ ] Optimize images and assets
- [ ] Implement caching where needed
- [ ] Monitor bandwidth usage

---

## Next Steps (Optional)

### Advanced Features

- [ ] Set up custom domain
- [ ] Configure automatic deployments
- [ ] Add error tracking (Sentry)
- [ ] Set up monitoring (LogRocket)

### Maintenance

- [ ] Set up database backups
- [ ] Monitor usage limits
- [ ] Plan for scaling

---

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)

---

## Success Criteria

Your deployment is successful when:

- ✅ App loads without errors
- ✅ Users can sign up and log in
- ✅ Groups and expenses can be created
- ✅ Database connections work properly
- ✅ No CORS errors in browser console
- ✅ All API endpoints respond correctly

🎉 **Congratulations! Your SplitMate app is now live!** 🎉
