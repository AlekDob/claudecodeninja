import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-routes',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url?.startsWith('/api/')) {
            try {
              // Import and run the Vercel serverless function
              const handler = await import('./api/contact.ts');
              await handler.default(req as any, res as any);
            } catch (error) {
              console.error('API Error:', error);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Internal server error' }));
            }
          } else {
            next();
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
})
