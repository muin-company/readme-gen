import * as fs from 'fs';
import * as path from 'path';

const IGNORE_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  'coverage',
  '.next',
  '__pycache__',
  'venv',
  '.venv',
  'target'
]);

const IGNORE_FILES = new Set([
  '.DS_Store',
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml'
]);

export function generateFileTree(
  dir: string,
  prefix: string = '',
  isLast: boolean = true,
  maxDepth: number = 3,
  currentDepth: number = 0
): string {
  if (currentDepth >= maxDepth) {
    return '';
  }

  const basename = path.basename(dir);
  
  if (IGNORE_DIRS.has(basename) || IGNORE_FILES.has(basename)) {
    return '';
  }

  let result = '';
  const connector = isLast ? '└── ' : '├── ';
  
  if (currentDepth > 0) {
    result += prefix + connector + basename + '\n';
  }

  try {
    const stats = fs.statSync(dir);
    
    if (stats.isDirectory()) {
      const items = fs.readdirSync(dir);
      const validItems = items.filter(
        item => !IGNORE_DIRS.has(item) && !IGNORE_FILES.has(item)
      );
      
      validItems.forEach((item, index) => {
        const itemPath = path.join(dir, item);
        const itemIsLast = index === validItems.length - 1;
        const newPrefix = currentDepth > 0 
          ? prefix + (isLast ? '    ' : '│   ')
          : '';
        
        result += generateFileTree(
          itemPath,
          newPrefix,
          itemIsLast,
          maxDepth,
          currentDepth + 1
        );
      });
    }
  } catch (err) {
    // Skip files/dirs we can't read
  }

  return result;
}
