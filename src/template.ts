import { ProjectInfo, TemplateType } from './types';

export function generateReadme(info: ProjectInfo, template: TemplateType = 'standard'): string {
  const sections: string[] = [];
  
  // Title and description (all templates)
  sections.push(`# ${info.name}\n`);
  
  if (info.description) {
    sections.push(`${info.description}\n`);
  }
  
  // Template-specific sections
  switch (template) {
    case 'minimal':
      return generateMinimal(info, sections);
    case 'detailed':
      return generateDetailed(info, sections);
    case 'comprehensive':
      return generateComprehensive(info, sections);
    case 'standard':
    default:
      return generateStandard(info, sections);
  }
}

// Minimal template: Just the essentials
function generateMinimal(info: ProjectInfo, sections: string[]): string {
  // Installation
  sections.push(generateInstallation(info));
  
  // Usage
  sections.push(generateUsage(info));
  
  // License
  if (info.license) {
    sections.push(`## License\n\n${info.license}\n`);
  }
  
  return sections.join('\n');
}

// Standard template: Original default
function generateStandard(info: ProjectInfo, sections: string[]): string {
  // Badges
  const badges = generateBadges(info);
  if (badges) {
    sections.push(badges);
  }
  
  // Installation
  sections.push(generateInstallation(info));
  
  // Usage
  sections.push(generateUsage(info));
  
  // Scripts (for Node.js projects)
  if (info.scripts && Object.keys(info.scripts).length > 0) {
    sections.push(generateScripts(info));
  }
  
  // Project Structure
  sections.push(generateProjectStructure(info));
  
  // Development
  sections.push(generateDevelopment(info));
  
  // License
  if (info.license) {
    sections.push(`## License\n\nThis project is licensed under the ${info.license} License.\n`);
  }
  
  return sections.join('\n');
}

// Detailed template: Standard + examples + troubleshooting
function generateDetailed(info: ProjectInfo, sections: string[]): string {
  // Badges
  const badges = generateBadges(info);
  if (badges) {
    sections.push(badges);
  }
  
  // Table of Contents
  sections.push(generateTableOfContents());
  
  // Features
  sections.push(generateFeatures(info));
  
  // Installation
  sections.push(generateInstallation(info));
  
  // Usage
  sections.push(generateUsage(info));
  
  // Examples
  sections.push(generateExamples(info));
  
  // Scripts
  if (info.scripts && Object.keys(info.scripts).length > 0) {
    sections.push(generateScripts(info));
  }
  
  // Project Structure
  sections.push(generateProjectStructure(info));
  
  // API Documentation
  sections.push(generateAPISection(info));
  
  // Development
  sections.push(generateDevelopment(info));
  
  // Troubleshooting
  sections.push(generateTroubleshooting());
  
  // License
  if (info.license) {
    sections.push(`## License\n\nThis project is licensed under the ${info.license} License.\n`);
  }
  
  return sections.join('\n');
}

// Comprehensive template: Everything + roadmap + changelog
function generateComprehensive(info: ProjectInfo, sections: string[]): string {
  // Badges
  const badges = generateBadges(info);
  if (badges) {
    sections.push(badges);
  }
  
  // Table of Contents
  sections.push(generateTableOfContents(true));
  
  // About
  sections.push(generateAbout(info));
  
  // Features
  sections.push(generateFeatures(info));
  
  // Prerequisites
  sections.push(generatePrerequisites(info));
  
  // Installation
  sections.push(generateInstallation(info));
  
  // Usage
  sections.push(generateUsage(info));
  
  // Examples
  sections.push(generateExamples(info));
  
  // Scripts
  if (info.scripts && Object.keys(info.scripts).length > 0) {
    sections.push(generateScripts(info));
  }
  
  // Project Structure
  sections.push(generateProjectStructure(info));
  
  // API Documentation
  sections.push(generateAPISection(info));
  
  // Development
  sections.push(generateDevelopment(info));
  
  // Testing
  sections.push(generateTesting(info));
  
  // Deployment
  sections.push(generateDeployment(info));
  
  // Troubleshooting
  sections.push(generateTroubleshooting());
  
  // Roadmap
  sections.push(generateRoadmap());
  
  // Contributing
  sections.push(generateContributing());
  
  // Changelog
  sections.push(generateChangelog());
  
  // Authors
  if (info.author) {
    sections.push(`## Authors\n\n- ${info.author}\n`);
  }
  
  // Acknowledgments
  sections.push(generateAcknowledgments());
  
  // License
  if (info.license) {
    sections.push(`## License\n\nThis project is licensed under the ${info.license} License - see the [LICENSE](LICENSE) file for details.\n`);
  }
  
  return sections.join('\n');
}

function generateBadges(info: ProjectInfo): string {
  const badges: string[] = [];
  
  if (info.version && info.type === 'node') {
    badges.push(`![npm version](https://img.shields.io/npm/v/${info.name})`);
  }
  
  if (info.license) {
    badges.push(`![license](https://img.shields.io/badge/license-${info.license}-blue)`);
  }
  
  if (info.hasTests) {
    badges.push(`![tests](https://img.shields.io/badge/tests-passing-green)`);
  }
  
  return badges.length > 0 ? badges.join(' ') + '\n' : '';
}

function generateInstallation(info: ProjectInfo): string {
  let content = '## Installation\n\n';
  
  switch (info.type) {
    case 'node':
      content += '```bash\nnpm install\n```\n';
      break;
    case 'python':
      content += '```bash\npip install -r requirements.txt\n```\n';
      break;
    case 'go':
      content += '```bash\ngo mod download\n```\n';
      break;
    case 'rust':
      content += '```bash\ncargo build\n```\n';
      break;
    default:
      content += 'Installation instructions coming soon.\n';
  }
  
  return content;
}

function generateUsage(info: ProjectInfo): string {
  let content = '## Usage\n\n';
  
  switch (info.type) {
    case 'node':
      if (info.scripts?.start) {
        content += '```bash\nnpm start\n```\n';
      } else {
        content += '```bash\nnode index.js\n```\n';
      }
      break;
    case 'python':
      content += '```bash\npython main.py\n```\n';
      break;
    case 'go':
      content += '```bash\ngo run main.go\n```\n';
      break;
    case 'rust':
      content += '```bash\ncargo run\n```\n';
      break;
    default:
      content += 'Usage instructions coming soon.\n';
  }
  
  return content;
}

function generateScripts(info: ProjectInfo): string {
  let content = '## Available Scripts\n\n';
  
  if (info.scripts) {
    for (const [name, command] of Object.entries(info.scripts)) {
      content += `- **${name}**: \`${command}\`\n`;
    }
    content += '\n';
  }
  
  return content;
}

function generateProjectStructure(info: ProjectInfo): string {
  let content = '## Project Structure\n\n```\n';
  content += info.fileTree;
  content += '```\n';
  return content;
}

function generateDevelopment(info: ProjectInfo): string {
  let content = '## Development\n\n';
  
  if (info.hasTests) {
    content += '### Running Tests\n\n';
    
    switch (info.type) {
      case 'node':
        content += '```bash\nnpm test\n```\n\n';
        break;
      case 'python':
        content += '```bash\npytest\n```\n\n';
        break;
      case 'go':
        content += '```bash\ngo test ./...\n```\n\n';
        break;
      case 'rust':
        content += '```bash\ncargo test\n```\n\n';
        break;
    }
  }
  
  content += '### Contributing\n\n';
  content += 'Contributions are welcome! Please feel free to submit a Pull Request.\n';
  
  return content;
}

function generateTableOfContents(extended: boolean = false): string {
  const sections = [
    '[Installation](#installation)',
    '[Usage](#usage)',
    '[Project Structure](#project-structure)',
    '[Development](#development)',
    '[License](#license)'
  ];
  
  if (extended) {
    sections.splice(1, 0, '[Features](#features)');
    sections.splice(2, 0, '[Prerequisites](#prerequisites)');
    sections.splice(4, 0, '[Examples](#examples)');
    sections.splice(6, 0, '[API Documentation](#api-documentation)');
    sections.splice(8, 0, '[Troubleshooting](#troubleshooting)');
    sections.splice(9, 0, '[Roadmap](#roadmap)');
    sections.splice(10, 0, '[Contributing](#contributing)');
  }
  
  return '## Table of Contents\n\n' + sections.map(s => `- ${s}`).join('\n') + '\n';
}

function generateAbout(info: ProjectInfo): string {
  return `## About\n\n${info.description || 'This project provides...'}\n\n### Why ${info.name}?\n\nKey benefits:\n- Feature 1\n- Feature 2\n- Feature 3\n`;
}

function generateFeatures(info: ProjectInfo): string {
  return `## Features\n\n- ✨ Feature 1\n- 🚀 Feature 2\n- 🎯 Feature 3\n- 📦 Feature 4\n`;
}

function generatePrerequisites(info: ProjectInfo): string {
  let content = '## Prerequisites\n\n';
  
  switch (info.type) {
    case 'node':
      content += '- Node.js >= 14.0.0\n- npm or yarn\n';
      break;
    case 'python':
      content += '- Python >= 3.7\n- pip\n';
      break;
    case 'go':
      content += '- Go >= 1.16\n';
      break;
    case 'rust':
      content += '- Rust >= 1.50\n- Cargo\n';
      break;
    default:
      content += 'Requirements coming soon.\n';
  }
  
  return content;
}

function generateExamples(info: ProjectInfo): string {
  return `## Examples\n\n### Basic Example\n\n\`\`\`${getLanguageExt(info.type)}\n// Example code here\n\`\`\`\n\n### Advanced Example\n\n\`\`\`${getLanguageExt(info.type)}\n// Advanced example code here\n\`\`\`\n`;
}

function generateAPISection(info: ProjectInfo): string {
  return `## API Documentation\n\n### Methods\n\n#### \`methodName(param)\`\n\nDescription of the method.\n\n**Parameters:**\n- \`param\` (type): Description\n\n**Returns:** Return type and description\n\n**Example:**\n\`\`\`${getLanguageExt(info.type)}\n// Example usage\n\`\`\`\n`;
}

function generateTesting(info: ProjectInfo): string {
  let content = '## Testing\n\n';
  
  switch (info.type) {
    case 'node':
      content += '### Unit Tests\n\n```bash\nnpm test\n```\n\n### Coverage\n\n```bash\nnpm run test:coverage\n```\n';
      break;
    case 'python':
      content += '### Unit Tests\n\n```bash\npytest\n```\n\n### Coverage\n\n```bash\npytest --cov\n```\n';
      break;
    default:
      content += 'Testing instructions coming soon.\n';
  }
  
  return content;
}

function generateDeployment(info: ProjectInfo): string {
  return `## Deployment\n\nDeployment instructions:\n\n1. Build the project\n2. Configure environment variables\n3. Deploy to your platform\n\nFor more details, see the [deployment guide](docs/deployment.md).\n`;
}

function generateTroubleshooting(): string {
  return `## Troubleshooting\n\n### Common Issues\n\n#### Issue 1\n\n**Problem:** Description of the problem\n\n**Solution:** How to fix it\n\n#### Issue 2\n\n**Problem:** Another common issue\n\n**Solution:** Resolution steps\n`;
}

function generateRoadmap(): string {
  return `## Roadmap\n\n- [ ] Feature 1\n- [ ] Feature 2\n- [ ] Feature 3\n- [ ] Feature 4\n\nSee [open issues](../../issues) for a full list of proposed features.\n`;
}

function generateContributing(): string {
  return `## Contributing\n\nContributions make the open source community amazing! Any contributions you make are **greatly appreciated**.\n\n1. Fork the Project\n2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)\n3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)\n4. Push to the Branch (\`git push origin feature/AmazingFeature\`)\n5. Open a Pull Request\n\nPlease read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct.\n`;
}

function generateChangelog(): string {
  return `## Changelog\n\nSee [CHANGELOG.md](CHANGELOG.md) for a history of changes to this project.\n`;
}

function generateAcknowledgments(): string {
  return `## Acknowledgments\n\n- Inspiration\n- Resources\n- Contributors\n`;
}

function getLanguageExt(type: ProjectInfo['type']): string {
  switch (type) {
    case 'node': return 'javascript';
    case 'python': return 'python';
    case 'go': return 'go';
    case 'rust': return 'rust';
    default: return '';
  }
}
