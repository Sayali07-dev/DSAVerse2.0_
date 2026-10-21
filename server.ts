import express, { type Request, type Response, type NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const startTime = Date.now();

  // Basic security and parsing middleware
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // Disable x-powered-by header
  app.disable('x-powered-by');

  // ─── Health Check Endpoint (For Cloud Run / Container Scaling) ─────────────
  app.get('/api/health', (_req: Request, res: Response) => {
    const memory = process.memoryUsage();
    res.status(200).json({
      status: 'healthy',
      service: 'DSAverse Application Server',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
      memory: {
        rssMb: Math.round(memory.rss / (1024 * 1024)),
        heapUsedMb: Math.round(memory.heapUsed / (1024 * 1024)),
        heapTotalMb: Math.round(memory.heapTotal / (1024 * 1024)),
      },
      env: process.env.NODE_ENV || 'development',
    });
  });

  // ─── AI DSA Assistant Endpoint (Server-Side Proxy) ──────────────────────────
  app.post('/api/ai/dsa-assistant', async (req: Request, res: Response) => {
    try {
      const { topic, problemTitle, question, userCode } = req.body;

      if (!question && !problemTitle && !topic) {
        return res.status(400).json({ error: 'Missing topic or query parameters.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        try {
          const ai = new GoogleGenAI();
          const prompt = `You are DSAverse AI, an expert C++ Data Structures & Algorithms mentor for engineering students.
Problem: ${problemTitle || 'DSA Concept'}
Topic: ${topic || 'General'}
Student's Query: ${question || 'Explain time complexity and best approach'}
${userCode ? `Student's C++ Code:\n\`\`\`cpp\n${userCode}\n\`\`\`` : ''}

Provide a concise, encouraging, and pedagogically clear response:
1. Core Intuition & Invariant
2. Optimal Time & Space Complexity
3. Step-by-step Dry Run Hint (without spoiling the full solution immediately)
4. Common Edge Cases (e.g., empty inputs, single element, negative numbers, integer overflow)`;

          const aiResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
          });

          return res.status(200).json({
            success: true,
            source: 'gemini',
            answer: aiResponse.text || 'Unable to generate analysis at this time.',
          });
        } catch (genAiErr) {
          console.warn('Gemini API call failed, falling back to heuristic response:', genAiErr);
        }
      }

      // Intelligent heuristic fallback when Gemini API key is absent or unreachable
      return res.status(200).json({
        success: true,
        source: 'heuristic',
        answer: `### Optimal Approach & Complexity for ${problemTitle || topic || 'DSA Problem'}:

1. **Intuition**: Break down the invariant. For searching/pointers, determine if monotonic order exists to reduce $O(N)$ scanning to $O(\\log N)$. For frequency or duplicates, utilize a hash table (\`std::unordered_map\`) for $O(1)$ amortized lookups.
2. **Complexity Target**:
   - **Time Complexity**: Optimal bound is typically $O(N \\log N)$ (sorting/divide-and-conquer) or $O(N)$ (two pointers/hash table/sliding window).
   - **Auxiliary Space**: Aim for $O(1)$ in-place pointer manipulation or $O(N)$ for explicit recursion call stacks / hash maps.
3. **Dry Run Tip**: Write down the variable states across the first 3 iterations with an edge case array like \`[1, 2, 2, 3]\` or single-element inputs.
4. **C++ Best Practice**: Pass vectors and structures by constant reference (\`const vector<int>& v\`) to avoid costly accidental $O(N)$ deep copies during recursion.`,
      });
    } catch (err: any) {
      console.error('Error in /api/ai/dsa-assistant:', err);
      return res.status(500).json({ error: 'Failed to process AI assistant request' });
    }
  });

  // ─── Inline PDF Serving Endpoint (For Chrome & Edge Native Display) ─────────
  app.get(['/assets/aistudio/:filename', '/pyqs/:filename'], (req: Request, res: Response, next: NextFunction) => {
    const filename = path.basename(req.params.filename);
    if (!filename.toLowerCase().endsWith('.pdf')) {
      return next();
    }

    const publicCandidate = path.join(__dirname, 'public', req.path);
    const distCandidate = path.join(__dirname, 'dist', req.path);
    const targetPath = fs.existsSync(publicCandidate) 
      ? publicCandidate 
      : fs.existsSync(distCandidate) 
        ? distCandidate 
        : null;

    if (targetPath) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      res.removeHeader('X-Frame-Options');
      return res.sendFile(targetPath);
    }
    next();
  });

  // ─── Static Files & SPA Middleware ──────────────────────────────────────────
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    // Serve static assets with aggressive caching for hashed files
    app.use(
      express.static(distPath, {
        maxAge: '1h',
        setHeaders: (res, filePath) => {
          if (filePath.includes('/assets/')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          }
        },
      })
    );

    // SPA fallback: index.html for all non-API paths
    app.get('*all', (req: Request, res: Response, next: NextFunction) => {
      if (req.path.startsWith('/api')) {
        return next();
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled server error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`DSAverse server running on http://0.0.0.0:${PORT} [${process.env.NODE_ENV || 'development'}]`);
  });

  // Graceful shutdown handling
  const shutdown = (signal: string) => {
    console.log(`Received ${signal}, gracefully shutting down DSAverse server...`);
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

startServer();
