/**
 * Tests for package.json configuration.
 * Framework: Vitest
 * Environment: jsdom (from project config)
 *
 * Focus: Validate keys and values relevant to scripts and tooling referenced in the PR.
 * We avoid executing external tools; we only perform static validation.
 */

import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

type PackageJson = {
  name?: string
  private?: boolean
  version?: string
  type?: string
  scripts?: Record<string, string>
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  msw?: { workerDirectory?: string[] }
}

function loadPkg(): PackageJson {
  const p = resolve(process.cwd(), 'package.json')
  const raw = readFileSync(p, 'utf8')
  return JSON.parse(raw) as PackageJson
}

describe('package.json integrity', () => {
  const pkg = loadPkg()

  it('has expected basic metadata', () => {
    expect(pkg.name).toBeTypeOf('string')
    expect(pkg.name).toBe('career-fit')
    expect(pkg.private).toBe(true)
    expect(pkg.version).toBeTypeOf('string')
    expect(pkg.type).toBe('module')
  })

  it('declares vitest test scripts aligned with repo config', () => {
    expect(pkg.scripts).toBeDefined()
    // Ensure presence
    for (const key of ['test', 'test:coverage']) {
      expect(pkg.scripts, `script "${key}" should exist`).toHaveProperty(key)
    }

    // Exact commands per current package.json
    expect(pkg.scripts!.test).toBe('vitest --config vitest.config.ts')
    expect(pkg.scripts!['test:coverage']).toBe('vitest --config vitest.config.ts --coverage')

    // Referenced config file should exist
    const cfgPath = resolve(process.cwd(), 'vitest.config.ts')
    expect(existsSync(cfgPath)).toBe(true)
  })

  it('includes build/dev scripts for vite and tsc', () => {
    expect(pkg.scripts).toBeDefined()
    expect(pkg.scripts!.dev).toBe('vite')
    expect(pkg.scripts!.preview).toBe('vite preview')
    expect(pkg.scripts!.build).toBe('tsc -b && vite build')
  })

  it('has lint and format scripts wired to eslint and prettier', () => {
    expect(pkg.scripts!.lint).toBe('eslint .')
    expect(pkg.scripts!.format).toBe('prettier --write --config .prettierrc src/**/*.{js,ts,tsx,json,css,md}')
    // The referenced .prettierrc should be present
    expect(existsSync(resolve(process.cwd(), '.prettierrc'))).toBe(true)
  })

  it('has postinstall script that references scripts/pdf.mjs', () => {
    expect(pkg.scripts!.postinstall).toBe('node ./scripts/pdf.mjs')
    // Ensure the file exists so install will not break
    expect(existsSync(resolve(process.cwd(), 'scripts/pdf.mjs'))).toBe(true)
  })

  it('storybook and chromatic scripts are configured', () => {
    expect(pkg.scripts!.storybook).toBe('storybook dev -p 6006')
    expect(pkg.scripts!['build-storybook']).toBe('storybook build')
    // Ensure Chromatic script uses a project token format
    expect(pkg.scripts!.chromatic).toMatch(/^npx chromatic --project-token=chpt_[A-Za-z0-9]+$/)
  })

  it('declares vitest and jsdom in devDependencies (test stack)', () => {
    expect(pkg.devDependencies).toBeDefined()
    expect(Object.keys(pkg.devDependencies!)).toEqual(
      expect.arrayContaining(['vitest', '@vitest/coverage-v8', 'jsdom'])
    )
  })

  it('declares react 19 and react-dom 19 with matching major versions', () => {
    expect(pkg.dependencies).toBeDefined()
    const react = pkg.dependencies!['react']
    const reactDom = pkg.dependencies!['react-dom']
    expect(react).toBeDefined()
    expect(reactDom).toBeDefined()

    const major = (range?: string) => {
      // crude extraction of leading major (handles ^, ~)
      if (!range) return undefined
      const m = range.replace(/^[^\d]*/, '').match(/^(\d+)\./)
      return m ? Number(m[1]) : undefined
    }
    expect(major(react)).toBe(19)
    expect(major(reactDom)).toBe(19)
  })

  it('msw is configured to output worker script under public directory', () => {
    expect(pkg.msw).toBeDefined()
    expect(pkg.msw!.workerDirectory).toEqual(expect.arrayContaining(['public']))
    // We do not assert existence of the worker file, as MSW may generate it at runtime
  })

  it('key dependency/tooling entries exist (sanity checks)', () => {
    // Verify critical build/test tooling are present
    const dep = (name: string) =>
      (pkg.dependencies && pkg.dependencies[name]) || (pkg.devDependencies && pkg.devDependencies[name])

    for (const name of [
      'vite',
      'typescript',
      '@vitejs/plugin-react',
      'eslint',
      'prettier',
      'tailwindcss',
      '@tanstack/react-query',
      'axios',
      'react-router'
    ]) {
      expect(dep(name), `Dependency "${name}" should be declared`).toBeDefined()
    }
  })
})

describe('package.json stability around diff-sensitive fields', () => {
  const pkg = loadPkg()

  it('does not accidentally change the test runner CLI shape', () => {
    // Guard on important CLI flags used by CI
    expect(pkg.scripts!.test).toContain('vitest')
    expect(pkg.scripts!['test:coverage']).toContain('--coverage')
  })

  it('keeps module type and privacy flags intact', () => {
    expect(pkg.type).toBe('module')
    expect(pkg.private).toBe(true)
  })
})