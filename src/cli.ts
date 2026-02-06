#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { analyzeProject } from './analyzer';
import { generateReadme } from './template';
import type { BadgeConfig } from './badges';

const program = new Command();

program
  .name('readme-gen')
  .description('Auto-generate beautiful README files from your project structure')
  .version('1.0.0')
  .argument('[path]', 'Path to the project directory', '.')
  .option('-o, --output <file>', 'Output file path', 'README.md')
  .option('--no-write', 'Print to stdout instead of writing to file')
  .option('--badges', 'Enable badge generation (auto-detect based on project)')
  .option('--npm', 'Include npm version and downloads badges')
  .option('--ci <type>', 'Include CI badge (github-actions, circleci, travis)')
  .option('--coverage <type>', 'Include coverage badge (codecov, coveralls)')
  .option('--quality <type>', 'Include code quality badge (codeclimate, codefactor)')
  .option('--github', 'Include GitHub stars badge')
  .option('--all-badges', 'Include all available badges')
  .action(async (projectPath: string, options) => {
    try {
      // Resolve path
      const absPath = path.resolve(projectPath);
      
      // Check if path exists
      if (!fs.existsSync(absPath)) {
        console.error(chalk.red(`Error: Path does not exist: ${absPath}`));
        process.exit(1);
      }
      
      // Check if it's a directory
      const stats = fs.statSync(absPath);
      if (!stats.isDirectory()) {
        console.error(chalk.red(`Error: Path is not a directory: ${absPath}`));
        process.exit(1);
      }
      
      console.log(chalk.blue('Analyzing project...'));
      
      // Analyze project
      const projectInfo = analyzeProject(absPath);
      
      console.log(chalk.green(`Detected project type: ${projectInfo.type}`));
      
      // Build badge config
      let badgeConfig: BadgeConfig | undefined;
      if (options.badges || options.npm || options.ci || options.coverage || options.quality || options.github || options.allBadges) {
        badgeConfig = {
          npm: options.allBadges || options.npm || undefined,
          version: options.allBadges || options.npm || (projectInfo.type === 'node' && !!projectInfo.version),
          downloads: options.allBadges || options.npm || undefined,
          license: options.allBadges || options.badges || true,
          github: options.allBadges || options.github || !!projectInfo.repository,
          ci: options.allBadges ? 'github-actions' : (options.ci || false),
          coverage: options.allBadges ? 'codecov' : (options.coverage || false),
          quality: options.allBadges ? 'codeclimate' : (options.quality || false),
        };
        console.log(chalk.blue('Badge generation enabled'));
      }
      
      // Generate README
      const readme = generateReadme(projectInfo, badgeConfig);
      
      // Output
      if (options.write) {
        const outputPath = path.resolve(options.output);
        fs.writeFileSync(outputPath, readme, 'utf-8');
        console.log(chalk.green(`README generated: ${outputPath}`));
      } else {
        console.log('\n' + chalk.gray('─'.repeat(50)) + '\n');
        console.log(readme);
        console.log(chalk.gray('─'.repeat(50)));
      }
      
    } catch (error) {
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse();
