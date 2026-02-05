import { ProjectInfo } from './types';

export function generateReadme(info: ProjectInfo): string {
  const sections: string[] = [];
  
  // Title and description
  sections.push(`# ${info.name}\n`);
  
  if (info.description) {
    sections.push(`${info.description}\n`);
  }
  
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
