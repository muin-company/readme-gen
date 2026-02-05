import * as fs from 'fs';
import * as path from 'path';
import { ProjectType } from './types';

export function detectProjectType(projectPath: string): ProjectType {
  // Check for Node.js
  if (fs.existsSync(path.join(projectPath, 'package.json'))) {
    return 'node';
  }
  
  // Check for Python
  if (
    fs.existsSync(path.join(projectPath, 'setup.py')) ||
    fs.existsSync(path.join(projectPath, 'pyproject.toml')) ||
    fs.existsSync(path.join(projectPath, 'requirements.txt'))
  ) {
    return 'python';
  }
  
  // Check for Go
  if (fs.existsSync(path.join(projectPath, 'go.mod'))) {
    return 'go';
  }
  
  // Check for Rust
  if (fs.existsSync(path.join(projectPath, 'Cargo.toml'))) {
    return 'rust';
  }
  
  return 'unknown';
}

export function detectLicense(projectPath: string): string | undefined {
  const licenseFiles = ['LICENSE', 'LICENSE.md', 'LICENSE.txt', 'LICENCE'];
  
  for (const file of licenseFiles) {
    const licensePath = path.join(projectPath, file);
    if (fs.existsSync(licensePath)) {
      const content = fs.readFileSync(licensePath, 'utf-8');
      
      // Detect license type from content
      if (content.includes('MIT License')) return 'MIT';
      if (content.includes('Apache License')) return 'Apache-2.0';
      if (content.includes('GNU GENERAL PUBLIC LICENSE')) return 'GPL-3.0';
      if (content.includes('BSD')) return 'BSD';
      
      return 'Custom';
    }
  }
  
  return undefined;
}

export function hasTests(projectPath: string): boolean {
  const testDirs = ['test', 'tests', '__tests__', 'spec'];
  const testFiles = ['test.js', 'test.ts', 'test.py', 'test.go'];
  
  // Check for test directories
  for (const dir of testDirs) {
    if (fs.existsSync(path.join(projectPath, dir))) {
      return true;
    }
  }
  
  // Check for test files in root
  for (const file of testFiles) {
    if (fs.existsSync(path.join(projectPath, file))) {
      return true;
    }
  }
  
  // Check for files with .test. or .spec. in them
  try {
    const files = fs.readdirSync(projectPath);
    return files.some(f => f.includes('.test.') || f.includes('.spec.'));
  } catch {
    return false;
  }
}
