import * as fs from 'fs';
import * as path from 'path';
import { ProjectInfo } from './types';
import { detectProjectType, detectLicense, hasTests } from './detector';
import { generateFileTree } from './fileTree';

export function analyzeProject(projectPath: string): ProjectInfo {
  const type = detectProjectType(projectPath);
  const license = detectLicense(projectPath);
  const fileTree = generateFileTree(projectPath);
  const testsExist = hasTests(projectPath);
  
  let info: ProjectInfo = {
    type,
    name: path.basename(projectPath),
    license,
    fileTree,
    hasTests: testsExist
  };
  
  // Extract type-specific info
  switch (type) {
    case 'node':
      info = { ...info, ...extractNodeInfo(projectPath) };
      break;
    case 'python':
      info = { ...info, ...extractPythonInfo(projectPath) };
      break;
    case 'go':
      info = { ...info, ...extractGoInfo(projectPath) };
      break;
    case 'rust':
      info = { ...info, ...extractRustInfo(projectPath) };
      break;
  }
  
  return info;
}

function extractNodeInfo(projectPath: string): Partial<ProjectInfo> {
  const pkgPath = path.join(projectPath, 'package.json');
  
  if (!fs.existsSync(pkgPath)) {
    return {};
  }
  
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    
    return {
      name: pkg.name || path.basename(projectPath),
      description: pkg.description,
      version: pkg.version,
      license: pkg.license,
      scripts: pkg.scripts,
      dependencies: pkg.dependencies,
      devDependencies: pkg.devDependencies,
      author: pkg.author,
      repository: typeof pkg.repository === 'string' 
        ? pkg.repository 
        : pkg.repository?.url
    };
  } catch {
    return {};
  }
}

function extractPythonInfo(projectPath: string): Partial<ProjectInfo> {
  const setupPath = path.join(projectPath, 'setup.py');
  const pyprojectPath = path.join(projectPath, 'pyproject.toml');
  
  // Basic extraction - can be enhanced
  return {
    name: path.basename(projectPath)
  };
}

function extractGoInfo(projectPath: string): Partial<ProjectInfo> {
  const goModPath = path.join(projectPath, 'go.mod');
  
  if (!fs.existsSync(goModPath)) {
    return {};
  }
  
  try {
    const content = fs.readFileSync(goModPath, 'utf-8');
    const moduleMatch = content.match(/module\s+(.+)/);
    
    return {
      name: moduleMatch ? moduleMatch[1] : path.basename(projectPath)
    };
  } catch {
    return {};
  }
}

function extractRustInfo(projectPath: string): Partial<ProjectInfo> {
  const cargoPath = path.join(projectPath, 'Cargo.toml');
  
  if (!fs.existsSync(cargoPath)) {
    return {};
  }
  
  try {
    const content = fs.readFileSync(cargoPath, 'utf-8');
    const nameMatch = content.match(/name\s*=\s*"(.+)"/);
    const versionMatch = content.match(/version\s*=\s*"(.+)"/);
    const licenseMatch = content.match(/license\s*=\s*"(.+)"/);
    
    return {
      name: nameMatch ? nameMatch[1] : path.basename(projectPath),
      version: versionMatch ? versionMatch[1] : undefined,
      license: licenseMatch ? licenseMatch[1] : undefined
    };
  } catch {
    return {};
  }
}
