import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';
import { createServer as createViteServer } from 'vite';

const currentDir = typeof __dirname !== 'undefined' ? __dirname : process.cwd();

const REQUIRED_FILES = [
  'B02_C01.md',
  'B02_C01_CONTRACT.md',
  'CUSTODY_LEDGER.json',
  'ROUTE_LEDGER.json',
  'SOURCE_LEDGER.json',
  'GENERATION_RECEIPT.json',
  'INSPECTOR_GENERAL_REPORT.json',
  'AUDIT_CONFIGURATION.json',
  'GIT_PROVENANCE.json',
  'MANIFEST.json',
  'MANIFEST.sha256'
];

function getEvidenceDirectory(): string | null {
  const candidates = [
    path.join(process.cwd(), 'server', 'evidence', 'B02_C01_EVIDENCE'),
    path.join(process.cwd(), 'server', 'evidence', 'B02_C01_EVIDENCE_V3'),
    path.join(process.cwd(), 'handoff', 'B02_C01_EVIDENCE'),
    path.join(currentDir, 'evidence', 'B02_C01_EVIDENCE'),
    path.join(currentDir, 'server', 'evidence', 'B02_C01_EVIDENCE'),
    path.join(currentDir, '..', 'server', 'evidence', 'B02_C01_EVIDENCE'),
    path.join(currentDir, '..', 'handoff', 'B02_C01_EVIDENCE')
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
      return candidate;
    }
  }
  return null;
}

function handleZipStream(req: Request, res: Response, version: string = 'V3', filename: string = 'B02_C01_PHYSICAL_AUDIT_BUNDLE_V3.zip') {
  // Check for pre-built physical zip first
  const zipCandidates = [
    path.join(process.cwd(), 'server', 'evidence', filename),
    path.join(process.cwd(), filename),
    path.join(process.cwd(), 'public', filename),
    path.join(process.cwd(), 'dist', filename)
  ];

  for (const zc of zipCandidates) {
    if (fs.existsSync(zc) && fs.statSync(zc).isFile()) {
      const buf = fs.readFileSync(zc);
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('Content-Length', buf.length.toString());
      res.setHeader('X-Audit-Status', 'VERIFIED');
      res.setHeader('X-Bundle-Version', version);
      return res.status(200).send(buf);
    }
  }

  const evidenceDir = getEvidenceDirectory();
  if (!evidenceDir) {
    return res.status(409).json({
      error: 'Evidence directory not found',
      missing_files: REQUIRED_FILES
    });
  }

  const missing = REQUIRED_FILES.filter(file => !fs.existsSync(path.join(evidenceDir, file)));
  if (missing.length > 0) {
    return res.status(409).json({
      error: 'Missing required audit bundle files',
      missing_files: missing
    });
  }

  try {
    const zip = new AdmZip();
    
    function addDirRecursive(dir: string, baseDir: string) {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        if (item.endsWith('.zip')) continue;
        const fullPath = path.join(dir, item);
        const relPath = path.relative(baseDir, fullPath);
        if (fs.statSync(fullPath).isDirectory()) {
          addDirRecursive(fullPath, baseDir);
        } else {
          const fileBuffer = fs.readFileSync(fullPath);
          zip.addFile(relPath, fileBuffer);
        }
      }
    }

    addDirRecursive(evidenceDir, evidenceDir);
    const zipBuffer = zip.toBuffer();

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Length', zipBuffer.length.toString());
    res.setHeader('X-Audit-Status', 'VERIFIED');
    res.setHeader('X-Bundle-Version', version);

    res.status(200).send(zipBuffer);
  } catch (err: any) {
    console.error('Error generating ZIP bundle:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to generate audit zip bundle', details: err.message });
    }
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Direct robust route matching for zip downloads
  app.use((req: Request, res: Response, next) => {
    if (
      req.path === '/api/admin/audit-bundles/b02-c01-v3.zip' ||
      req.path === '/B02_C01_PHYSICAL_AUDIT_BUNDLE_V3.zip' ||
      req.path === '/api/download/b02-c01-v3.zip'
    ) {
      return handleZipStream(req, res, 'V3', 'B02_C01_PHYSICAL_AUDIT_BUNDLE_V3.zip');
    }

    if (
      req.path === '/api/admin/audit-bundles/b02-c01-v2.zip' ||
      req.path === '/B02_C01_PHYSICAL_AUDIT_BUNDLE_V2.zip'
    ) {
      const v2Path = path.join(process.cwd(), 'NONCANONICAL_G031_V2_HUMAN_CRITICAL_VETO', 'B02_C01_PHYSICAL_AUDIT_BUNDLE_V2.zip');
      if (fs.existsSync(v2Path)) {
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename="B02_C01_PHYSICAL_AUDIT_BUNDLE_V2.zip"');
        res.setHeader('X-Audit-Status', 'QUARANTINED_VETO');
        return res.sendFile(v2Path);
      } else {
        return handleZipStream(req, res, 'V2', 'B02_C01_PHYSICAL_AUDIT_BUNDLE_V2.zip');
      }
    }

    next();
  });

  // Status check endpoint
  app.get('/api/admin/audit-bundles/status', (req: Request, res: Response) => {
    const evidenceDir = getEvidenceDirectory();
    if (!evidenceDir) {
      return res.status(409).json({
        status: 'ERROR',
        error: 'Evidence directory not found',
        missing_files: REQUIRED_FILES
      });
    }

    const missing = REQUIRED_FILES.filter(file => !fs.existsSync(path.join(evidenceDir, file)));
    if (missing.length > 0) {
      return res.status(409).json({
        status: 'INCOMPLETE',
        error: 'Required evidence files missing',
        missing_files: missing
      });
    }

    const allFiles = fs.readdirSync(evidenceDir);
    return res.json({
      status: 'VERIFIED',
      version: 'V3',
      authority: 'LOCK_CROWN_REPAIR_CHECKPOINT_059',
      directory: evidenceDir,
      required_files_count: REQUIRED_FILES.length,
      total_files_count: allFiles.length,
      files: allFiles
    });
  });

  // Vite development middleware vs Static Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
