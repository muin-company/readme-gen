/**
 * Badge generation utilities for README files
 * Supports: CI/CD, coverage, npm, quality, build status
 */

export interface BadgeConfig {
  npm?: boolean;
  github?: boolean;
  ci?: 'github-actions' | 'circleci' | 'travis' | false;
  coverage?: 'codecov' | 'coveralls' | false;
  quality?: 'codeclimate' | 'codefactor' | false;
  license?: boolean;
  downloads?: boolean;
  version?: boolean;
}

export interface BadgeOptions {
  packageName?: string;
  githubRepo?: string; // Format: "owner/repo"
  license?: string;
  npmPackage?: string;
}

/**
 * Generate all configured badges
 */
export function generateBadges(config: BadgeConfig, options: BadgeOptions): string {
  const badges: string[] = [];

  // npm version badge
  if (config.version && options.npmPackage) {
    badges.push(createNpmVersionBadge(options.npmPackage));
  }

  // npm downloads badge
  if (config.downloads && options.npmPackage) {
    badges.push(createNpmDownloadsBadge(options.npmPackage));
  }

  // License badge
  if (config.license && options.license) {
    badges.push(createLicenseBadge(options.license));
  }

  // CI/CD badges
  if (config.ci && options.githubRepo) {
    badges.push(createCIBadge(config.ci, options.githubRepo));
  }

  // Coverage badges
  if (config.coverage && options.githubRepo) {
    badges.push(createCoverageBadge(config.coverage, options.githubRepo));
  }

  // Code quality badges
  if (config.quality && options.githubRepo) {
    badges.push(createQualityBadge(config.quality, options.githubRepo));
  }

  // GitHub stars badge
  if (config.github && options.githubRepo) {
    badges.push(createGitHubStarsBadge(options.githubRepo));
  }

  return badges.length > 0 ? badges.join(' ') + '\n' : '';
}

/**
 * Create npm version badge
 */
function createNpmVersionBadge(packageName: string): string {
  return `[![npm version](https://img.shields.io/npm/v/${packageName})](https://www.npmjs.com/package/${packageName})`;
}

/**
 * Create npm downloads badge
 */
function createNpmDownloadsBadge(packageName: string): string {
  return `[![npm downloads](https://img.shields.io/npm/dm/${packageName})](https://www.npmjs.com/package/${packageName})`;
}

/**
 * Create license badge
 */
function createLicenseBadge(license: string): string {
  const licenseColor = getLicenseColor(license);
  return `[![License: ${license}](https://img.shields.io/badge/License-${encodeURIComponent(license)}-${licenseColor}.svg)](https://opensource.org/licenses/${license})`;
}

/**
 * Create CI/CD badge
 */
function createCIBadge(ci: 'github-actions' | 'circleci' | 'travis', repo: string): string {
  switch (ci) {
    case 'github-actions':
      return `[![CI](https://github.com/${repo}/actions/workflows/ci.yml/badge.svg)](https://github.com/${repo}/actions)`;
    case 'circleci':
      return `[![CircleCI](https://circleci.com/gh/${repo}.svg?style=shield)](https://circleci.com/gh/${repo})`;
    case 'travis':
      return `[![Build Status](https://travis-ci.org/${repo}.svg?branch=main)](https://travis-ci.org/${repo})`;
  }
}

/**
 * Create coverage badge
 */
function createCoverageBadge(coverage: 'codecov' | 'coveralls', repo: string): string {
  switch (coverage) {
    case 'codecov':
      return `[![codecov](https://codecov.io/gh/${repo}/branch/main/graph/badge.svg)](https://codecov.io/gh/${repo})`;
    case 'coveralls':
      return `[![Coverage Status](https://coveralls.io/repos/github/${repo}/badge.svg?branch=main)](https://coveralls.io/github/${repo}?branch=main)`;
  }
}

/**
 * Create code quality badge
 */
function createQualityBadge(quality: 'codeclimate' | 'codefactor', repo: string): string {
  switch (quality) {
    case 'codeclimate':
      return `[![Maintainability](https://api.codeclimate.com/v1/badges/${repo}/maintainability)](https://codeclimate.com/github/${repo}/maintainability)`;
    case 'codefactor':
      return `[![CodeFactor](https://www.codefactor.io/repository/github/${repo}/badge)](https://www.codefactor.io/repository/github/${repo})`;
  }
}

/**
 * Create GitHub stars badge
 */
function createGitHubStarsBadge(repo: string): string {
  return `[![GitHub stars](https://img.shields.io/github/stars/${repo}?style=social)](https://github.com/${repo})`;
}

/**
 * Get appropriate color for license badge
 */
function getLicenseColor(license: string): string {
  const permissive = ['MIT', 'Apache-2.0', 'BSD-3-Clause', 'BSD-2-Clause', 'ISC'];
  const copyleft = ['GPL-3.0', 'GPL-2.0', 'AGPL-3.0', 'LGPL-3.0'];
  
  if (permissive.includes(license)) return 'yellow';
  if (copyleft.includes(license)) return 'blue';
  return 'green';
}

/**
 * Parse repository URL to owner/repo format
 */
export function parseGitHubRepo(repoUrl: string): string | null {
  const match = repoUrl.match(/github\.com[:/]([^/]+\/[^/]+?)(?:\.git)?$/);
  return match ? match[1] : null;
}

/**
 * Generate badge configuration from project info
 */
export function generateBadgeConfig(options: {
  hasNpm?: boolean;
  hasCI?: boolean;
  hasCoverage?: boolean;
  hasTests?: boolean;
}): BadgeConfig {
  return {
    npm: options.hasNpm,
    version: options.hasNpm,
    downloads: options.hasNpm,
    license: true,
    github: true,
    ci: options.hasCI ? 'github-actions' : false,
    coverage: options.hasCoverage ? 'codecov' : false,
    quality: false,
  };
}
