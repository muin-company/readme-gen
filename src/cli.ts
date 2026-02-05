#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { analyzeProject } from './analyzer';
import { generateReadme } from './template';

const program = new Command();

program
  .name('readme-gen')
  .description('Auto-generate beautiful README files from your project structure')
  .version('1.0.0')
  .argument('[path]', 'Path to the project directory', '.')
  .option('-o, --output <file>', 'Output file path', 'README.md')
  .option('--no-write', 'Print to stdout instead of writing to file')
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
      
      // Generate README
      const readme = generateReadme(projectInfo);
      
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
