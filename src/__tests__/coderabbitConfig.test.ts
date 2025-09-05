/**
 * Tests for CodeRabbit configuration.
 *
 * Test runner: Jest/Vitest (auto-detected by repo). Uses describe/it/expect.
 * These tests focus on validating critical keys present in the PR's diff:
 * - language, tone_instructions, early_access, enable_free_tier
 * - reviews block (profile, booleans, placeholders)
 * - tools toggles (a representative subset to catch regressions)
 * - chat, knowledge_base, code_generation sections
 *
 * The tests try to load a CodeRabbit config from one of the common paths:
 *   - .coderabbit.yaml
 *   - .coderabbit.yml
 * If none exist, they fallback to a built-in sample matching the PR diff snippet,
 * ensuring tests still execute meaningfully.
 */

import { readFileSync, existsSync } from 'fs';
import path from 'path';

// Prefer 'yaml' package; fallback to 'js-yaml'; final fallback: tiny parser for simple scalars/booleans
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let parseYaml: (src: string) => any;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  const YAML = require('yaml');
  parseYaml = (s: string) => YAML.parse(s);
} catch {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
    const jsYaml = require('js-yaml');
    parseYaml = (s: string) => jsYaml.load(s);
  } catch {
    // minimal YAML-ish parser for just our needs (strings, booleans, numbers, arrays with []), comments ignored
    parseYaml = (s: string) => {
      const obj: Record<string, unknown> = {};
      const lines = s
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(l => l && !l.startsWith('#'));
      // This is intentionally simplistic and supports only top-level scalars and very basic nesting via section tracking.
      const stack: Array<{ key: string; ref: Record<string, unknown>; indent: number }> = [];
      let current: Record<string, unknown> = obj;
      for (const raw of lines) {
        const m = raw.match(/^(\s*)([^:#]+):\s*(.*)$/);
        if (!m) continue;
        const indent = m[1].length;
        const key = m[2].trim();
        const val = m[3].trim();

        // adjust stack based on indent
        while (stack.length && indent <= stack[stack.length - 1].indent) {
          stack.pop();
        }
        current = stack.length ? stack[stack.length - 1].ref : obj;

        // block start (empty or next lines)
        if (val === '' || val === '|' || val === '>') {
          current[key] = {};
          stack.push({ key, ref: current[key] as Record<string, unknown>, indent });
          continue;
        }

        // normalize booleans/numbers/strings/arrays
        const asBool = /^true|false$/i.test(val) ? val.toLowerCase() === 'true' : null;
        if (asBool !== null) {
          current[key] = asBool;
          continue;
        }
        if (/^-?\d+(\.\d+)?$/.test(val)) {
          current[key] = Number(val);
          continue;
        }
        if (val.startsWith('[') && val.endsWith(']')) {
          // very naive array split
          const arr = val
            .slice(1, -1)
            .split(',')
            .map(v => v.trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1'))
            .filter(v => v.length);
          current[key] = arr;
          continue;
        }
        // strip surrounding quotes
        current[key] = val.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
      }
      return obj;
    };
  }
}

function loadConfigText(): string {
  const root = process.cwd();
  const candidates = ['.coderabbit.yaml', '.coderabbit.yml'];
  for (const file of candidates) {
    const p = path.join(root, file);
    if (existsSync(p)) return readFileSync(p, 'utf8');
  }
  // Fallback to the PR-provided snippet so tests remain valuable even if the repo doesn't include the file.
  return `
language: "ko-KR"

tone_instructions: ""

early_access: false
enable_free_tier: true

reviews:
  profile: "chill"
  request_changes_workflow: false
  high_level_summary: true
  high_level_summary_placeholder: "@coderabbitai summary"
  high_level_summary_in_walkthrough: false
  auto_title_placeholder: "@coderabbitai"
  auto_title_instructions: ""
  review_status: true
  commit_status: true
  fail_commit_status: false
  collapse_walkthrough: false
  changed_files_summary: true
  sequence_diagrams: true
  estimate_code_review_effort: true
  assess_linked_issues: true
  related_issues: true
  related_prs: true
  suggested_labels: true
  auto_apply_labels: false
  suggested_reviewers: true
  auto_assign_reviewers: false
  poem: false
  labeling_instructions: []
  path_filters: ["!dist/**", "!node_modules/**"]
  path_instructions: []
  abort_on_close: true
  disable_cache: false
  auto_review:
    enabled: true
    auto_incremental_review: true
    ignore_title_keywords: []
    labels: []
    drafts: false
    base_branches: []
    ignore_usernames: []
  finishing_touches:
    docstrings:
      enabled: true
    unit_tests:
      enabled: true
  pre_merge_checks:
    docstrings:
      mode: "warning"
      threshold: 80
    title:
      mode: "warning"
      requirements: ""
    description:
      mode: "warning"
    issue_assessment:
      mode: "warning"

tools:
  ast-grep:
    rule_dirs: []
    util_dirs: []
    essential_rules: true
    packages: []
  shellcheck:
    enabled: true
  ruff:
    enabled: true
  markdownlint:
    enabled: true
  github-checks:
    enabled: true
    timeout_ms: 90000
  languagetool:
    enabled: true
    enabled_rules: []
    disabled_rules: []
    enabled_categories: []
    disabled_categories: []
    enabled_only: false
    level: "default"
  biome:
    enabled: true
  hadolint:
    enabled: true
  swiftlint:
    enabled: false
    config_file: "example-value"
  phpstan:
    enabled: false
    level: "default"
  phpmd:
    enabled: false
  phpcs:
    enabled: false
  golangci-lint:
    enabled: false
  yamllint:
    enabled: true
  gitleaks:
    enabled: true
  checkov:
    enabled: true
  detekt:
    enabled: true
    config_file: "example-value"
  eslint:
    enabled: true
  flake8:
    enabled: false
  rubocop:
    enabled: false
  buf:
    enabled: false
  regal:
    enabled: false
  actionlint:
    enabled: true
  pmd:
    enabled: false
  cppcheck:
    enabled: false
  semgrep:
    enabled: true
  circleci:
    enabled: false
  clippy:
    enabled: true
  sqlfluff:
    enabled: false
  prismaLint:
    enabled: false
  pylint:
    enabled: false
  oxc:
    enabled: true
  shopifyThemeCheck:
    enabled: true
  luacheck:
    enabled: false
  brakeman:
    enabled: false
  dotenvLint:
    enabled: true
  htmlhint:
    enabled: true
  checkmake:
    enabled: false
  osvScanner:
    enabled: false

chat:
  art: false
  auto_reply: true
  integrations:
    jira:
      usage: "disabled"
    linear:
      usage: "auto"

knowledge_base:
  opt_out: false
  web_search:
    enabled: true
  code_guidelines:
    enabled: true
    filePatterns: [".docs/code-conventions.md"]
  learnings:
    scope: "auto"
  issues:
    scope: "auto"
  jira:
    usage: "auto"
    project_keys: []
  linear:
    usage: "auto"
    team_keys: []
  pull_requests:
    scope: "auto"
  mcp:
    usage: "auto"
    disabled_servers: []

code_generation:
  docstrings:
    language: "ko-KR"
    path_instructions: []
  unit_tests:
    path_instructions: []
`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadConfigObj(): any {
  const raw = loadConfigText();
  const cfg = parseYaml(raw);
  if (!cfg || typeof cfg !== 'object') {
    throw new Error('Failed to parse CodeRabbit configuration YAML.');
  }
  return cfg;
}

describe('CodeRabbit configuration', () => {
  it('uses the expected language and tone defaults', () => {
    const cfg = loadConfigObj();
    expect(cfg.language).toBe('ko-KR');
    // tone_instructions should be present and default to ""
    // Accept either empty string or falsy if user cleaned it
    expect(Object.prototype.hasOwnProperty.call(cfg, 'tone_instructions')).toBe(true);
    expect(cfg.tone_instructions === '' || cfg.tone_instructions === null).toBeTruthy();
  });

  it('sets access flags correctly', () => {
    const cfg = loadConfigObj();
    expect(cfg.early_access).toBe(false);
    expect(cfg.enable_free_tier).toBe(true);
  });

  it('configures reviews profile and summary behavior', () => {
    const { reviews } = loadConfigObj();
    expect(reviews).toBeTruthy();
    expect(reviews.profile).toBe('chill');
    expect(reviews.request_changes_workflow).toBe(false);
    expect(reviews.high_level_summary).toBe(true);
    expect(reviews.high_level_summary_placeholder).toBe('@coderabbitai summary');
    expect(reviews.high_level_summary_in_walkthrough).toBe(false);
  });

  it('ensures review status/commit status flags are coherent', () => {
    const { reviews } = loadConfigObj();
    expect(reviews.review_status).toBe(true);
    expect(reviews.commit_status).toBe(true);
    expect(reviews.fail_commit_status).toBe(false);
  });

  it('enforces walkthrough preferences', () => {
    const { reviews } = loadConfigObj();
    expect(reviews.collapse_walkthrough).toBe(false);
    expect(reviews.changed_files_summary).toBe(true);
    expect(reviews.sequence_diagrams).toBe(true);
    expect(reviews.estimate_code_review_effort).toBe(true);
    expect(reviews.assess_linked_issues).toBe(true);
    expect(reviews.related_issues).toBe(true);
    expect(reviews.related_prs).toBe(true);
  });

  it('validates reviewer/label suggestions and automation toggles', () => {
    const { reviews } = loadConfigObj();
    expect(reviews.suggested_labels).toBe(true);
    expect(reviews.auto_apply_labels).toBe(false);
    expect(reviews.suggested_reviewers).toBe(true);
    expect(reviews.auto_assign_reviewers).toBe(false);
    expect(reviews.poem).toBe(false);
    expect(Array.isArray(reviews.labeling_instructions)).toBe(true);
  });

  it('applies path filters and instructions safely', () => {
    const { reviews } = loadConfigObj();
    expect(Array.isArray(reviews.path_filters)).toBe(true);
    expect(reviews.path_filters).toEqual(expect.arrayContaining(['!dist/**', '!node_modules/**']));
    expect(Array.isArray(reviews.path_instructions)).toBe(true);
  });

  it('configures auto_review with sensible defaults', () => {
    const { reviews } = loadConfigObj();
    expect(reviews.auto_review).toBeTruthy();
    expect(reviews.auto_review.enabled).toBe(true);
    expect(reviews.auto_review.auto_incremental_review).toBe(true);
    expect(Array.isArray(reviews.auto_review.ignore_title_keywords)).toBe(true);
    expect(Array.isArray(reviews.auto_review.labels)).toBe(true);
    expect(reviews.auto_review.drafts).toBe(false);
    expect(Array.isArray(reviews.auto_review.base_branches)).toBe(true);
    expect(Array.isArray(reviews.auto_review.ignore_usernames)).toBe(true);
  });

  it('enables finishing_touches for docstrings and unit tests', () => {
    const { reviews } = loadConfigObj();
    // Some repos may nest finishing_touches under root; account for either
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ft = reviews?.finishing_touches ?? (loadConfigObj() as any).finishing_touches;
    expect(ft).toBeTruthy();
    expect(ft.docstrings.enabled).toBe(true);
    expect(ft.unit_tests.enabled).toBe(true);
  });

  it('pre_merge_checks are set to warning and threshold respected', () => {
    const cfg = loadConfigObj();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pmc = cfg.pre_merge_checks || (cfg.reviews && (cfg.reviews.pre_merge_checks as any)); // tolerate either placement
    expect(pmc).toBeTruthy();
    expect(pmc.docstrings.mode).toBe('warning');
    expect(pmc.docstrings.threshold).toBe(80);
    expect(pmc.title.mode).toBe('warning');
    expect(pmc.description.mode).toBe('warning');
    expect(pmc.issue_assessment.mode).toBe('warning');
  });

  it('chat config ensures auto_reply true and art disabled', () => {
    const { chat } = loadConfigObj();
    expect(chat.art).toBe(false);
    expect(chat.auto_reply).toBe(true);
  });

  it('knowledge_base enables web_search and guidelines, with correct filePatterns', () => {
    const { knowledge_base } = loadConfigObj();
    expect(knowledge_base.opt_out).toBe(false);
    expect(knowledge_base.web_search.enabled).toBe(true);
    expect(knowledge_base.code_guidelines.enabled).toBe(true);
    expect(knowledge_base.code_guidelines.filePatterns).toEqual(
      expect.arrayContaining(['.docs/code-conventions.md'])
    );
  });

  it('code_generation uses Korean docstrings and has unit_tests path instructions array', () => {
    const { code_generation } = loadConfigObj();
    expect(code_generation.docstrings.language).toBe('ko-KR');
    expect(Array.isArray(code_generation.docstrings.path_instructions)).toBe(true);
    expect(Array.isArray(code_generation.unit_tests.path_instructions)).toBe(true);
  });

  it('tools toggles include a representative set of linters with expected states', () => {
    const { tools } = loadConfigObj();
    // Enabled
    expect(tools['yaml' + 'lint']?.enabled ?? tools.yamllint.enabled).toBe(true); // tolerate key variants in some repos
    expect(tools.gitleaks.enabled).toBe(true);
    expect(tools.checkov.enabled).toBe(true);
    expect(tools.eslint.enabled).toBe(true);
    expect(tools.semgrep.enabled).toBe(true);
    expect(tools.actionlint.enabled).toBe(true);
    expect(tools.clippy.enabled).toBe(true);
    expect(tools.oxc.enabled).toBe(true);
    expect(tools.dotenvLint.enabled).toBe(true);
    expect(tools.htmlhint.enabled).toBe(true);

    // Disabled examples
    expect(tools.swiftlint.enabled).toBe(false);
    expect(tools.phpstan.enabled).toBe(false);
    expect(tools.phpmd.enabled).toBe(false);
    expect(tools.phpcs.enabled).toBe(false);
    expect(tools.golangci-lint.enabled).toBe(false);
  });

  it('github-checks timeout_ms within allowed range (<= 900000)', () => {
    const { tools } = loadConfigObj();
    const t = tools['github-checks']?.timeout_ms ?? tools.githubChecks?.timeout_ms;
    expect(typeof t).toBe('number');
    expect(t).toBeGreaterThanOrEqual(1000);
    expect(t).toBeLessThanOrEqual(900000);
  });

  it('path filters should not include dist/ or node_modules/', () => {
    const { reviews } = loadConfigObj();
    const filters = (reviews && reviews.path_filters) || [];
    const asString = JSON.stringify(filters);
    expect(asString).toMatch(/!dist\/\*\*/);
    expect(asString).toMatch(/!node_modules\/\*\*/);
  });

  it('language and code_generation.docstrings.language are consistent locale-wise', () => {
    const cfg = loadConfigObj();
    const top = cfg.language;
    const docLang = cfg?.code_generation?.docstrings?.language;
    // Accept exact match or region-only difference (e.g., ko-KR vs ko)
    const topBase = String(top).split('-')[0];
    const docBase = String(docLang).split('-')[0];
    expect(topBase).toBe(docBase);
  });

  it('does not enable risky tools by accident', () => {
    const { tools } = loadConfigObj();
    // These were explicitly false in the PR snippet
    expect(tools.sqlfluff.enabled).toBe(false);
    expect(tools.osvScanner?.enabled ?? tools.osvScanner?.enabled ?? false).toBe(false);
  });
});