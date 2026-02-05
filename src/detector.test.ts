import * as fs from 'fs';
import * as path from 'path';
import { detectProjectType, detectLicense, hasTests } from './detector';

// Mock fs
jest.mock('fs');

const mockedFs = fs as jest.Mocked<typeof fs>;

describe('detectProjectType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should detect Node.js project', () => {
    mockedFs.existsSync.mockImplementation((p) => {
      return p.toString().endsWith('package.json');
    });

    const result = detectProjectType('/test/path');
    expect(result).toBe('node');
  });

  test('should detect Python project with setup.py', () => {
    mockedFs.existsSync.mockImplementation((p) => {
      return p.toString().endsWith('setup.py');
    });

    const result = detectProjectType('/test/path');
    expect(result).toBe('python');
  });

  test('should detect Go project', () => {
    mockedFs.existsSync.mockImplementation((p) => {
      return p.toString().endsWith('go.mod');
    });

    const result = detectProjectType('/test/path');
    expect(result).toBe('go');
  });

  test('should detect Rust project', () => {
    mockedFs.existsSync.mockImplementation((p) => {
      return p.toString().endsWith('Cargo.toml');
    });

    const result = detectProjectType('/test/path');
    expect(result).toBe('rust');
  });

  test('should return unknown for unrecognized project', () => {
    mockedFs.existsSync.mockReturnValue(false);

    const result = detectProjectType('/test/path');
    expect(result).toBe('unknown');
  });
});

describe('detectLicense', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should detect MIT license', () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue('MIT License\n\nCopyright...');

    const result = detectLicense('/test/path');
    expect(result).toBe('MIT');
  });

  test('should detect Apache license', () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue('Apache License\n\nVersion 2.0...');

    const result = detectLicense('/test/path');
    expect(result).toBe('Apache-2.0');
  });

  test('should return undefined if no license file found', () => {
    mockedFs.existsSync.mockReturnValue(false);

    const result = detectLicense('/test/path');
    expect(result).toBeUndefined();
  });
});

describe('hasTests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return true if test directory exists', () => {
    mockedFs.existsSync.mockImplementation((p) => {
      return p.toString().endsWith('test');
    });

    const result = hasTests('/test/path');
    expect(result).toBe(true);
  });

  test('should return true if test files exist', () => {
    mockedFs.existsSync.mockReturnValue(false);
    mockedFs.readdirSync.mockReturnValue(['index.js', 'index.test.js'] as any);

    const result = hasTests('/test/path');
    expect(result).toBe(true);
  });

  test('should return false if no tests found', () => {
    mockedFs.existsSync.mockReturnValue(false);
    mockedFs.readdirSync.mockReturnValue(['index.js', 'package.json'] as any);

    const result = hasTests('/test/path');
    expect(result).toBe(false);
  });
});
