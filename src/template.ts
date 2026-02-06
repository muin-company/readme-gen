import { ProjectInfo } from './types';
import { generateBadges, generateBadgeConfig, parseGitHubRepo, type BadgeConfig, type BadgeOptions } from './badges';

export function generateReadme(info: ProjectInfo, badgeConfig?: BadgeConfig): string {
  const sections: string[] = [];
  
  // Title and description
  sections.push(`# ${info.name}\n`);
  
  if (info.description) {
    sections.push(`${info.description}\n`);
  }
  
  // Badges
  const badges = generateBadgesSection(info, badgeConfig);
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

function generateBadgesSection(info: ProjectInfo, badgeConfig?: BadgeConfig): string {
  // Use provided config or generate default
  const config = badgeConfig || generateBadgeConfig({
    hasNpm: info.type === 'node' && !!info.version,
    hasCI: false, // User needs to specify
    hasCoverage: false, // User needs to specify
    hasTests: info.hasTests,
  });
  
  // Parse GitHub repo from repository field
  const githubRepo = info.repository ? parseGitHubRepo(info.repository) || undefined : undefined;
  
  const options: BadgeOptions = {
    npmPackage: info.type === 'node' ? info.name : undefined,
    githubRepo,
    license: info.license,
    packageName: info.name,
  };
  
  return generateBadges(config, options);
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
