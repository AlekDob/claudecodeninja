# Deployment Guide

## 🚀 Vercel Deployment

### Prerequisites
- GitHub repository connected
- Vercel account linked

### Build Settings
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node Version: 18.x
```

### Environment Variables (Future)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Custom Domain (Planned)
- **Primary**: claudecodeninja.it
- **Alternative**: claudecode.ninja

### Deployment Commands
```bash
# Manual deploy
cd /Users/alekdob/Desktop/Dev/Personal/claudecodeninja
vercel --prod

# Check deployment
vercel ls

# View logs
vercel logs
```

## 📊 Performance Optimization

### Vite Build Optimizations
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          markdown: ['react-markdown', 'remark-gfm'],
        },
      },
    },
  },
});
```

### Image Optimization
- Use WebP format for badges
- Lazy load milestone images
- Implement responsive images

### Code Splitting
- Route-based splitting (already done with React Router)
- Component lazy loading for heavy features

## 🔒 Security

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

### HTTPS Only
- Force HTTPS in production
- Vercel handles SSL certificates automatically

## 📈 Analytics (Future)

### Recommended Tools
- **PostHog**: Open-source, privacy-friendly
- **Plausible**: Simple, GDPR compliant
- **Google Analytics**: Industry standard (if needed)

### Events to Track
- Milestone completion
- Badge unlocking
- Quiz completion
- Certificate generation
- User registration (when auth is added)
