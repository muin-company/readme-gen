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
