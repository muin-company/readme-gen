# readme-gen

Auto-generate beautiful README files from your project structure.

![license](https://img.shields.io/badge/license-MIT-blue) ![tests](https://img.shields.io/badge/tests-passing-green) ![node](https://img.shields.io/badge/node-%3E%3D14.0.0-green)

## Why?

Writing a good README takes time. This tool analyzes your project and generates a solid starting point automatically.

## Features

- Detects project type (Node.js, Python, Go, Rust)
- Generates file structure tree
- Extracts metadata from config files
- Detects license automatically
- Creates installation and usage instructions
- Identifies test setup
- Clean, professional output

## Installation

```bash
npm install -g readme-gen
```

Or use without installing:

```bash
npx readme-gen
```

## Usage

### Basic Usage

Generate README for current directory:

```bash
readme-gen
```

Generate for a specific project:

```bash
readme-gen ./path/to/project
```

Preview without writing to file:

```bash
readme-gen --no-write
```

Specify output file:

```bash
readme-gen --output DOCS.md
```

### Badge Generation

Add badges to your README automatically:

```bash
# Add npm version and downloads badges
readme-gen --npm

# Add all common badges (npm, CI, coverage, quality, GitHub stars)
readme-gen --all-badges

# Add specific CI badge
readme-gen --ci github-actions    # or circleci, travis

# Add coverage badge
readme-gen --coverage codecov      # or coveralls

# Add code quality badge
readme-gen --quality codeclimate   # or codefactor

# Add GitHub stars badge
readme-gen --github

# Combine multiple options
readme-gen --npm --ci github-actions --coverage codecov
```

**Supported badges:**
- 📦 npm version and downloads
- ✅ CI/CD status (GitHub Actions, CircleCI, Travis CI)
- 📊 Code coverage (Codecov, Coveralls)
- 💎 Code quality (Code Climate, CodeFactor)
- ⭐ GitHub stars
- 📄 License

Example output with `--all-badges`:
```markdown
[![npm version](https://img.shields.io/npm/v/package)](https://www.npmjs.com/package/package)
[![npm downloads](https://img.shields.io/npm/dm/package)](https://www.npmjs.com/package/package)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/owner/repo/actions/workflows/ci.yml/badge.svg)](https://github.com/owner/repo/actions)
[![codecov](https://codecov.io/gh/owner/repo/branch/main/graph/badge.svg)](https://codecov.io/gh/owner/repo)
[![Maintainability](https://api.codeclimate.com/v1/badges/owner/repo/maintainability)](https://codeclimate.com/github/owner/repo/maintainability)
[![GitHub stars](https://img.shields.io/github/stars/owner/repo?style=social)](https://github.com/owner/repo)
```

## Examples

### Example 1: Basic README generation

```bash
$ cd my-new-project
$ readme-gen
Analyzing project...
Detected project type: node
Extracting package.json metadata...
Generating file tree...
✓ README.md created successfully!
```

**Generated sections:**
- Project title and description from package.json
- Installation instructions with npm/yarn
- Usage examples from scripts
- Project file structure
- Contributing guidelines

### Example 2: Preview before writing

```bash
$ readme-gen --no-write
# my-awesome-cli

Command-line tool for awesome things.

## Installation
npm install -g my-awesome-cli

## Usage
...
(full README printed to stdout)
```

**Use case:** Review generated content before committing, or pipe to another tool for processing.

### Example 3: Python project detection

```bash
$ cd python-api
$ readme-gen
Analyzing project...
Detected project type: python
Found requirements.txt with 12 dependencies
Found pytest configuration
✓ README.md created successfully!
```

**Generates Python-specific content:**
- `pip install` instructions
- Virtual environment setup
- `requirements.txt` reference
- pytest usage examples

### Example 4: Multi-language monorepo

```bash
$ readme-gen ./packages/frontend
Analyzing project...
Detected project type: node
Framework: React (detected in dependencies)
Build tool: Vite
✓ README.md created successfully!

$ readme-gen ./services/api
Analyzing project...
Detected project type: go
Found go.mod with module: github.com/myorg/api
✓ README.md created successfully!
```

**Use case:** Generate consistent READMEs for each package in a monorepo.

### Example 5: Custom output for documentation

```bash
$ readme-gen --output docs/PROJECT_OVERVIEW.md
Analyzing project...
Detected project type: rust
Found Cargo.toml
✓ docs/PROJECT_OVERVIEW.md created successfully!
```

**Use case:** Generate documentation files for tools that expect specific filenames or locations.

## Before/After

**Before:**
```
my-project/
├── src/
├── package.json
└── (no README)
```

**After:**
```bash
readme-gen
# Analyzing project...
# Detected project type: node
# README generated: README.md
```

Now you have a complete README with:
- Project name and description
- Badges
- Installation instructions
- Usage examples
- Project structure
- Contributing guidelines

## Supported Project Types

- **Node.js** - Detects package.json, extracts scripts and dependencies
- **Python** - Detects setup.py, pyproject.toml, requirements.txt
- **Go** - Detects go.mod
- **Rust** - Detects Cargo.toml
- **Unknown** - Still generates basic structure

## Options

```
Usage: readme-gen [options] [path]

Arguments:
  path                  Path to the project directory (default: ".")

Options:
  -V, --version         output the version number
  -o, --output <file>   Output file path (default: "README.md")
  --no-write            Print to stdout instead of writing to file
  -h, --help            display help for command
```

## Project Structure

```
readme-gen/
├── src/
│   ├── analyzer.ts       # Project analysis logic
│   ├── cli.ts            # CLI entry point
│   ├── detector.ts       # Project type detection
│   ├── fileTree.ts       # File tree generator
│   ├── template.ts       # README template generator
│   ├── types.ts          # TypeScript types
│   └── *.test.ts         # Test files
├── dist/                 # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

## Development

### Setup

```bash
git clone https://github.com/muin-company/readme-gen.git
cd readme-gen
npm install
```

### Build

```bash
npm run build
```

### Run Tests

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

Coverage:

```bash
npm run test:coverage
```

### Local Testing

```bash
npm run build
node dist/cli.js
```

Or link globally:

```bash
npm link
readme-gen
```

## Real-World Examples

### 1. Generate README for Multiple Projects

Batch generate READMEs for all projects in a workspace:

```bash
# Generate README for each subdirectory
for dir in ./projects/*/; do
  readme-gen "$dir"
  echo "✓ Generated README for $dir"
done
```

### 2. CI/CD Integration (GitHub Actions)

Auto-update README on every push:

```yaml
# .github/workflows/readme.yml
name: Update README

on:
  push:
    branches: [main]

jobs:
  update-readme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Generate README
        run: npx readme-gen
      
      - name: Commit if changed
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add README.md
          git diff --staged --quiet || git commit -m "chore: auto-update README"
          git push
```

### 3. Preview Before Committing

Review generated content before overwriting existing README:

```bash
# Preview in terminal
readme-gen --no-write | less

# Compare with existing
readme-gen --no-write > README.new.md
diff README.md README.new.md

# Merge manually if satisfied
mv README.new.md README.md
```

### 4. Custom Output for Documentation Sites

Generate different formats for various needs:

```bash
# Main README
readme-gen

# Docs site version (without badges)
readme-gen --output docs/README.md

# Minimal version for npm
readme-gen --output NPM_README.md
```

### 5. Monorepo Package Documentation

Generate READMEs for all packages in a monorepo:

```bash
# From monorepo root
for pkg in packages/*/; do
  echo "Processing $pkg"
  readme-gen "$pkg" --output "$pkg/README.md"
done

# Or with more control
find packages -maxdepth 1 -type d -not -path packages | while read dir; do
  if [ -f "$dir/package.json" ]; then
    readme-gen "$dir"
  fi
done
```

### 6. New Project Bootstrapping

Start a new project with a professional README from day one:

```bash
# Create new project
mkdir my-awesome-tool && cd my-awesome-tool
npm init -y

# Write some code...
mkdir src
echo "export const hello = () => 'world'" > src/index.ts

# Generate README immediately
npx readme-gen

# Now you have:
# - package.json
# - src/index.ts
# - README.md (professional, auto-generated)
```

### 7. Pre-commit Hook

Ensure README stays updated using git hooks:

```bash
# .git/hooks/pre-commit
#!/bin/bash
readme-gen --no-write > /dev/null 2>&1
if [ $? -eq 0 ]; then
  readme-gen
  git add README.md
fi
```

Or with husky:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "readme-gen && git add README.md"
    }
  }
}
```

## Contributing

Contributions welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

## License

MIT License - see LICENSE file for details.

## Credits

Built by [MUIN](https://github.com/muin-company)
