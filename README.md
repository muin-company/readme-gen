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

## Contributing

Contributions welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

## License

MIT License - see LICENSE file for details.

## Credits

Built by [MUIN](https://github.com/muin-company)
