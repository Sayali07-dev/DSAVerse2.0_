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

<<<<<<< HEAD
=======
  // ─── Community Comments Backend Endpoints ─────────────────────────────────
  const COMMENTS_FILE = path.join(__dirname, 'data', 'community_comments.json');

  const readCommentsFromDisk = (): any[] => {
    try {
      if (fs.existsSync(COMMENTS_FILE)) {
        const raw = fs.readFileSync(COMMENTS_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error('Error reading comments file from disk:', e);
    }
    return [];
  };

  const writeCommentsToDisk = (comments: any[]): boolean => {
    try {
      const dir = path.dirname(COMMENTS_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.error('Error writing comments file to disk:', e);
      return false;
    }
  };

  // Get all comments or filter by postId
  app.get('/api/community/comments', (req: Request, res: Response) => {
    const { postId } = req.query;
    const comments = readCommentsFromDisk();
    if (postId && typeof postId === 'string') {
      const filtered = comments.filter((c: any) => c.postId === postId);
      return res.status(200).json({ success: true, comments: filtered, count: filtered.length });
    }
    return res.status(200).json({ success: true, comments, count: comments.length });
  });

  // Create a new comment and save to backend
  app.post('/api/community/comments', (req: Request, res: Response) => {
    try {
      const { postId, content, author, authorRole, authorAvatar } = req.body;
      if (!postId || !content || !content.trim()) {
        return res.status(400).json({ success: false, error: 'Post ID and comment content are required.' });
      }

      const comments = readCommentsFromDisk();
      const newComment = {
        id: `comment-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        postId,
        author: (author || 'Engineering Student').trim(),
        authorRole: (authorRole || 'PICT Student').trim(),
        authorAvatar: authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        content: content.trim(),
        createdAt: new Date().toISOString(),
        timeAgo: 'Just now',
        likes: 0,
      };

      comments.push(newComment);
      const saved = writeCommentsToDisk(comments);
      if (!saved) {
        return res.status(500).json({ success: false, error: 'Failed to write comment to backend storage.' });
      }

      const postCommentsCount = comments.filter((c: any) => c.postId === postId).length;

      return res.status(201).json({
        success: true,
        message: 'Comment successfully saved to backend',
        comment: newComment,
        commentsCount: postCommentsCount,
      });
    } catch (err: any) {
      console.error('Error saving community comment:', err);
      return res.status(500).json({ success: false, error: 'Internal server error while saving comment.' });
    }
  });

  // Like a comment
  app.post('/api/community/comments/:id/like', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const comments = readCommentsFromDisk();
      const commentIndex = comments.findIndex((c: any) => c.id === id);
      if (commentIndex === -1) {
        return res.status(404).json({ success: false, error: 'Comment not found' });
      }
      comments[commentIndex].likes = (comments[commentIndex].likes || 0) + 1;
      writeCommentsToDisk(comments);
      return res.status(200).json({ success: true, comment: comments[commentIndex] });
    } catch (err: any) {
      console.error('Error liking comment:', err);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });

  // ─── Mistake Journal Backend Endpoints ────────────────────────────────────
  const MISTAKES_FILE = path.join(__dirname, 'data', 'mistakes.json');

  const defaultMistakes = [
    {
      id: 'm-1',
      problemId: 'binary-search',
      problemTitle: 'Binary Search Rotated Range',
      topic: 'Searching',
      mistakeType: 'Boundary Condition',
      date: '2026-08-12',
      whatWentWrong: 'Used low < high instead of low <= high. Missed searching single-element subarray when boundaries converged.',
      whatILearned: 'When search boundaries [low..high] are inclusive, the termination condition must be low <= high.',
      reviewed: false
    },
    {
      id: 'm-2',
      problemId: 'subsets',
      problemTitle: 'Subsets Generation Backtracking',
      topic: 'Recursion',
      mistakeType: 'Logic Error',
      date: '2026-08-10',
      whatWentWrong: 'Forgot to call path.pop_back() after the recursive explore branch, causing unwanted elements to leak into subsequent branches.',
      whatILearned: 'Every choose step must have an exact symmetric unchoose rollback step when returning from recursive exploration.',
      reviewed: true
    },
    {
      id: 'm-3',
      problemId: 'two-sum',
      problemTitle: 'Two Sum Complement Lookup',
      topic: 'Hashing',
      mistakeType: 'Off-by-one',
      date: '2026-08-08',
      whatWentWrong: 'Inserted current element into hash map BEFORE searching for its complement, causing an element to pair with itself when target == 2 * val.',
      whatILearned: 'Check hash map for complement (target - nums[i]) BEFORE inserting the current number into the table.',
      reviewed: true
    }
  ];

  const readMistakesFromDisk = (): any[] => {
    try {
      if (fs.existsSync(MISTAKES_FILE)) {
        const raw = fs.readFileSync(MISTAKES_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading mistakes file from disk:', e);
    }
    return defaultMistakes;
  };

  const writeMistakesToDisk = (mistakes: any[]): boolean => {
    try {
      const dir = path.dirname(MISTAKES_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(MISTAKES_FILE, JSON.stringify(mistakes, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.error('Error writing mistakes file to disk:', e);
      return false;
    }
  };

  // GET all mistakes
  app.get('/api/mistakes', (_req: Request, res: Response) => {
    const mistakes = readMistakesFromDisk();
    return res.status(200).json({ success: true, mistakes, count: mistakes.length });
  });

  // POST create new mistake
  app.post('/api/mistakes', (req: Request, res: Response) => {
    try {
      const { problemTitle, topic, mistakeType, whatWentWrong, whatILearned, problemId } = req.body;
      if (!problemTitle || !problemTitle.trim() || !whatWentWrong || !whatWentWrong.trim()) {
        return res.status(400).json({
          success: false,
          error: 'Problem title and description of what went wrong are required.'
        });
      }

      const mistakes = readMistakesFromDisk();
      const newMistake = {
        id: `m-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        problemId: (problemId || 'custom-problem').trim(),
        problemTitle: problemTitle.trim(),
        topic: (topic || 'Searching').trim(),
        mistakeType: (mistakeType || 'Boundary Condition').trim(),
        date: new Date().toISOString().split('T')[0],
        whatWentWrong: whatWentWrong.trim(),
        whatILearned: (whatILearned || '').trim(),
        reviewed: false,
        createdAt: new Date().toISOString()
      };

      mistakes.unshift(newMistake);
      const saved = writeMistakesToDisk(mistakes);
      if (!saved) {
        return res.status(500).json({ success: false, error: 'Failed to write mistake entry to disk.' });
      }

      return res.status(201).json({
        success: true,
        message: 'Mistake logged successfully to backend storage.',
        mistake: newMistake,
        count: mistakes.length
      });
    } catch (err: any) {
      console.error('Error creating mistake entry:', err);
      return res.status(500).json({ success: false, error: 'Internal server error while saving mistake.' });
    }
  });

  // PATCH toggle reviewed or update mistake
  app.patch('/api/mistakes/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const mistakes = readMistakesFromDisk();
      const idx = mistakes.findIndex((m: any) => m.id === id);
      if (idx === -1) {
        return res.status(404).json({ success: false, error: 'Mistake entry not found.' });
      }

      const current = mistakes[idx];
      const updated = {
        ...current,
        ...req.body,
        id: current.id, // Immutable ID
      };

      mistakes[idx] = updated;
      writeMistakesToDisk(mistakes);

      return res.status(200).json({
        success: true,
        message: 'Mistake updated successfully.',
        mistake: updated
      });
    } catch (err: any) {
      console.error('Error updating mistake:', err);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });

  // DELETE a mistake
  app.delete('/api/mistakes/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const mistakes = readMistakesFromDisk();
      const filtered = mistakes.filter((m: any) => m.id !== id);
      if (filtered.length === mistakes.length) {
        return res.status(404).json({ success: false, error: 'Mistake not found' });
      }

      writeMistakesToDisk(filtered);
      return res.status(200).json({ success: true, message: 'Mistake entry deleted successfully.' });
    } catch (err: any) {
      console.error('Error deleting mistake:', err);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });


>>>>>>> ecbfa17 (DSAverse)
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
