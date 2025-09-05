/**
 * Code Convention Tests
 *
 * Testing library/framework:
 * - Primary: Vitest (describe/it/expect imported from 'vitest' when available)
 * - Fallback: Jest (uses global describe/it/expect)
 *
 * Purpose:
 * - Validate repository code against documented conventions for components, API services, query keys, and zod schemas.
 * - Tests are adaptive: if a target directory/file pattern is not present, the test logs and passes to avoid false negatives.
 *
 * Coverage:
 * 1) React component naming and props typing conventions
 * 2) Page component default export function convention
 * 3) API function declaration style and naming (export async function ...)
 * 4) React Query key structure in service/_keys.ts
 * 5) Zod schema/type naming suffixes
 */

let useVitest = false;
let vitest;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  require.resolve('vitest');
  useVitest = true;
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  vitest = require('vitest'); // assign to outer variable for both runners
} catch {
  // Fall back to Jest globals
}

/* Test-adapter helpers */
const _describe: jest.Describe = useVitest ? vitest.describe : describe;
const _it: jest.It = useVitest ? vitest.it : it;
const _expect: jest.Expect = useVitest ? vitest.expect : expect;

import fs from 'fs';
import path from 'path';

/* ---------- FS utilities ---------- */
type WalkOptions = {
  exts?: string[];
  excludeDirs?: string[];
  maxFiles?: number;
};
function walk(dir: string, opts: WalkOptions = {}, acc: string[] = []): string[] {
  const { exts, excludeDirs = ['node_modules', 'dist', 'build', '.next', 'out', '.turbo', '.git'], maxFiles = 2000 } = opts;
  if (!fs.existsSync(dir)) return acc;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (acc.length >= maxFiles) break;
    if (entry.isDirectory()) {
      if (excludeDirs.includes(entry.name)) continue;
      walk(path.join(dir, entry.name), opts, acc);
    } else if (entry.isFile()) {
      const filePath = path.join(dir, entry.name);
      if (exts && !exts.includes(path.extname(filePath))) continue;
      acc.push(filePath);
    }
  }
  return acc;
}

function tryRead(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return '';
  }
}

function isPascalCase(name: string): boolean {
  return /^[A-Z][A-Za-z0-9]*$/.test(name);
}

/* Utility to escape strings for use in RegExp constructor */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* ---------- 1) Component conventions ---------- */
_describe('React Component Conventions', () => {
  const componentRoots = ['src/components', 'components'].filter((d) => fs.existsSync(d));
  const files = componentRoots.flatMap((root) => walk(root, { exts: ['.tsx', '.ts'] }));
  if (files.length === 0) {
    _it('skips when no component directories found', () => {
      _expect(true).toBe(true);
    });
    return;
  }

  files.forEach((file) => {
    const code = tryRead(file);
    if (!code.trim()) return;

    // Look for exported components defined as arrow functions: export const Name = ( ... ) => { ... }
    const exportConstArrow = [...code.matchAll(/export\s+const\s+(\w+)\s*=\s*\([\s\S]*?\)\s*=>/g)];
    // Look for any default export arrow components (should not be used for pages; acceptable here)
    // For normal components, arrow is preferred
    _it(`${path.relative(process.cwd(), file)}: component names use PascalCase for export const`, () => {
      for (const m of exportConstArrow) {
        const name = m[1];
        _expect(isPascalCase(name)).toBe(true);
      }
    });

    // Props interface naming: export interface ComponentNameProps { ... } and used in parameter type
    exportConstArrow.forEach((m) => {
      const compName = m[1];
      const ifaceName = `${compName}Props`;

      _it(`${path.relative(process.cwd(), file)}: defines "export interface ${ifaceName}"`, () => {
        const hasInterface = new RegExp(`export\\s+interface\\s+${escapeRegExp(ifaceName)}\\b`).test(code);
        // Allow union with type for backward compatibility but prefer interface
        _expect(hasInterface).toBe(true);
      });

      _it(`${path.relative(process.cwd(), file)}: component uses ${ifaceName} as props type`, () => {
        const usesPropsType =
          new RegExp(`\\(\\s*\\{[\\s\\S]*?\\}\\s*:\\s*${escapeRegExp(ifaceName)}\\s*\\)\\s*=>`).test(code) ||
          new RegExp(`\\(\\s*[^)]*:\\s*${escapeRegExp(ifaceName)}\\s*\\)\\s*=>`).test(code);
        _expect(usesPropsType).toBe(true);
      });
    });
  });
});

/* ---------- 2) Page component convention ---------- */
_describe('Page Component Conventions', () => {
  const pageRoots = ['src/pages', 'pages', 'app'].filter((d) => fs.existsSync(d));
  const files = pageRoots.flatMap((root) => walk(root, { exts: ['.tsx', '.ts'] }));

  if (files.length === 0) {
    _it('skips when no page directories found', () => {
      _expect(true).toBe(true);
    });
    return;
  }

  files.forEach((file) => {
    const code = tryRead(file);
    if (!code.trim()) return;

    _it(`${path.relative(process.cwd(), file)}: uses "export default function" for page components`, () => {
      const hasDefaultFunction = /export\s+default\s+function\s+\w+\s*\(/.test(code);
      // If the file has a default export at all, enforce function style; else skip silently.
      const hasDefaultExport = /export\s+default\s+/.test(code);
      if (hasDefaultExport) {
        _expect(hasDefaultFunction).toBe(true);
      } else {
        _expect(true).toBe(true);
      }
    });
  });
});

/* ---------- 3) API service conventions ---------- */
_describe('API and Data Management Conventions', () => {
  // Look for service segments consistent with FSD (unused placeholder)

  // Re-scan directories and collect TS files under "service" segments
  const candidates: string[] = [];
  (function collectServiceTs(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      if (['node_modules', 'dist', 'build', '.next', 'out', '.turbo', '.git'].includes(ent.name)) continue;
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (ent.name.toLowerCase() === 'service' || p.includes(`${path.sep}service${path.sep}`)) {
          // gather ts files in this subtree
          candidates.push(...walk(p, { exts: ['.ts', '.tsx'] }));
        }
        collectServiceTs(p);
      }
    }
  })(process.cwd());

  if (candidates.length === 0) {
    _it('skips when no service directories found', () => {
      _expect(true).toBe(true);
    });
    return;
  }

  const verbPrefix = /^(get|create|edit|delete|signup)/;

  candidates.forEach((file) => {
    const code = tryRead(file);
    if (!code.trim()) return;

    // Rule: export async function <verb...>(...)
    const exportedAsyncFns = [...code.matchAll(/export\s+async\s+function\s+(\w+)\s*\(/g)];
    const exportedConstAsyncFns = [...code.matchAll(/export\s+const\s+(\w+)\s*=\s*async\s*\(/g)];

    _it(`${path.relative(process.cwd(), file)}: prefers "export async function <verb...>()" for API calls`, () => {
      // If there are exported const async fns, we ensure at least one exported async function exists preferred style.
      if (exportedConstAsyncFns.length > 0 || /axios|api\.get|api\.post/.test(code)) {
        _expect(exportedAsyncFns.length > 0).toBe(true);
      } else {
        _expect(true).toBe(true);
      }
    });

    exportedAsyncFns.forEach((m) => {
      const name = m[1];
      _it(`${path.relative(process.cwd(), file)}: API function "${name}" starts with a verb`, () => {
        _expect(verbPrefix.test(name)).toBe(true);
      });
    });
  });
});

/* ---------- 4) React Query key conventions ---------- */
_describe('React Query Key Conventions', () => {
  // Find files named _keys.ts under any service directory
  const keysFiles: string[] = [];
  (function collectKeys(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      if (['node_modules', 'dist', 'build', '.next', 'out', '.turbo', '.git'].includes(ent.name)) continue;
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        collectKeys(p);
      } else if (ent.isFile() && ent.name === '_keys.ts' && p.includes(`${path.sep}service${path.sep}`)) {
        keysFiles.push(p);
      }
    }
  })(process.cwd());

  if (keysFiles.length === 0) {
    _it('skips when no service/_keys.ts files found', () => {
      _expect(true).toBe(true);
    });
    return;
  }

  keysFiles.forEach((file) => {
    const code = tryRead(file);

    _it(`${path.relative(process.cwd(), file)}: declares a const QueryKeys object`, () => {
      const hasObject = /export\s+const\s+\w*QueryKeys\s*=\s*\{\s*[\s\S]*?\}\s*as\s+const\s*;?/.test(code);
      _expect(hasObject).toBe(true);
    });

    _it(`${path.relative(process.cwd(), file)}: every key value is an arrow function`, () => {
      const objectBodyMatch = code.match(/export\s+const\s+\w*QueryKeys\s*=\s*\{([\s\S]*?)\}\s*as\s+const/);
      if (!objectBodyMatch) {
        _expect(true).toBe(true);
        return;
      }
      const body = objectBodyMatch[1];
      // Rough heuristic: match "KEY: () => ..." or "KEY: (id: number) => ..."
      const entries = [...body.matchAll(/([A-Z0-9_]+)\s*:\s*\([\s\S]*?\)\s*=>\s*\[/g)];
      // If there are any entries, all must be arrow functions
      if (entries.length > 0) {
        const nonArrow = [...body.matchAll(/([A-Z0-9_]+)\s*:\s*(?!\()[^\n,]+/g)];
        _expect(nonArrow.length).toBe(0);
      } else {
        _expect(true).toBe(true);
      }
    });
  });
});

/* ---------- 5) Zod schema/type conventions ---------- */
_describe('Zod Schema and Type Conventions', () => {
  const tsFiles = walk('src', { exts: ['.ts', '.tsx'] });

  if (tsFiles.length === 0) {
    _it('skips when no TS files found', () => {
      _expect(true).toBe(true);
    });
    return;
  }

  tsFiles.forEach((file) => {
    const code = tryRead(file);
    if (!/from\s+['"]zod['"]|z\.object\(/.test(code)) return;

    // Check exported const names ending with Schema
    const exportedSchemas = [...code.matchAll(/export\s+const\s+(\w+Schema)\s*=\s*z\.object\s*\(/g)];
    _it(`${path.relative(process.cwd(), file)}: exported zod schemas end with "Schema"`, () => {
      // If zod is used, ensure at least one properly named schema exists
      if (/z\.object\(/.test(code)) {
        _expect(exportedSchemas.length > 0).toBe(true);
      } else {
        _expect(true).toBe(true);
      }
    });

    // Check z.infer types end with SchemaType
    const inferredTypes = [...code.matchAll(/export\s+type\s+(\w+SchemaType)\s*=\s*z\.infer<\s*typeof\s+\w+Schema\s*>/g)];
    _it(`${path.relative(process.cwd(), file)}: z.infer types end with "SchemaType"`, () => {
      if (exportedSchemas.length > 0) {
        _expect(inferredTypes.length >= exportedSchemas.length).toBe(true);
      } else {
        _expect(true).toBe(true);
      }
    });
  });
});

/* SKIPPED FIXES:
 - Ast-grep findings for dynamic regex on lines 111, 118, and 119 (potential ReDoS). Addressing these requires significant refactoring or the introduction of regex safety libraries; skipped.
*/