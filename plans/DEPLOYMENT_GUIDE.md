# CareerForge Deployment Guide

## 🚀 Quick Deployment Setup

This guide will help you deploy CareerForge with Frontend on Vercel and Backend + AI services on Render.

---

## 📋 Prerequisites

1. **Vercel Account** - for frontend hosting
2. **Render Account** - for backend and AI service hosting  
3. **Database** - PostgreSQL database (Supabase, Railway, or PlanetScale)
4. **Hugging Face Account** - for AI model access

---

## 🔧 Step 1: Database Setup

### Option A: Supabase (Recommended)
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database → copy connection string
4. Save the connection string (DATABASE_URL)

### Option B: Railway
1. Create account at [railway.app](https://railway.app)
2. Create new PostgreSQL service
3. Copy connection string from variables tab

### Option C: PlanetScale
1. Create account at [planetscale.com](https://planetscale.com)
2. Create new database
3. Get connection string from dashboard

---

## 🤖 Step 2: Hugging Face Setup

1. Create account at [huggingface.co](https://huggingface.co)
2. Go to Settings → Access Tokens
3. Create new token with "Read" permissions
4. Copy the token (starts with `hf_`)

---

## 🏗️ Step 3: Backend Deployment (Render)

### 3.1 Prepare Repository
1. Push your code to GitHub
2. Make sure all environment variables are removed from code (we fixed this)

### 3.2 Deploy to Render
1. Go to [render.com](https://render.com) and create account
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure service:
   - **Name**: `careerforge-backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### 3.3 Set Environment Variables in Render
In Render dashboard, go to Environment tab and add:

```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://username:password@host:port/database_name
JWT_SECRET=your-32-character-secret-minimum
JWT_REFRESH_SECRET=your-32-character-refresh-secret-minimum
JWT_RESET_SECRET=your-32-character-reset-secret-minimum
ENCRYPTION_KEY=64-character-hex-key
FRONTEND_URL=https://career-forge-rho.vercel.app/
AI_SERVICE_URL=https://careerforge-ai-w3o4.onrender.com
# Optional: set a writable uploads directory. If not provided, the app uses the system temp directory:
UPLOAD_DIR=/tmp/uploads/resumes
``` 

**Note:** Render may default to Node 18; we recommend using Node 20+. Set Node 20 in Render service settings or ensure `package.json` has `"engines": {"node": ">=20.0.0"}` to enforce it during builds.

**Generate secrets:**
```bash
# Generate JWT secrets
openssl rand -hex 32

# Generate encryption key
openssl rand -hex 32
```

### 3.4 Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Copy the service URL (e.g., `https://careerforge-backend.onrender.com`)

---

## 🧠 Step 4: AI Services Deployment (Render)

### 4.1 Deploy to Render
1. In Render dashboard, click "New" → "Web Service"
2. Connect the same repository
3. Configure service:
   - **Name**: `careerforge-ai`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`

### 4.2 Set Environment Variables in Render
```bash
NODE_ENV=production
PORT=8000
DATABASE_URL=postgresql://username:password@host:port/database_name
HF_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MODEL_CACHE_DIR=/app/models
LOG_LEVEL=info
```

### 4.3 Deploy
1. Click "Create Web Service"
2. Wait for deployment (10-15 minutes first time due to model downloads)
3. Copy the service URL (e.g., `https://careerforge-ai.onrender.com`)

### 4.4 Update Backend Environment Variable
1. Go back to Render backend service
2. Update `AI_SERVICE_URL` to the AI service URL
3. Redeploy backend

---

## 🌐 Step 5: Frontend Deployment (Vercel)

### 5.1 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and create account
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 5.2 Set Environment Variables in Vercel
In Vercel dashboard, go to Settings → Environment Variables:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-domain.onrender.com
```

### 5.3 Deploy
1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Copy the frontend URL (e.g., `https://careerforge-abc123.vercel.app`)

### 5.4 Update Backend Environment Variable
1. Go back to Render backend service
2. Update `FRONTEND_URL` to the Vercel frontend URL
3. Redeploy backend

---

## 🔗 Step 6: Final Integration Test

### 6.1 Update AI Service CORS
1. Edit `ai/app.py`
2. Update the `allow_origins` list with your Vercel domain:
```python
allow_origins=[
    "http://localhost:3000",  # Development
    "https://your-frontend-domain.vercel.app",  # Your Vercel domain
]
```
3. Redeploy AI service

### 6.2 Test the Integration
1. Visit your frontend URL
2. Check browser console for CORS errors
3. Test key features:
   - User registration/login
   - Resume upload
   - AI features
   - Job matching

### 6.3 Verify API Documentation
1. **Access Swagger UI**: `https://your-backend.onrender.com/api-docs`
2. **Verify Server URL**: Should show your actual Render URL (not localhost)
3. **Test Health Endpoint**: Click on the health check endpoint and try it
4. **Test Authentication**: Try the auth endpoints to ensure they work
5. **Check CORS**: Verify API calls work from your frontend domain

### 6.4 Performance Verification
1. **Response Times**: Monitor API response times
2. **Error Rates**: Check for 4xx/5xx errors
3. **AI Service Integration**: Test AI endpoints
4. **Database Operations**: Verify CRUD operations work

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. "AI_SERVICE_URL environment variable is required"
**Solution**: Make sure you've set the AI service URL in backend environment variables

#### 2. "Cannot connect to AI service"
**Solution**: 
- Check AI service is deployed and running
- Verify the URL in backend environment variables
- Check AI service logs in Render dashboard

#### 3. CORS errors in browser
**Solution**:
- Update CORS origins in `ai/app.py`
- Make sure `FRONTEND_URL` is set correctly in backend
- Redeploy services after changes

#### 4. Database connection errors
**Solution**:
- Verify `DATABASE_URL` is correct
- Check database provider is accessible
- Ensure database exists and is running

#### 5. "HF_API_KEY" errors
**Solution**:
- Set `HF_API_KEY` in AI service environment variables
- Verify token is valid and has correct permissions
- Check Hugging Face account has sufficient credits

#### 6. Swagger UI shows localhost instead of production URL
**Solution**:
- Ensure `NODE_ENV=production` is set in Render environment variables
- Redeploy backend service after changing environment variables
- Clear browser cache and try accessing `/api-docs` again
- Verify the Render service URL is correct

#### 7. API documentation not accessible
**Solution**:
- Check backend service is running: `https://your-backend.onrender.com/health`
- Verify `/api-docs` endpoint is not blocked by CORS
- Check Render logs for any startup errors
- Ensure Swagger middleware is properly configured

---

## 📊 Monitoring and Maintenance

### Health Check URLs
- **Backend**: `https://your-backend.onrender.com/health`
- **AI Service**: `https://your-ai-service.onrender.com/health`

### API Documentation
- **Interactive Swagger UI**: `https://your-backend.onrender.com/api-docs`
- **OpenAPI JSON**: `https://your-backend.onrender.com/api-docs-json`
- **Local Development**: `http://localhost:5000/api-docs`

> **Note**: The Swagger UI automatically detects the environment and displays the appropriate server URL. In development, it shows `localhost:5000`, and in production on Render, it shows the actual deployment URL.

### Logs
- **Render**: Check service logs in dashboard
- **Vercel**: Check function logs in dashboard
- **Database**: Check provider dashboard for connection issues

### Performance Monitoring
1. Set up uptime monitoring (UptimeRobot, Pingdom)
2. Monitor response times
3. Set up error alerting
4. Track database performance

---

## 🆘 Emergency Procedures

### Service Down
1. Check service status in Render dashboard
2. Review recent deployments
3. Check environment variables
4. Review application logs

### Database Issues
1. Check database provider status
2. Verify connection string
3. Test database connectivity
4. Check for database maintenance

### AI Service Issues
1. Check Hugging Face API status
2. Verify HF_API_KEY is valid
3. Check model download status
4. Review AI service logs

---

## 📝 Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://...
JWT_SECRET=...
JWT_REFRESH_SECRET=...
JWT_RESET_SECRET=...
ENCRYPTION_KEY=...
FRONTEND_URL=https://your-frontend.vercel.app
AI_SERVICE_URL=https://your-ai.onrender.com
```

### AI Services (Render)
```
NODE_ENV=production
PORT=8000
DATABASE_URL=postgresql://...
HF_API_KEY=hf_...
MODEL_CACHE_DIR=/app/models
LOG_LEVEL=info
```

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

---

## 🎯 Success Criteria

✅ **All services deployed and accessible**  
✅ **Environment variables configured**  
✅ **CORS working correctly**  
✅ **Database connections established**  
✅ **AI service responding**  
✅ **Frontend can communicate with backend**  
✅ **Health checks returning 200 OK**

---

**Deployment completed successfully when all services are healthy and functional!**