import { generateReadme } from './template';
import { ProjectInfo } from './types';

describe('generateReadme', () => {
  test('should generate basic README for Node.js project', () => {
    const info: ProjectInfo = {
      type: 'node',
      name: 'test-project',
      description: 'A test project',
      version: '1.0.0',
      license: 'MIT',
      fileTree: 'test-project/\n├── src/\n└── package.json\n',
      hasTests: true,
      scripts: {
        start: 'node index.js',
        test: 'jest'
      }
    };

    const readme = generateReadme(info);

    expect(readme).toContain('# test-project');
    expect(readme).toContain('A test project');
    expect(readme).toContain('Installation');
    expect(readme).toContain('npm install');
    expect(readme).toContain('Usage');
    expect(readme).toContain('Available Scripts');
    expect(readme).toContain('Project Structure');
    expect(readme).toContain('MIT License');
  });

  test('should generate README for Python project', () => {
    const info: ProjectInfo = {
      type: 'python',
      name: 'python-app',
      fileTree: 'python-app/\n├── main.py\n└── requirements.txt\n',
      hasTests: false
    };

    const readme = generateReadme(info);

    expect(readme).toContain('# python-app');
    expect(readme).toContain('pip install');
    expect(readme).toContain('python main.py');
  });

  test('should include badges when appropriate', () => {
    const info: ProjectInfo = {
      type: 'node',
      name: 'awesome-lib',
      version: '2.0.0',
      license: 'Apache-2.0',
      fileTree: 'awesome-lib/\n',
      hasTests: true
    };

    const readme = generateReadme(info);

    expect(readme).toContain('![npm version]');
    expect(readme).toContain('![license]');
    expect(readme).toContain('![tests]');
  });

  test('should handle projects without tests', () => {
    const info: ProjectInfo = {
      type: 'go',
      name: 'go-service',
      fileTree: 'go-service/\n',
      hasTests: false
    };

    const readme = generateReadme(info);

    expect(readme).toContain('# go-service');
    expect(readme).not.toContain('Running Tests');
    expect(readme).toContain('Contributing');
  });

  test('should handle unknown project types', () => {
    const info: ProjectInfo = {
      type: 'unknown',
      name: 'mystery-project',
      fileTree: 'mystery-project/\n',
      hasTests: false
    };

    const readme = generateReadme(info);

    expect(readme).toContain('# mystery-project');
    expect(readme).toContain('Installation instructions coming soon');
  });
});
