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

  test('should generate minimal template', () => {
    const info: ProjectInfo = {
      type: 'node',
      name: 'minimal-app',
      description: 'A minimal app',
      license: 'MIT',
      fileTree: 'minimal-app/\n',
      hasTests: false
    };

    const readme = generateReadme(info, 'minimal');

    expect(readme).toContain('# minimal-app');
    expect(readme).toContain('Installation');
    expect(readme).toContain('Usage');
    expect(readme).toContain('MIT');
    // Minimal should NOT include these
    expect(readme).not.toContain('Project Structure');
    expect(readme).not.toContain('Development');
  });

  test('should generate standard template (default)', () => {
    const info: ProjectInfo = {
      type: 'node',
      name: 'standard-app',
      fileTree: 'standard-app/\n',
      hasTests: true
    };

    const readme = generateReadme(info, 'standard');

    expect(readme).toContain('# standard-app');
    expect(readme).toContain('Installation');
    expect(readme).toContain('Project Structure');
    expect(readme).toContain('Development');
  });

  test('should generate detailed template', () => {
    const info: ProjectInfo = {
      type: 'node',
      name: 'detailed-app',
      fileTree: 'detailed-app/\n',
      hasTests: true
    };

    const readme = generateReadme(info, 'detailed');

    expect(readme).toContain('# detailed-app');
    expect(readme).toContain('Table of Contents');
    expect(readme).toContain('Features');
    expect(readme).toContain('Examples');
    expect(readme).toContain('API Documentation');
    expect(readme).toContain('Troubleshooting');
  });

  test('should generate comprehensive template', () => {
    const info: ProjectInfo = {
      type: 'node',
      name: 'comprehensive-app',
      author: 'John Doe',
      fileTree: 'comprehensive-app/\n',
      hasTests: true
    };

    const readme = generateReadme(info, 'comprehensive');

    expect(readme).toContain('# comprehensive-app');
    expect(readme).toContain('Table of Contents');
    expect(readme).toContain('About');
    expect(readme).toContain('Prerequisites');
    expect(readme).toContain('Deployment');
    expect(readme).toContain('Roadmap');
    expect(readme).toContain('Contributing');
    expect(readme).toContain('Changelog');
    expect(readme).toContain('Authors');
    expect(readme).toContain('John Doe');
    expect(readme).toContain('Acknowledgments');
  });
});
